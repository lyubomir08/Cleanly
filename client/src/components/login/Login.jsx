import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Login() {
    const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({ email: "", password: "" });
    const [submitError, setSubmitError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const validate = () => {
        const errors = { email: "", password: "" };
        let isValid = true;
    
        if (!formData.email || formData.email.trim().length < 5) {
            errors.email = "Email is too short.";
            isValid = false;
        } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
            errors.email = "Please enter a valid email (example@mail.com).";
            isValid = false;
        }
    
        const password = formData.password;
        const hasMinLength = password.length >= 5;
    
        if (!hasMinLength) {
            errors.password = "Password must be at least 5 characters.";
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
            await login(formData.email, formData.password);
            navigate("/");
        } catch (error) {
            setSubmitError(error.message || "Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 py-50 w-full h-auto">
            <div className="bg-white p-8 rounded-lg shadow-xl shadow-gray-400/50 w-96">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>

                {submitError && (
                    <p className="text-red-500 text-center mb-4 font-medium">{submitError}</p>
                )}

                <form onSubmit={handleSubmit}>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}
