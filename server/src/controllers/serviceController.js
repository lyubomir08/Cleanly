import serviceService from "../services/serviceService.js";

const createService = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const newService = await serviceService.createService(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await serviceService.getServiceById(req.params.id);
        res.status(200).json(service);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const updatedService = await serviceService.updateService(req.params.id, req.body);
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        if (!req.isAdmin) {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const result = await serviceService.deleteService(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const likeService = async (req, res) => {
    try {
        const service = await serviceService.likeService(req.params.id, req.userId);
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const dislikeService = async (req, res) => {
    try {
        const service = await serviceService.dislikeService(req.params.id, req.userId);
        res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const filterServices = async (req, res) => {
    try {
        const filters = req.query;
        const services = await serviceService.filterServices(filters);
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
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
