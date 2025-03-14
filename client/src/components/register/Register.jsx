export default function Register() {
    return (
        <div className="flex items-center justify-center py-12 w-full bg-white">
            <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-400/50 w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input type="text" name="username" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" name="rePassword" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
