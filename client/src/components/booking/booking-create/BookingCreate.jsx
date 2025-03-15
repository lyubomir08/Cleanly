import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { createBooking } from "../../../services/bookingService";

import LoadingSpinner from "../../loading-spinner/LoadingSpinner";

export default function BookingCreate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!date || !time) {
            alert("Please select a date and time.");
            setLoading(false);

            return;
        }

        try {
            await createBooking({ serviceId: id, date, time });

            navigate("/profile");
        } catch (error) {
            alert("Failed to create booking.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">📅 Book Cleaning Service</h2>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Time</label>
                            <input
                                type="time"
                                className="w-full px-4 py-2 border rounded-lg"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            ✅ Confirm Booking
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}