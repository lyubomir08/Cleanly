import { useState } from "react";
import { createArticle } from "../../../services/articleService";

export default function ArticlesCreateModal({ isOpen, onClose, onArticleCreated }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formErrors, setFormErrors] = useState({ title: "", content: "" });

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

        setLoading(true);

        try {
            const newArticle = await createArticle({ title, content });
            onArticleCreated(newArticle);
            onClose();
            setTitle("");
            setContent("");
            setFormErrors({ title: "", content: "" });
        } catch (err) {
            setError(err.message || "Error creating article.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-md">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">📝 Create a New Article</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
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
                            rows="5"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
