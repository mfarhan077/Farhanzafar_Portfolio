import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');

        if (location.pathname === '/') {
            // If on home page, just scroll
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // If on another page, navigate to home then scroll
            navigate('/');
            // Small delay to allow navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/90 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0 z-50 relative">
                        <a
                            href="#home"
                            onClick={(e) => handleNavClick(e, '#home')}
                            className="text-xl md:text-2xl font-bold text-slate-100 tracking-tighter hover:text-white transition-colors duration-300 font-mono"
                        >
                            <span className="text-terminal-cyan">&lt;</span>
                            FarhanZafar
                            <span className="text-terminal-cyan"> /&gt;</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-sm font-medium text-slate-400 hover:text-terminal-green transition-all duration-300 relative group py-2 cursor-pointer font-mono"
                                >
                                    <span className="text-terminal-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-1">//</span>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-slate-200 hover:text-terminal-cyan focus:outline-none transition-colors p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 bg-dark-bg/95 z-40 flex flex-col items-center justify-center border-b border-terminal-cyan/20"
                    >
                        <div className="space-y-8 text-center">
                            {links.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-3xl font-bold text-slate-300 hover:text-terminal-green transition-colors duration-300 block tracking-tight cursor-pointer font-mono"
                                    >
                                        <span className="text-terminal-cyan mr-2">&lt;</span>
                                        {link.name}
                                        <span className="text-terminal-cyan ml-2">/&gt;</span>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
