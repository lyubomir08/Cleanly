import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Register() {
    const { register } = useContext(UserContext);
    const [formData, setFormData] = useState({ username: "", email: "", password: "", rePassword: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.password !== formData.rePassword) {
                return;
            }

            await register(formData.username, formData.email, formData.password, formData.rePassword);

            navigate("/");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="flex items-center justify-center py-12 w-full">
            <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-400/50 w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input type="text" value={formData.username} onChange={handleChange} name="username" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" value={formData.email} onChange={handleChange} name="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" value={formData.password} onChange={handleChange} name="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input type="password" value={formData.rePassword} onChange={handleChange} name="rePassword" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600" />
                    </div>
                    <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
