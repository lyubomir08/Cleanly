import { get, post, put, del } from "./api.js";

const endpoints = {
    create: "/bookings",
    pending: "/admin/bookings",
    updateStatus: (id) => `/bookings/${id}/status`,
    deleteUserBooking: (id) => `/bookings/${id}`,
    deleteBooking: (id) => `/admin/bookings/${id}`,
};

export async function createBooking(bookingData) {
    return await post(endpoints.create, bookingData);
}

export async function getPendingBookings() {
    return await get(endpoints.pending);
}

export async function updateBookingStatus(id, status) {
    return await put(endpoints.updateStatus(id), { status });
}

export async function deleteUserBooking(id) {
    return await del(endpoints.deleteUserBooking(id));
}

export async function deleteBooking(id) {
    return await del(endpoints.deleteBooking(id));
}
