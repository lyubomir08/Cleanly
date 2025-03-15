import { useContext, useState } from "react";

import { likeService, dislikeService } from "../../../../services/serviceService";
import { UserContext } from "../../../../contexts/UserContext";

export default function LikeDislikeButtons({ service, setService }) {
    const { user } = useContext(UserContext);
    const [userLiked, setUserLiked] = useState(service.likes.includes(user._id));
    const [userDisliked, setUserDisliked] = useState(service.dislikes.includes(user._id));

    const handleLike = async () => {
        try {
            const updatedService = await likeService(service._id);

            setService(updatedService);
            setUserLiked(!userLiked);
            setUserDisliked(false);
        } catch (error) {
            console.error("Error liking service:", error);
        }
    };

    const handleDislike = async () => {
        try {
            const updatedService = await dislikeService(service._id);
            
            setService(updatedService);
            setUserDisliked(!userDisliked);
            setUserLiked(false);
        } catch (error) {
            console.error("Error disliking service:", error);
        }
    };

    return (
        <div className="flex justify-center gap-4 mt-6">
            <button
                onClick={handleLike}
                className={`w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm transition ${
                    userLiked
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
                👍 Like <span className="font-semibold">{service.likes.length}</span>
            </button>

            <button
                onClick={handleDislike}
                className={`w-36 flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow-sm transition ${
                    userDisliked
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
                👎 Dislike <span className="font-semibold">{service.dislikes.length}</span>
            </button>
        </div>
    );
}
