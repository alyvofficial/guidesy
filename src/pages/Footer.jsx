import { NavLink } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 Touristic Website. All rights reserved.</p>
                <div className="mt-4">
                    <NavLink to="/" className="text-gray-400 hover:text-white mx-2">Privacy Policy</NavLink>
                    <NavLink to="/" className="text-gray-400 hover:text-white mx-2">Terms of Service</NavLink>
                    <NavLink to="/" className="text-gray-400 hover:text-white mx-2">Contact Us</NavLink>
                </div>
            </div>
        </footer>
    );
};
