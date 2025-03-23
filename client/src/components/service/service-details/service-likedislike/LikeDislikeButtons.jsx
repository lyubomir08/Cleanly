import { useContext, useState } from "react";

import { likeService, dislikeService } from "../../../../services/serviceService";

import { UserContext } from "../../../../contexts/UserContext";

export default function LikeDislikeButtons({ service, setService }) {
    const { user } = useContext(UserContext);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const userLiked = user && service.likes.includes(user._id);
    const userDisliked = user && service.dislikes.includes(user._id);

    const handleLike = async () => {
        setErrorMsg(null);
        setLoading(true);

        try {
            const updatedService = await likeService(service._id);

            setService(updatedService);
        } catch (error) {
            setErrorMsg(error.message || "Failed to like service. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDislike = async () => {
        setErrorMsg(null);
        setLoading(true);

        try {
            const updatedService = await dislikeService(service._id);
            
            setService(updatedService);
        } catch (error) {
            setErrorMsg(error.message || "Failed to dislike service. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 mt-6">
            {errorMsg && <p className="text-red-500 text-sm font-medium">{errorMsg}</p>}

            {user ? (
                <div className="flex gap-4">
                    <button
                        onClick={handleLike}
                        disabled={loading}
                        className={`w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm transition ${userLiked
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        👍 Like <span className="font-semibold">{service.likes.length}</span>
                    </button>

                    <button
                        onClick={handleDislike}
                        disabled={loading}
                        className={`w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm transition ${userDisliked
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        👎 Dislike <span className="font-semibold">{service.dislikes.length}</span>
                    </button>
                </div>
            ) : (
                <div className="flex justify-center gap-4">
                    <div className="w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-700">
                        👍 {service.likes.length}
                    </div>
                    <div className="w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-gray-100 text-gray-700">
                        👎 {service.dislikes.length}
                    </div>
                </div>
            )}
        </div>
    );
}
