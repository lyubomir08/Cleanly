import { useContext, useEffect, useState } from "react";
import { getAllArticles } from "../../../services/articleService";
import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import ArticleItem from "./articles-item/ArticleItem";
import ArticlesCreateModal from "../articles-create-modal/ArticlesCreateModal";
import { UserContext } from "../../../contexts/UserContext";

export default function ArticlesCatalog() {
    const { user } = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getAllArticles();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error.message);
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

            {articles.length === 0 ? (
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
