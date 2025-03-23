import { useNavigate } from "react-router";

import styles from "./serviceItem.module.css";

export default function ServiceItem({ service }) {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <img
                src={service.imageUrl}
                alt={service.name}
                className={styles.image}
            />
            <h3 className={styles.title}>{service.name}</h3>
            <button
                className={styles.button}
                onClick={() => navigate(`services/${service._id}/details`)}
            >
                View Details
            </button>
        </div>
    );
}
