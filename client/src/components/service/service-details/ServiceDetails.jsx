import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { getServiceById, deleteService, likeService, dislikeService } from "../../../services/serviceService";
import { UserContext } from "../../../contexts/UserContext";
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";

export default function ServiceDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const handleLike = async () => {
        try {
            const updatedService = await likeService(id);

            setService(updatedService);
        } catch (error) {
            console.error("Error liking service:", error);
        }
    };

    const handleDislike = async () => {
        try {
            const updatedService = await dislikeService(id);

            setService(updatedService);
        } catch (error) {
            console.error("Error disliking service:", error);
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

                {user && (
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={handleLike}
                            className="w-36 flex items-center justify-center gap-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
                        >
                            👍 Like <span className="font-semibold">{service.likes.length}</span>
                        </button>
                        <button
                            onClick={handleDislike}
                            className="w-36 flex items-center justify-center gap-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
                        >
                            👎 Dislike <span className="font-semibold">{service.dislikes.length}</span>
                        </button>
                    </div>
                )}

                <div className="flex flex-wrap justify-center gap-7 mt-8">
                    {user && (
                        <button
                            onClick={() => navigate(`/services/${id}/book`)}
                            className="w-50 bg-blue-600 text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700"
                        >
                            📅 Book This Service
                        </button>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <button
                                onClick={() => navigate(`/services/${id}/edit`)}
                                className="w-50 bg-gray-800 text-white py-3 rounded-lg font-medium transition hover:bg-gray-600"
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="w-50 bg-red-500 text-white py-3 rounded-lg font-medium transition hover:bg-red-400"
                            >
                                🗑️ Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
