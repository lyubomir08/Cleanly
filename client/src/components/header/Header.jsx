import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
    const { user, logout } = useContext(UserContext);

    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-semibold tracking-wide">Cleanly</Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
                        <li><Link to="/services" className="hover:text-gray-300 transition">Catalog</Link></li>
                        <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>

                        {user ? (
                            <>
                                {user.role === "admin" && (
                                    <li><Link to="/services/add" className="hover:text-gray-300 transition">Add</Link></li>
                                )}
                                <li><Link to="/profile" className="hover:text-gray-300 transition">Profile</Link></li>
                                <li className="hover:text-gray-300 transition cursor-pointer" onClick={logout}>
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="hover:text-gray-300 transition">Sign In</Link></li>
                                <li><Link to="/register" className="hover:text-gray-300 transition">Sign Up</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
