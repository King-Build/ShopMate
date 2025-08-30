import React, { useState } from 'react';
import { FaShopify } from "react-icons/fa";
import { FcShop } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ selectedProducts, user, setUser, setToken }) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        setOpenMenu(false);
        navigate("/signin");
    };

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 shadow-md sticky top-0 z-50">
            <div className="flex items-center gap-2 text-2xl font-bold text-blue-500">
                <FcShop className="text-3xl" />
                <Link to="/">Shop Mate</Link>
            </div>
            <ul className="flex gap-6 text-white font-medium">
                <li><Link to="/products" className="hover:text-blue-500 transition">Products</Link></li>
                <li><Link to="/about" className="hover:text-blue-500 transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
            </ul>
            <div className="flex items-center gap-4 relative">
                {!token ? (
                    <>
                        <Link to="/signup" className="cursor-pointer border px-4 py-3 bg-gray-900 text-white rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-500 transition">Sign Up</Link>
                        <Link to="/signin" className="cursor-pointer border border-blue-500 px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-gray-900 hover:border-white transition">Sign In</Link>
                    </>
                ) : (
                    <div className="relative px-4">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full" />
                            ) : (
                                <FaUserCircle className="text-3xl text-white hover:text-blue-400" />
                            )}
                            <span className="text-white font-medium">{user?.displayName || "User"}</span>
                        </div>
                        {openMenu && (
                            <div className="absolute mt-2 bg-white rounded-[5px] shadow-lg w-32">
                                <button onClick={handleLogout} className="w-full font-bold text-center px-4 py-2 text-red-600 cursor-pointer bg-slate-700 rounded-[5px]">Log out</button>
                            </div>)}
                    </div>
                )}
                <Link to="/basket" className="relative cursor-pointer p-2 rounded-full">
                    <FaShopify className="text-3xl text-white hover:text-blue-400" />
                    {selectedProducts.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{selectedProducts.length}</span>)}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
