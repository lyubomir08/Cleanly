import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAllArticles } from "../../../services/articleService";

import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import ArticleItem from "./articles-item/ArticleItem";

export default function ArticlesCatalog() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Blog Articles</h1>

            {articles.length === 0 ? (
                <p className="text-center text-gray-500 text-lg font-semibold">📭 No articles found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {articles.map(article => (
                        <ArticleItem key={article._id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}
