import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Login() {
    const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(oldState => ({ ...oldState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-50 w-full h-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-400/50 w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={formData.email} onChange={handleChange} name="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={formData.password} onChange={handleChange} name="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
