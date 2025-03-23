import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";

import { getAllArticles } from "../../../services/articleService";

import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import ArticleItem from "./articles-item/ArticleItem";
import ArticlesCreateModal from "../articles-create-modal/ArticlesCreateModal";

export default function ArticlesCatalog() {
    const { user } = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getAllArticles();
                setArticles(data);
            } catch (error) {
                setFetchError(error.message || "Failed to load articles. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const handleArticleCreated = (newArticle) => {
        setArticles((prevArticles) => [newArticle, ...prevArticles]);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Blog Articles</h1>
                {user && (
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-500 transition"
                        onClick={() => setIsModalOpen(true)}
                    >
                        ➕ Add Article
                    </button>
                )}
            </div>

            {fetchError && (
                <p className="text-center text-red-500 text-lg font-semibold mb-6">{fetchError}</p>
            )}

            {articles.length === 0 && !fetchError ? (
                <p className="text-center text-gray-500 text-lg font-semibold">📭 No articles found.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {articles.map((article) => (
                        <ArticleItem key={article._id} article={article} />
                    ))}
                </div>
            )}

            <ArticlesCreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onArticleCreated={handleArticleCreated}
            />
        </div>
    );
}
