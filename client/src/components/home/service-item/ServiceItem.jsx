import { useNavigate } from "react-router";

export default function ServiceItem({ service }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center w-80 transition-transform transform hover:scale-105"
        >
            <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
            <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-transform transform hover:scale-105"
                onClick={() => navigate(`services/${service._id}/details`)}
            >
                View Details
            </button>
        </div>
    );
}
