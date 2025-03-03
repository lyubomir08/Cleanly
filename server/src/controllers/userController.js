import userService from "../services/userService.js";

const register = async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        const newUser = await userService.registerUser(username, email, password, rePassword);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await userService.loginUser(email, password);
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const logout = (req, res) => {
    res.status(200).json({ message: "Logout successful. Remove token from client storage." });
};

const getProfile = async (req, res) => {
    const userId = req.user.userId;

    try {
        const userProfile = await userService.getUserProfile(userId);
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(404).json({ message: error.message });   
    }
};

export default {
    register,
    login,
    logout,
    getProfile,
};