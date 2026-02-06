import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDocker, FaEnvelope } from 'react-icons/fa';

const SocialSidebar = () => {
    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/mfarhan077", label: "GitHub" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/farhan-zafar-121b05382/", label: "LinkedIn" },
        { icon: <FaEnvelope />, href: "mailto:muhammadfarhanzafar007@gmail.com", label: "Email" },
    ];

    return (
        <motion.div
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            {socialLinks.map((link, index) => (
                <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-accent hover:-translate-y-1 transition-all duration-300 text-xl"
                    whileHover={{ scale: 1.2 }}
                    aria-label={link.label}
                >
                    {link.icon}
                </motion.a>
            ))}
        </motion.div>
    );
};

export default SocialSidebar;
