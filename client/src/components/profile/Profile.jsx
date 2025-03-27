import { useState, useEffect, useContext } from "react";

import { getProfile, getAllUsers, changeUserRole, } from "../../services/authService";
import { getPendingBookings, updateBookingStatus, deleteUserBooking, } from "../../services/bookingService";

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
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile();
                setProfileData(data);

                if (user?.role === "admin") {
                    const users = await getAllUsers();
                    const pending = await getPendingBookings();

                    setAllUsers(users);
                    setPendingBookings(pending);
                }
            } catch (error) {
                setErrorMsg(error.message || "Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleChangeRole = async (userId, currentRole) => {
        const newRole = currentRole === "user" ? "admin" : "user";
        if (!window.confirm(`Change role to ${newRole}?`)) return;

        try {
            await changeUserRole(userId, newRole);
            const updatedUsers = await getAllUsers();

            setAllUsers(updatedUsers);
        } catch (err) {
            setErrorMsg("Failed to change role.");
        }
    };

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm("Delete this booking?")) return;

        try {
            setLoading(true);

            await deleteUserBooking(bookingId);
            const updatedProfile = await getProfile();

            setProfileData(updatedProfile);
        } catch (error) {
            setErrorMsg(error.message || "Could not delete booking.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBookingStatus = async (bookingId, status) => {
        try {
            await updateBookingStatus(bookingId, status);

            setPendingBookings((prev) =>
                prev.filter((b) => b._id !== bookingId)
            );
        } catch (error) {
            setErrorMsg(error.message || "Failed to update booking.");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Your Profile
            </h2>
            <p className="text-center text-gray-600 mb-6 text-lg">
                {profileData?.email}
            </p>

            {errorMsg && (
                <p className="text-red-500 text-center mb-4">{errorMsg}</p>
            )}

            {user.role !== "admin" && (
                <BookingsUser
                    bookings={profileData?.bookings || []}
                    handleDeleteBooking={handleDeleteBooking}
                />
            )}

            {user?.role === "admin" && (
                <>
                    <BookingsPending
                        pendingBookings={pendingBookings}
                        handleUpdateBookingStatus={handleUpdateBookingStatus}
                    />
                    <UserTable
                        allUsers={allUsers}
                        handleChangeRole={handleChangeRole}
                    />
                </>
            )}
        </div>
    );
}
