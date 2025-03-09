import Booking from "../models/Booking.js";

const createBooking = async (userId, serviceId, date, time) => {
    return await Booking.create({ user: userId, service: serviceId, date, time, status: "pending" });
};

const getPendingBookings = async () => {
    return await Booking.find({ status: "pending" }).populate("user service");
};

const updateBookingStatus = async (bookingId, status) => {
    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });

    if (!booking) {
        throw new Error("Booking not found");
    }

    return booking;
};

const deleteUserBooking = async (userId, bookingId) => {
    const booking = await Booking.findOne({ _id: bookingId, user: userId });

    if (!booking) {
        throw new Error("Booking not found or access denied");
    }

    if (booking.status !== "pending") {
        throw new Error("Only pending bookings can be deleted");
    }

    await Booking.deleteOne({ _id: bookingId });

    return { message: "Booking deleted successfully" };
};

const deleteBooking = async (bookingId) => {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
        throw new Error("Booking not found");
    }

    return { message: "Booking deleted successfully" };
};

export default {
    createBooking,
    getPendingBookings,
    updateBookingStatus,
    deleteUserBooking,
    deleteBooking,
};
