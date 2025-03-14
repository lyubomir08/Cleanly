import { Link } from "react-router";

export default function Header() {
    return (
        <header className="bg-gray-900 text-white py-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-2xl font-semibold tracking-wide">Cleanify</Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link to="/" className="hover:text-gray-300 transition">Home</Link></li>
                        <li><Link to="/services" className="hover:text-gray-300 transition">Catalog Services</Link></li>
                        <li><Link to="/about" className="hover:text-gray-300 transition">About</Link></li>
                        <li><Link to="/login" className="hover:text-gray-300 transition">Sign in</Link></li>
                        <li><Link to="/register" className="hover:text-gray-300 transition">Sign Up</Link></li>
                        <li className="hover:text-gray-300 transition cursor-pointer">Logout</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
