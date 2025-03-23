import { useState, useEffect } from "react";

import { getAllServices, filterServices } from "../../../services/serviceService";

import LoadingSpinner from "../../loading-spinner/LoadingSpinner";
import ServiceItem from "./service-item/ServiceItem";

export default function ServiceCatalog() {
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({
        name: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "newest",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const data = await getAllServices();

            setServices(data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const filteredData = await filterServices(filters);

            setServices(filteredData);
        } catch (error) {
            console.error("Error filtering services:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Services</h1>

            <form onSubmit={applyFilters} className="mb-6 flex flex-wrap gap-4 items-center justify-center">
                <input
                    type="text"
                    name="name"
                    placeholder="Search by name..."
                    value={filters.name}
                    onChange={handleFilterChange}
                    className="border px-4 py-2 rounded-md"
                />
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="border px-4 py-2 rounded-md"
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="border px-4 py-2 rounded-md"
                />
                <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="border px-4 py-2 rounded-md">
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                    Apply Filters
                </button>
            </form>

            {loading ? (
                <LoadingSpinner />
            ) : services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map(service => (
                        <ServiceItem key={service._id} service={service}/>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 col-span-full">No services found.</p>
            )}
        </div>
    );
}
