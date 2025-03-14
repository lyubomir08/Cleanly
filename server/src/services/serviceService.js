import Service from "../models/Service.js";

const createService = async ({ name, description, price, imageUrl }) => {
    const newService = await Service.create({ name, description, price, imageUrl });
    return newService;
};

const getAllServices = async () => {
    return await Service.find();
};

const getServiceById = async (serviceId) => {
    const service = await Service.findById(serviceId);
    if (!service) throw new Error("Service not found");
    return service;
};

const updateService = async (serviceId, updateData) => {
    const updatedService = await Service.findByIdAndUpdate(serviceId, updateData, { new: true });
    if (!updatedService) throw new Error("Service not found");
    return updatedService;
};

const deleteService = async (serviceId) => {
    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (!deletedService) throw new Error("Service not found");
    return { message: "Service deleted successfully" };
};

const likeService = async (serviceId, userId) => {
    const service = await Service.findById(serviceId);
    if (!service) throw new Error("Service not found");

    if (service.likes.includes(userId)) {
        service.likes = service.likes.filter(id => id.toString() !== userId);
    } else {
        service.likes.push(userId);
        service.dislikes = service.dislikes.filter(id => id.toString() !== userId);
    }

    await service.save();
    return service;
};

const dislikeService = async (serviceId, userId) => {
    const service = await Service.findById(serviceId);
    if (!service) throw new Error("Service not found");

    if (service.dislikes.includes(userId)) {
        service.dislikes = service.dislikes.filter(id => id.toString() !== userId);
    } else {
        service.dislikes.push(userId);
        service.likes = service.likes.filter(id => id.toString() !== userId);
    }

    await service.save();
    return service;
};

const filterServices = async (filters) => {
    const query = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" };
    }
    if (filters.minPrice && !isNaN(filters.minPrice)) {
        query.price = { $gte: Number(filters.minPrice) };
    }
    if (filters.maxPrice && !isNaN(filters.maxPrice)) {
        query.price = { ...query.price, $lte: Number(filters.maxPrice) };
    }

    let sortOption = {};
    if (filters.sortBy === "newest") {
        sortOption = { createdAt: -1 };
    } else if (filters.sortBy === "oldest") {
        sortOption = { createdAt: 1 };
    }

    return await Service.find(query).sort(sortOption);
};

export default {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    likeService,
    dislikeService,
    filterServices,
};
