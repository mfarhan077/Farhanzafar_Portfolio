import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/mfarhan077", label: "GitHub" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/farhan-zafar-121b05382/", label: "LinkedIn" },
        // { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" }, // Removed placeholder
        { icon: <FaEnvelope />, href: "mailto:muhammadfarhanzafar007@gmail.com", label: "Email" }
    ];

    const quickLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <footer className="bg-[#02020a] border-t border-white/5 relative overflow-hidden pt-16 pb-8">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-white tracking-tighter">
                            FARHAN<span className="text-accent">ZAFAR</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            Crafting state-of-the-art digital experiences with React, Next.js, and modern web technologies. Transforming ideas into pixel-perfect reality.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-accent hover:scale-110 transition-all duration-300"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Newsletter Widget */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                            <h4 className="text-white font-bold mb-2">Subscribe to Newsletter</h4>
                            <p className="text-gray-400 text-xs mb-4">Get the latest updates on new projects and tech articles.</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white w-full focus:outline-none focus:border-accent"
                                />
                                <button className="bg-accent text-dark-bg font-bold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <ul className="space-y-4 pt-2">
                            <li>
                                <a href="tel:+923006715352" className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors group">
                                    <div className="mt-1 w-8 h-8 rounded bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                                        <FaPhoneAlt size={14} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</span>
                                        <span className="font-medium">+92 300 6715352</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:muhammadfarhanzafar007@gmail.com" className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors group">
                                    <div className="mt-1 w-8 h-8 rounded bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <FaEnvelope size={14} />
                                    </div>
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Email</span>
                                        <span className="font-medium">muhammadfarhanzafar007@gmail.com</span>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-4 text-gray-400 group">
                                <div className="mt-1 w-8 h-8 rounded bg-white/5 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                                    <FaMapMarkerAlt size={14} />
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Location</span>
                                    <span className="font-medium">JDW Sugar Mill Unit 2, Machi Goth, Sadiq Abad, Punjab, Pakistan</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex items-center justify-center">
                    <p className="text-gray-500 text-sm tracking-wide">
                        &copy; {new Date().getFullYear()} Farhan Zafar. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
