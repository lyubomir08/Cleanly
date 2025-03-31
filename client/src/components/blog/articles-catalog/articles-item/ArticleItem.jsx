import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { UserContext } from "../../../../contexts/UserContext";
import { deleteArticle } from "../../../../services/articleService";

export default function ArticleItem({ article }) {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [deleteError, setDeleteError] = useState(null);

    const isAuthor = user?._id === article.author?._id;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            try {
                await deleteArticle(article._id);
                window.location.reload();
            } catch (error) {
                setDeleteError(error.message || "Failed to delete the article. Please try again.");
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition cursor-pointer w-full">
            <h2 className="text-3xl font-semibold text-gray-900">{article.title}</h2>
            <p className="text-gray-700 mt-3 text-lg">{article.content.substring(0, 200)}</p>
            <p className="text-sm text-gray-500 mt-4">
                Author: {article.author?.username || "Anonymous"}
            </p>

            {deleteError && (
                <p className="text-red-500 mt-2 font-medium">{deleteError}</p>
            )}

            {isAuthor && (
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => navigate(`/articles/${article._id}/edit`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
                    >
                        🗑️ Delete
                    </button>
                </div>
            )}
        </div>
    );
}
