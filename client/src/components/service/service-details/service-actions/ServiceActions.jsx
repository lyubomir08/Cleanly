import { useNavigate } from "react-router";

export default function ServiceActions({ serviceId, user, openDeleteModal  }) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap justify-center gap-7 mt-8">
            {user && (
                <button
                    onClick={() => navigate(`/services/${serviceId}/book`)}
                    className="w-50 bg-blue-600 text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700"
                >
                    📅 Book This Service
                </button>
            )}

            {user?.role === "admin" && (
                <>
                    <button
                        onClick={() => navigate(`/services/${serviceId}/edit`)}
                        className="w-50 bg-gray-800 text-white py-3 rounded-lg font-medium transition hover:bg-gray-600"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={openDeleteModal}
                        className="w-50 bg-red-500 text-white py-3 rounded-lg font-medium transition hover:bg-red-400"
                    >
                        🗑️ Delete
                    </button>
                </>
            )}
        </div>
    );
}
