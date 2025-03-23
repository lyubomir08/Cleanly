import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { getAllServices } from "../../services/serviceService";

import ServiceItem from "./service-item/ServiceItem";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";

import styles from "./home.module.css";

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
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Welcome to Cleanify!</h1>
                <p className={styles.heroText}>
                    We provide high-quality cleaning services to make your home and office spotless.
                    Let us take care of the mess while you enjoy a cleaner, healthier environment.
                </p>
                <div className={styles.heroButtonWrapper}>
                    <button
                        className={styles.heroButton}
                        onClick={() => navigate("/services")}
                    >
                        Explore All Services
                    </button>
                </div>
            </section>

            <h2 className={styles.sectionTitle}>Some of our Services</h2>

            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <div className={styles.servicesWrapper}>
                    {services.map((service) => (
                        <ServiceItem key={service._id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
}
