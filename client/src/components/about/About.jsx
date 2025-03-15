export default function About() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <section className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    About Cleanify
                </h1>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    At <span className="font-semibold text-blue-600">Cleanly</span>, we are committed to providing
                    high-quality cleaning services that enhance the comfort, hygiene, and well-being of our clients. 
                    Our expert team ensures every space shines with freshness.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed text-center">
                    We believe that a clean environment leads to a happier and healthier life. 
                    Our mission is to offer top-tier cleaning services while using eco-friendly 
                    products to ensure both quality and sustainability.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900">Professionalism</h3>
                        <p className="text-gray-600 mt-2">
                            Our trained staff delivers reliable and high-quality cleaning services.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900">Eco-Friendly Solutions</h3>
                        <p className="text-gray-600 mt-2">
                            We use environmentally safe cleaning products to protect you and nature.
                        </p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900">Customer Satisfaction</h3>
                        <p className="text-gray-600 mt-2">
                            Your happiness is our priority! We ensure 100% satisfaction with our services.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
