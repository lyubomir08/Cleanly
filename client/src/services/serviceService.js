import { get, post, put, del } from "./api.js";

const endpoints = {
    all: "/services",
    byId: (id) => `/services/${id}`,
    create: "/services",
    update: (id) => `/services/${id}`,
    delete: (id) => `/services/${id}`,
    like: (id) => `/services/${id}/like`,
    dislike: (id) => `/services/${id}/dislike`,
    filter: "/services/filter",
};

export async function getAllServices() {
    return await get(endpoints.all);
}

export async function getServiceById(id) {
    return await get(endpoints.byId(id));
}

export async function createService(serviceData) {
    return await post(endpoints.create, serviceData);
}

export async function updateService(id, serviceData) {
    return await put(endpoints.update(id), serviceData);
}

export async function deleteService(id) {
    return await del(endpoints.delete(id));
}

export async function likeService(id) {
    return await post(endpoints.like(id));
}

export async function dislikeService(id) {
    return await post(endpoints.dislike(id));
}

export async function filterServices(query) {
    return await get(`${endpoints.filter}?${new URLSearchParams(query)}`);
}
