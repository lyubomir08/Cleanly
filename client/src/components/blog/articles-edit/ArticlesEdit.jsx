import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { getArticleById, updateArticle } from "../../../services/articleService";
import { UserContext } from "../../../contexts/UserContext";

export default function ArticlesEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({ title: "", content: "" });

    useEffect(() => {
        async function fetchArticle() {
            try {
                const data = await getArticleById(id);

                if (user?._id !== data.author?._id) {
                    navigate("/articles");
                    return;
                }

                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                setError(err.message || "Article not found or you do not have permission to edit it.");
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [id, user]);

    const validate = () => {
        const errors = { title: "", content: "" };
        let isValid = true;

        if (title.trim().length < 5) {
            errors.title = "Title must be at least 5 characters long.";
            isValid = false;
        }

        if (content.trim().length < 20) {
            errors.content = "Content must be at least 20 characters long.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!validate()) return;

        try {
            await updateArticle(id, { title, content });
            navigate("/articles");
        } catch (error) {
            setError(error.message || "Failed to update the article.");
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">✏️ Edit Article</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                        rows="6"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                        onClick={() => navigate(`/articles`)}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
