import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">

            <div className="max-w-7xl mx-auto px-4 py-10">

                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">

                    {/* Logo + About */}
                    <div>
                        <h2 className="text-white text-2xl font-bold mb-4">E-Kart</h2>
                        <p className="text-sm">
                            Your one-stop shop for the latest electronics at unbeatable prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm">
                            <li>Contact Us</li>
                            <li>Returns</li>
                            <li>Shipping</li>
                            <li>FAQs</li>
                        </ul>
                    </div>

                    {/* Social + Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>

                        <div className="flex gap-4 mb-4">


                            <FaFacebook className="cursor-pointer hover:text-white" />
                            <FaInstagram className="cursor-pointer hover:text-white" />
                            <FaTwitterSquare className="cursor-pointer hover:text-white" />
                        </div>

                        <p className="text-sm mb-2">Subscribe to our newsletter</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="px-3 py-2 w-full bg-white text-black rounded-l-md"
                            />
                            <button className="bg-blue-600 px-4 rounded-r-md text-white">
                                Go
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                    © {new Date().getFullYear()} E-Kart. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;