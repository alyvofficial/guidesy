import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Touristic Website</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink to="/" className="hover:underline">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/destinations" className="hover:underline">
                                Destinations
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className="hover:underline">
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="hover:underline">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
