import { useState, useEffect, useContext } from "react";
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
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

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
                setError("Error fetching service details");
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError(null);

        try {
            await updateService(id, formData);

            navigate(`/services/${id}/details`);
        } catch (error) {
            setError("Error updating service");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500 text-lg font-semibold">❌ {error}</p>;

    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">✏️ Edit Service</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
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
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-blue-700"
                        >
                            {saving ? "Saving..." : "💾 Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}