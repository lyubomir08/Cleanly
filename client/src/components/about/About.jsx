import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <section className={styles.header}>
                <h1 className={styles.title}>About Cleanly</h1>
                <p className={styles.description}>
                    At <span className={styles.highlight}>Cleanly</span>, we are committed to providing
                    high-quality cleaning services that enhance the comfort, hygiene, and well-being of our clients.
                    Our expert team ensures every space shines with freshness.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.sectionDescription}>
                    We believe that a clean environment leads to a happier and healthier life.
                    Our mission is to offer top-tier cleaning services while using eco-friendly
                    products to ensure both quality and sustainability.
                </p>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Our Values</h2>
                <div className={styles.valuesFlex}>
                    <div className={styles.valueCard}>
                        <h3 className={styles.valueTitle}>Professionalism</h3>
                        <p className={styles.valueText}>
                            Our trained staff delivers reliable and high-quality cleaning services.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3 className={styles.valueTitle}>Eco-Friendly Solutions</h3>
                        <p className={styles.valueText}>
                            We use environmentally safe cleaning products to protect you and nature.
                        </p>
                    </div>
                    <div className={styles.valueCard}>
                        <h3 className={styles.valueTitle}>Customer Satisfaction</h3>
                        <p className={styles.valueText}>
                            Your happiness is our priority! We ensure 100% satisfaction with our services.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
