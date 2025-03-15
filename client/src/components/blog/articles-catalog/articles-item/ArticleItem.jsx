import { useNavigate } from "react-router";

export default function ArticleItem({ article }) {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white shadow-md rounded-lg p-8 hover:shadow-lg transition cursor-pointer w-full"
            onClick={() => navigate(`/articles/${article._id}`)}
        >
            <h2 className="text-3xl font-semibold text-gray-900">{article.title}</h2>
            <p className="text-gray-700 mt-3 text-lg">{article.content.substring(0, 200)}...</p>
            <p className="text-sm text-gray-500 mt-4">
                Author: {article.author?.username || "Anonymous"}
            </p>
        </div>
    );
}
