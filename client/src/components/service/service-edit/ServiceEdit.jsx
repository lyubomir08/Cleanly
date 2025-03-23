import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { getServiceById, updateService } from "../../../services/serviceService";

import LoadingSpinner from "../../loading-spinner/LoadingSpinner";

export default function ServiceEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await getServiceById(id);

                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    imageUrl: data.imageUrl
                });
            } catch (error) {
                setSubmitError(error.message || "Failed to fetch service details.");
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const errors = {};

        if (!formData.name || formData.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters.";
        }

        if (!formData.description || formData.description.trim().length < 10) {
            errors.description = "Description must be at least 10 characters.";
        }

        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            errors.price = "Price must be a number greater than 0.";
        }

        if (formData.imageUrl && !formData.imageUrl.startsWith("http")) {
            errors.imageUrl = "Image URL must start with http/https.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validate()) return;

        try {
            setSaving(true);

            await updateService(id, formData);
            navigate(`/services/${id}/details`);
        } catch (error) {
            setSubmitError(error.message || "Failed to update service.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">✏️ Edit Service</h2>

                {submitError && (
                    <p className="text-red-500 text-center mb-4 font-medium">{submitError}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.description && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.price && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {formErrors.imageUrl && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.imageUrl}</p>
                        )}
                    </div>

                    {formData.imageUrl && (
                        <div className="text-center">
                            <img
                                src={formData.imageUrl}
                                alt="Service Preview"
                                className="w-full max-w-xs mx-auto h-48 object-cover rounded-lg shadow"
                            />
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(`/services/${id}/details`)}
                            className="bg-gray-500 text-white px-5 py-3 rounded-lg font-medium transition hover:bg-gray-600"
                        >
                            ❌ Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className={`${
                                saving ? "opacity-60 cursor-not-allowed" : ""
                            } bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-700`}
                        >
                            {saving ? "Saving..." : "💾 Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
