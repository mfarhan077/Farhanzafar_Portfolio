import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleScroll = (id) => {
        const elementId = id.replace('#', '');

        // If we are on the home page, scroll to the element
        if (location.pathname === '/') {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If not on home page, navigate to home and pass the target ID
            navigate('/', { state: { targetId: elementId } });
        }
    };

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/mfarhan077", label: "GitHub" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/farhan-zafar-121b05382/", label: "LinkedIn" },
        { icon: <FaEnvelope />, href: "mailto:muhammadfarhanzafar007@gmail.com", label: "Email" }
    ];

    const quickLinks = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#030305] pt-16 pb-8">
            {/* Neon Top Border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-black tracking-tighter text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        >
                            <span className="text-cyan-400">&lt;</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">FarhanZafar</span>
                            <span className="text-cyan-400"> /&gt;</span>
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-slate-400 text-sm leading-relaxed max-w-xs"
                        >
                            Crafting state-of-the-art digital experiences with <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">React</span>, <span className="text-purple-400 drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]">Next.js</span>, and modern web technologies. Transforming ideas into pixel-perfect reality.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex space-x-4"
                        >
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-10 h-10 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300 group"
                                >
                                    <span className="group-hover:scale-110 transition-transform duration-300">
                                        {link.icon}
                                    </span>
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-white font-bold mb-8 text-lg tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                        >
                            Quick Links
                        </motion.h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <button
                                        onClick={() => handleScroll(link.id)}
                                        className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-3 group text-sm bg-transparent border-none cursor-pointer p-0"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300"></span>
                                        <span className="group-hover:translate-x-1 group-hover:text-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-300">{link.name}</span>
                                    </button>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-white font-bold mb-8 text-lg tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                        >
                            Contact
                        </motion.h4>
                        <ul className="space-y-6">
                            {[
                                { icon: <FaPhoneAlt size={12} />, label: "Phone", value: "+92 300 6715352", href: "tel:+923006715352", color: "text-cyan-400", shadow: "group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]", border: "group-hover:border-cyan-400/50" },
                                { icon: <FaEnvelope size={12} />, label: "Email", value: "muhammadfarhanzafar007@gmail.com", href: "mailto:muhammadfarhanzafar007@gmail.com", color: "text-purple-400", shadow: "group-hover:shadow-[0_0_15px_rgba(192,132,252,0.4)]", border: "group-hover:border-purple-400/50" },
                                { icon: <FaMapMarkerAlt size={12} />, label: "Location", value: "JDW Sugar Mill Unit 2, Machi Goth, Sadiq Abad, Punjab, Pakistan", href: null, color: "text-pink-400", shadow: "group-hover:shadow-[0_0_15px_rgba(244,114,182,0.4)]", border: "group-hover:border-pink-400/50" }
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    {item.href ? (
                                        <a href={item.href} className="flex items-start gap-4 text-slate-400 hover:text-white transition-colors group">
                                            <div className={`mt-1 w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center ${item.color} ${item.border} ${item.shadow} transition-all duration-300 flex-shrink-0 group-hover:bg-opacity-80`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">{item.label}</span>
                                                <span className="text-sm break-all group-hover:text-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">{item.value}</span>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-start gap-4 text-slate-400 group">
                                            <div className={`mt-1 w-8 h-8 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center ${item.color} ${item.border} ${item.shadow} transition-all duration-300 flex-shrink-0`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1 font-medium">{item.label}</span>
                                                <span className="text-sm group-hover:text-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300">{item.value}</span>
                                            </div>
                                        </div>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="border-t border-white/5 pt-8 flex items-center justify-center"
                >
                    <p className="text-slate-500 text-sm font-medium tracking-wide">
                        © 2026 Farhan Zafar. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
