import { useState, useEffect, useContext } from "react";

import { getProfile, getAllUsers, changeUserRole } from "../../services/authService";
import { getPendingBookings, updateBookingStatus, deleteUserBooking } from "../../services/bookingService";
import { UserContext } from "../../contexts/UserContext";

import LoadingSpinner from "../loading-spinner/LoadingSpinner";

export default function Profile() {
    const { user } = useContext(UserContext);
    const [profileData, setProfileData] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile();
                setProfileData(data);

                if (user?.role === "admin") {
                    const users = await getAllUsers();
                    setAllUsers(users);

                    const pending = await getPendingBookings();
                    setPendingBookings(pending);
                }
            } catch (error) {
                console.error("Error fetching profile, users, or bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleChangeRole = async (userId, currentRole) => {
        const newRole = currentRole === "user" ? "admin" : "user";

        if (!window.confirm(`Are you sure you want to change role to ${newRole}?`)) return;

        try {
            await changeUserRole(userId, newRole);
            const updatedUsers = await getAllUsers();
            setAllUsers(updatedUsers);
            alert(`User role updated to ${newRole}`);
        } catch (error) {
            console.error("Error changing user role:", error);
            alert("Failed to change user role.");
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (!bookingId) return console.error("Error: Missing booking ID.");

        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            setLoading(true);
            await deleteUserBooking(bookingId);
            
            const updatedProfile = await getProfile();
            setProfileData(updatedProfile);

            alert("Booking deleted successfully.");
        } catch (error) {
            console.error("Error deleting booking:", error);
            alert("Failed to delete booking.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBookingStatus = async (bookingId, status) => {
        if (!bookingId) return console.error("Error: Missing booking ID.");
        if (!["confirmed", "cancelled"].includes(status)) return console.error("Error: Invalid status:", status);

        try {
            await updateBookingStatus(bookingId, status);
            setPendingBookings((prev) => prev.filter((b) => b._id !== bookingId));
            alert(`Booking ${status} successfully.`);
        } catch (error) {
            console.error("Error updating booking status:", error);
            alert("Failed to update booking status.");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Your Profile</h2>
            <p className="text-center text-gray-600 text-lg">{profileData?.email}</p>

            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">📋 Your Bookings</h3>
            {profileData?.bookings?.length === 0 ? (
                <p className="text-gray-500 text-lg">No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData?.bookings?.map((booking) => (
                        <div key={booking.bookingId} className="border p-6 rounded-lg shadow-xl bg-white transition transform hover:scale-105">
                            <p className="text-xl font-semibold text-gray-800">{booking.service?.name || "Service deleted"}</p>
                            <p className="text-gray-600 mt-2">📅 {booking.date} - ⏰ {booking.time}</p>
                            <p className={`text-sm mt-2 font-medium py-1 px-2 rounded-lg inline-block 
                                ${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                                booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                Status: {booking.status}
                            </p>

                            {booking.status === "pending" && (
                                <button
                                    onClick={() => handleDeleteBooking(booking.bookingId)}
                                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300 w-full"
                                >
                                    ❌ Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {user?.role === "admin" && (
                <>
                    <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">🛠️ Manage All Pending Bookings</h3>
                    {pendingBookings.length === 0 ? (
                        <p className="text-gray-500 text-lg">No pending bookings.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pendingBookings.map((booking) => (
                                <div key={booking._id} className="border p-6 rounded-lg shadow-lg bg-white">
                                    <p className="text-xl font-medium text-gray-800">{booking.service?.name || "Service deleted"}</p>
                                    <p className="text-gray-600 mt-2">📅 {booking.date} - ⏰ {booking.time}</p>
                                    <p className="text-gray-500">👤 {booking.user?.username || "Unknown user"}</p>

                                    <div className="flex gap-4 mt-4">
                                        <button
                                            onClick={() => handleUpdateBookingStatus(booking._id, "confirmed")}
                                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400 transition duration-300 w-1/2"
                                        >
                                            ✅ Approve
                                        </button>
                                        <button
                                            onClick={() => handleUpdateBookingStatus(booking._id, "cancelled")}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300 w-1/2"
                                        >
                                            ❌ Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900">📌 All Users</h3>
                    {allUsers.length === 0 ? (
                        <p className="text-gray-500 text-lg">No users found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 mt-4">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-3">Username</th>
                                        <th className="border border-gray-300 px-4 py-3">Email</th>
                                        <th className="border border-gray-300 px-4 py-3">Role</th>
                                        <th className="border border-gray-300 px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((user) => (
                                        <tr key={user._id} className="bg-white border border-gray-300 text-center">
                                            <td className="border border-gray-300 px-4 py-3">{user.username}</td>
                                            <td className="border border-gray-300 px-4 py-3">{user.email}</td>
                                            <td className="border border-gray-300 px-4 py-3">{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
