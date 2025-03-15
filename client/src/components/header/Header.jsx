import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

export default function Header() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutClickHandler = async () => {
        logout();
        navigate("/");
    };

    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-semibold tracking-wide">Cleanly</Link>

                <button
                    className="lg:hidden text-white text-3xl focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                <nav className="hidden lg:flex">
                    <ul className="flex space-x-6">
                        <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
                        <li><Link to="/services" className="hover:text-gray-300 transition">Catalog</Link></li>
                        <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
                        <li><Link to="/articles" className="hover:text-gray-300 transition">Blog</Link></li>

                        {user ? (
                            <>
                                {user.role === "admin" && (
                                    <li><Link to="/services/add" className="hover:text-gray-300 transition">Add</Link></li>
                                )}
                                <li><Link to="/profile" className="hover:text-gray-300 transition">Profile</Link></li>
                                <li
                                    className="hover:text-gray-300 transition cursor-pointer"
                                    onClick={logoutClickHandler}
                                >
                                    Sign out
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

            {isMenuOpen && (
                <nav className="lg:hidden bg-gray-800 text-white absolute top-16 left-0 w-full shadow-md">
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        <li><Link to="/" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/services" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Catalog</Link></li>
                        <li><Link to="/about" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                        <li><Link to="/articles" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>

                        {user ? (
                            <>
                                {user.role === "admin" && (
                                    <li><Link to="/services/add" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Add</Link></li>
                                )}
                                <li><Link to="/profile" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
                                <li
                                    className="hover:text-gray-300 transition cursor-pointer"
                                    onClick={() => {
                                        logoutClickHandler();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Sign out
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Sign In</Link></li>
                                <li><Link to="/register" className="hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
}
