import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";

import { getServiceById, deleteService } from "../../../services/serviceService";

import { UserContext } from "../../../contexts/UserContext";

import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import LikeDislikeButtons from "./service-likedislike/LikeDislikeButtons";
import ServiceActions from "./service-actions/ServiceActions";
import ServiceDeleteModal from "./service-actions/service-delete-modal/ServiceDeleteModal";

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await getServiceById(id);

                setService(data);
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                navigate("/services");
            } catch (error) {
                console.error("Error deleting service:", error);
            }
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!service) return <p className="text-center text-gray-500 text-lg font-semibold">❌ Service not found.</p>;

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="relative">
                    <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-80 object-cover rounded-lg shadow-md"
                    />
                </div>

                <div className="mt-6 text-center">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">{service.name}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-4">${service.price}</p>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <LikeDislikeButtons service={service} setService={setService}  />
                </div>

                <ServiceActions serviceId={id} user={user} openDeleteModal={() => setIsModalOpen(true)} />

                <ServiceDeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDelete}/>
            </div>
        </div>
    );
}
