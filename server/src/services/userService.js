import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";
import jwt from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const registerUser = async (username, email, password, rePassword) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("A user with this email already exists");
    }

    if (rePassword !== password) {
        throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword, role: "user" });

    const token = generateToken(newUser);

    return {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        token,
    };
};

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
    };
};

const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    const bookings = await Booking.find({ user: userId }).populate("service");

    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        bookings: bookings.map(booking => ({
            bookingId: booking._id,
            service: booking.service
                ? {
                    serviceId: booking.service._id,
                    name: booking.service.name,
                    description: booking.service.description,
                    price: booking.service.price,
                }
                : null,
            date: booking.date,
            time: booking.time,
            status: booking.status,
            createdAt: booking.createdAt,
        })),
    };
};

const getAllUsers = async () => {
    return await User.find().select("-password -__v");
};

export default {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers,
};