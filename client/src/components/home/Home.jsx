export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6 py-6">
            <section className="mb-3 mt-2">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">A Cleaner Home, A Healthier Life</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    At <span className="font-semibold">Cleanify</span>, we believe in providing top-notch cleaning services
                    that give you more time to focus on what truly matters. Whether it's your home or office, we bring
                    professional-grade cleanliness to your space.
                </p>
                <button className="mt-3 bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition">
                    Book a Cleaning Now
                </button>
            </section>

            <section className="max-w-6xl w-full px-6 py-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center w-72">
                        <h3 className="text-lg font-semibold text-gray-800">Home Cleaning</h3>
                        <p className="text-gray-600 mt-1">
                            Enjoy a sparkling clean home with our professional deep cleaning services.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center w-72">
                        <h3 className="text-lg font-semibold text-gray-800">Office Cleaning</h3>
                        <p className="text-gray-600 mt-1">
                            Keep your workspace neat and professional with our expert office cleaning solutions.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center w-72">
                        <h3 className="text-lg font-semibold text-gray-800">Carpet & Upholstery</h3>
                        <p className="text-gray-600 mt-1">
                            Extend the life of your carpets and furniture with our specialized cleaning services.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
