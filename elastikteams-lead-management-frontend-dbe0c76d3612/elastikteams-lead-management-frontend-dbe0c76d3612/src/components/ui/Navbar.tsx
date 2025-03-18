// src/components/ui/Navbar.tsx
import React, {useState} from "react";
import {Home, User, LogOut, Menu, X} from "lucide-react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate,Link} from "react-router-dom";


const Navbar: React.FC = () => {
    const {logout, user} = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
        console.log("User logged out");
    };

    const handleClickOutside = (event : MouseEvent) => {
        const dropdown = document.querySelector(".profile-dropdown");
        const profileButton = document.querySelector(".profile-button");

        if (dropdown && !dropdown.contains(event.target as Node) && profileButton && !profileButton.contains(event.target as Node)) {
            setIsProfileOpen(false);
        }
    };

    if (isProfileOpen) {
        document.addEventListener("click", handleClickOutside);
    } else {
        document.removeEventListener("click", handleClickOutside);
    }

    return (
        <nav className="bg-gradient-to-r from-indigo-500 to-purple-700 shadow-lg">
            <div className="px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between h-20 items-center">

                    {/* Logo */}

                    <div className="flex items-center space-x-3">
                        <Link to="/dashboard" className="flex items-center space-x-3 cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="66"
                                viewBox="0 0 24 24"
                                className="text-yellow-400">
                                <path
                                    fill="currentColor"
                                    d="M6.7 21.3q-.275-.275-.275-.7t.275-.7l4.775-4.8q.575-.575 1.425-.575t1.425.575l2.075 2.075l4.475-4.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-4.45 4.475q-.575.575-1.412.575T15 18.6l-2.1-2.1l-4.8 4.8q-.275.275-.687.288T6.7 21.3M4 21q-.825 0-1.412-.587T2 19V5q0-.825.588-1.412T4 3h14q.825 0 1.413.588T20 5v4q0 .425-.288.713T19 10H4zM4 8h14V5H4zm0 0V5z"/>
                            </svg>
                            <span
                                className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 drop-shadow-lg">
                                LeadFlow
                            </span>
                        </Link>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden sm:ml-8 sm:flex sm:items-center space-x-4">
                        <button
                            className="p-3 rounded-full text-white hover:bg-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Home"
                            onClick={() => navigate("/dashboard")}>
                            <Home size={24}/>
                        </button>

                        {/* Profile dropdown */}
                        <div className="ml-4 relative">
                            <div>
                                <button
                                    className="profile-button p-3 rounded-full text-white hover:bg-amber-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={toggleProfileDropdown}
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="true">
                                    <img
                                        src={`https://avatar.iran.liara.run/username?username=${user
                                            ?.name}`}
                                        alt="User Image"
                                        className="w-9 h-9 rounded-full"/>
                                </button>
                            </div>

                            {/* Profile dropdown panel */}
                            {
                                isProfileOpen && (
                                    <div
                                        className="profile-dropdown origin-top-right absolute z-50 right-0 mt-3 w-90 rounded-md shadow-lg py-2 bg-white focus:outline-none "
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu">
                                        <div className="flex gap-4 items-center p-3">
                                            <img
                                                src={`https://avatar.iran.liara.run/username?username=${user
                                                    ?.name}`}
                                                alt="User Image"
                                                className="w-9 h-9 rounded-full"/>
                                            <div>
                                                <h3 className="font-bold text-gray-700 text-sm">
                                                    {
                                                        user
                                                            ?.name
                                                    }
                                                </h3>
                                                <p className=" text-gray-700 text-sm">{
                                                        user
                                                            ?.email
                                                    }</p>
                                            </div>
                                        </div>
                                        <button
                                            className="flex items-center px-5 py-3 text-gray-700 hover:bg-gray-100 w-full text-left transition-colors duration-200"
                                            role="menuitem"
                                            onClick={handleLogout}>
                                            <LogOut size={20} className="mr-3"/>
                                            Logout
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            className="inline-flex items-center justify-center p-3 rounded-md text-white hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-expanded={isMobileMenuOpen}
                            onClick={toggleMobileMenu}>
                            <span className="sr-only">Open main menu</span>
                            {
                                isMobileMenuOpen
                                    ? <X size={28}/>
                                    : <Menu size={28}/>
                            }
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {
                isMobileMenuOpen && (
                    <div
                        className=" sm:hidden bg-gradient-to-r from-indigo-500 to-purple-700 shadow-lg">
                        <div className="flex gap-4 items-center p-3">
                            <img
                                src={`https://avatar.iran.liara.run/username?username=${user
                                    ?.name}`}
                                alt="User Image"
                                className="w-9 h-9 rounded-full"/>
                            <div>
                                <h3 className="font-bold text-white text-sm">{
                                        user
                                            ?.name
                                    }</h3>
                                <p className=" text-white text-sm">{
                                        user
                                            ?.email
                                    }</p>
                            </div>
                        </div>
                        <div className="pt-3 pb-4 space-y-2">
                            <button
                                className="flex items-center w-full px-5 py-3 text-lg font-medium text-white hover:bg-indigo-700 transition-colors duration-200"
                                onClick={handleLogout}>
                                <LogOut size={24} className="mr-3"/>
                                Logout
                            </button>
                        </div>

                    </div>
                )
            }
        </nav>
    );
};

export default Navbar;
