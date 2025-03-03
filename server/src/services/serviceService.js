import Service from "../models/Service.js";

const createService = async ({ name, description, price }) => {
    const newService = await Service.create({ name, description, price });
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

export default {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
