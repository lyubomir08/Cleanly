import { useNavigate } from "react-router";

export default function ServiceItem({ service }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <img src={service.imageUrl} alt={service.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
            <p className="text-gray-600 mt-1">${service.price}</p>
            <button
                onClick={() => navigate(`/services/${service._id}/details`)}
                className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
                Details
            </button>
        </div>
    );
}