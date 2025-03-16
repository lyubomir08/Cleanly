import { useState, useEffect, useContext } from "react";

import { getProfile, getAllUsers, changeUserRole } from "../../services/authService";
import { getPendingBookings, updateBookingStatus, deleteUserBooking } from "../../services/bookingService";
import { UserContext } from "../../contexts/UserContext";

import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import BookingsUser from "./bookings-user/BookingsUser";
import BookingsPending from "./booking-pendings/BookingPendings";
import UserTable from "./user-table/UserTable";

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

            <BookingsUser bookings={profileData?.bookings || []} handleDeleteBooking={handleDeleteBooking} />

            {user?.role === "admin" && (
                <>
                    <BookingsPending pendingBookings={pendingBookings} handleUpdateBookingStatus={handleUpdateBookingStatus} />
                    <UserTable allUsers={allUsers} handleChangeRole={handleChangeRole} />
                </>
            )}
        </div>
    );
}
