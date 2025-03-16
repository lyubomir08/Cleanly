export default function BookingsUser({ bookings, handleDeleteBooking }) {
    return (
        <>
            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">📋 Your Bookings</h3>
            {bookings.length === 0 ? (
                <p className="text-gray-500 text-lg">No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bookings.map((booking) => (
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
        </>
    );
}
