import { useState } from "react";
import { useNavigate } from "react-router";

import { createService } from "../../../services/serviceService";

export default function ServiceCreate() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const errors = {};

        if (!formData.name || formData.name.trim().length < 3) {
            errors.name = "Service name must be at least 3 characters.";
        }

        if (!formData.description || formData.description.trim().length < 10) {
            errors.description = "Description must be at least 10 characters.";
        }

        if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            errors.price = "Price must be a number greater than 0.";
        }

        if (!formData.imageUrl || !formData.imageUrl.startsWith("http")) {
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
            await createService(formData);
            navigate("/services");
        } catch (error) {
            setSubmitError(error.message || "Failed to create service.");
        }
    };

    return (
        <div className="flex items-center justify-center py-12 w-full min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-400/50 w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Create New Service
                </h2>

                {submitError && (
                    <p className="text-red-500 text-center mb-4">{submitError}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Service Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.description && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.price && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.imageUrl && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.imageUrl}</p>
                        )}
                    </div>

                    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
                        Create Service
                    </button>
                </form>
            </div>
        </div>
    );
}
