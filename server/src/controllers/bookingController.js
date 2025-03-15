import bookingService from "../services/bookingService.js";

const createBooking = async (req, res) => {
    try {
        const { serviceId, date, time } = req.body;
        const userId = req.user.userId;

        const newBooking = await bookingService.createBooking(userId, serviceId, date, time);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getPendingBookings = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }
        
        const bookings = await bookingService.getPendingBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }

        const { status } = req.body;

        if (!["confirmed", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedBooking = await bookingService.updateBookingStatus(req.params.id, status);
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUserBooking = async (req, res) => {
    try {
        const result = await bookingService.deleteUserBooking(req.user.userId, req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }

        const result = await bookingService.deleteBooking(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createBooking,
    getPendingBookings,
    updateBookingStatus,
    deleteUserBooking,
    deleteBooking
};
