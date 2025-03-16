export default function BookingsPending({ pendingBookings, handleUpdateBookingStatus }) {
    return (
        <>
            <h3 className="text-2xl font-semibold mt-10 mb-4 text-gray-900"> Manage All Pending Bookings</h3>
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
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleUpdateBookingStatus(booking._id, "cancelled")}
                                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300 w-1/2"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
