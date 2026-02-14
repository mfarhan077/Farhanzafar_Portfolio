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
        <footer className="bg-[#02020a] border-t border-white/5 relative overflow-hidden pt-12 md:pt-16 pb-8">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 md:mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-white tracking-tighter font-mono">
                            <span className="text-terminal-cyan">&lt;</span>
                            FarhanZafar
                            <span className="text-terminal-cyan"> /&gt;</span>
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-sm font-mono">
                            Crafting state-of-the-art digital experiences with <span className="text-accent">React</span>, <span className="text-purple-400">Next.js</span>, and modern web technologies. Transforming ideas into pixel-perfect reality.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-10 h-10 rounded-full bg-dark-card border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-terminal-cyan/20 hover:border-terminal-cyan transition-all duration-300 shadow-[0_0_10px_rgba(88,166,255,0.1)] hover:shadow-[0_0_15px_rgba(88,166,255,0.4)]"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-terminal-green font-bold mb-6 text-lg font-mono tracking-wider">
                            &gt; Quick_Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-terminal-cyan transition-colors flex items-center gap-2 group text-sm font-mono"
                                    >
                                        <span className="text-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">&gt;</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Newsletter Widget */}
                        <div className="bg-black/40 p-6 rounded-lg border border-slate-800 relative overflow-hidden group hover:border-terminal-cyan/30 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terminal-cyan to-transparent opacity-20"></div>
                            <h4 className="text-white font-bold mb-2 font-mono flex items-center gap-2">
                                <span className="text-terminal-green text-xs">●</span> Subscribe.sh
                            </h4>
                            <p className="text-slate-400 text-xs mb-4 font-mono">Get the latest updates on new projects and tech articles.</p>
                            <div className="flex gap-2 flex-col sm:flex-row">
                                <div className="relative flex-grow">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-terminal-green font-mono text-xs">&gt;</span>
                                    <input
                                        type="email"
                                        placeholder="Enter_email..."
                                        className="bg-dark-bg border border-slate-700 rounded w-full pl-8 pr-4 py-2 text-sm text-terminal-cyan focus:outline-none focus:border-terminal-cyan font-mono placeholder:text-slate-600"
                                    />
                                </div>
                                <button className="bg-terminal-cyan/10 border border-terminal-cyan text-terminal-cyan font-bold px-4 py-2 rounded text-sm hover:bg-terminal-cyan hover:text-dark-bg transition-all whitespace-nowrap font-mono">
                                    [EXECUTE]
                                </button>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <ul className="space-y-4 pt-2">
                            <li>
                                <a href="tel:+923006715352" className="flex items-start gap-4 text-slate-400 hover:text-white transition-colors group">
                                    <div className="mt-1 w-8 h-8 rounded bg-dark-card border border-white/5 flex items-center justify-center text-accent group-hover:border-accent group-hover:shadow-[0_0_10px_rgba(88,166,255,0.3)] transition-all flex-shrink-0">
                                        <FaPhoneAlt size={12} />
                                    </div>
                                    <div className="font-mono">
                                        <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Phone</span>
                                        <span className="text-sm">+92 300 6715352</span>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:muhammadfarhanzafar007@gmail.com" className="flex items-start gap-4 text-slate-400 hover:text-white transition-colors group">
                                    <div className="mt-1 w-8 h-8 rounded bg-dark-card border border-white/5 flex items-center justify-center text-purple-400 group-hover:border-purple-400 group-hover:shadow-[0_0_10px_rgba(192,132,252,0.3)] transition-all flex-shrink-0">
                                        <FaEnvelope size={12} />
                                    </div>
                                    <div className="font-mono">
                                        <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Email</span>
                                        <span className="text-sm break-all">muhammadfarhanzafar007@gmail.com</span>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-4 text-slate-400 group">
                                <div className="mt-1 w-8 h-8 rounded bg-dark-card border border-white/5 flex items-center justify-center text-pink-400 group-hover:border-pink-400 group-hover:shadow-[0_0_10px_rgba(244,114,182,0.3)] transition-all flex-shrink-0">
                                    <FaMapMarkerAlt size={12} />
                                </div>
                                <div className="font-mono">
                                    <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Location</span>
                                    <span className="text-sm">JDW Sugar Mill Unit 2, Machi Goth, Sadiq Abad, Punjab, Pakistan</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 border-dashed pt-8 flex items-center justify-center md:justify-end">
                    <p className="text-slate-500 text-xs md:text-sm tracking-wider font-mono">
                        <span className="text-terminal-green">//</span> Built with Precision by <span className="text-slate-300">Farhan Zafar</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
