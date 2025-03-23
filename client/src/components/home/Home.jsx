import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAllServices } from "../../services/serviceService";

import ServiceItem from "./service-item/ServiceItem";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

export default function Home() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchServices() {
            try {
                const data = await getAllServices();
                setServices(data.slice(0, 3));
            } catch (error) {
                setError(error.message || "Failed to load services. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchServices();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <section className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Welcome to Cleanify!
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                    We provide high-quality cleaning services to make your home and office spotless.
                    Let us take care of the mess while you enjoy a cleaner, healthier environment.
                </p>
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md text-lg font-medium hover:bg-green-500 transition-transform transform hover:scale-105"
                        onClick={() => navigate("/services")}
                    >
                        Explore All Services
                    </button>
                </div>
            </section>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Some of our Services</h2>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p className="text-center text-red-500 text-lg font-medium">{error}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
                    {services.map((service) => (
                        <ServiceItem key={service._id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}
