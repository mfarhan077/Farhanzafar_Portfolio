import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDocker, FaEnvelope } from 'react-icons/fa';

const SocialSidebar = () => {
    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/mfarhan077", label: "git_hub.exe" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/farhan-zafar-121b05382/", label: "linked_in.sh" },
        { icon: <FaEnvelope />, href: "mailto:muhammadfarhanzafar007@gmail.com", label: "mail_to" },
    ];

    return (
        <motion.div
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
        >
            {/* Circuit Line */}
            <div className="absolute top-0 bottom-0 w-px bg-slate-700/50 -z-10"></div>

            {socialLinks.map((link, index) => (
                <div key={index} className="relative group">
                    <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-10 w-10 h-10 rounded-full bg-dark-bg border border-slate-700 flex items-center justify-center text-slate-400 transition-all duration-300 group-hover:border-terminal-cyan group-hover:text-terminal-cyan group-hover:shadow-[0_0_10px_rgba(88,166,255,0.4)]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.5 + (index * 0.1), type: "spring" }}
                    >
                        {link.icon}
                    </motion.a>

                    {/* Terminal Tooltip */}
                    <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1 bg-dark-card border border-terminal-green/30 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        <span className="text-terminal-green font-mono text-xs">
                            <span className="text-slate-500 mr-1">$</span>
                            {link.label}
                        </span>
                        {/* Connecting Line to Tooltip */}
                        <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-4 h-px bg-terminal-green/30"></div>
                        <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-1 bg-terminal-green rounded-full"></div>
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default SocialSidebar;
