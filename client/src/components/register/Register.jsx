import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Register() {
    const { register } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        rePassword: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(oldState => ({ ...oldState, [e.target.name]: e.target.value }));
    };

    const validate = () => {
        const errors = {};
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const allowedDomains = ["gmail.com", "abv.bg"];

        if (formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters.";
            isValid = false;
        }

        if (!emailRegex.test(formData.email)) {
            errors.email = "Please enter a valid email (example@mail.com).";
            isValid = false;
        } else {
            const domain = formData.email.split("@")[1];
            
            if (!allowedDomains.includes(domain)) {
                errors.email = "Only gmail.com and abv.bg emails are allowed.";
                isValid = false;
            }
        }

        const password = formData.password;
        const hasMinLength = password.length >= 5;

        if (!hasMinLength) {
            errors.password = "Password must be at least 5 characters.";
            isValid = false;
        }

        if (formData.password !== formData.rePassword) {
            errors.rePassword = "Passwords do not match.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!validate()) return;

        setLoading(true);

        try {
            await register(
                formData.username,
                formData.email,
                formData.password,
                formData.rePassword
            );
            navigate("/");
        } catch (error) {
            setSubmitError(error.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-30 w-full h-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-400/50 w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>

                {submitError && (
                    <p className="text-red-500 text-center mb-4 font-medium">{submitError}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            name="username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.username && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={formData.rePassword}
                            onChange={handleChange}
                            name="rePassword"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                        {formErrors.rePassword && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.rePassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}
