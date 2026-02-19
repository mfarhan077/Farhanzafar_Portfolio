import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import profileImg from '../assets/images/profile2.jpg';

const ThankYou = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const time = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg relative overflow-hidden px-4 py-20">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-terminal-green/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 max-w-2xl w-full bg-dark-card/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
                {/* Top Glowing Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-terminal-green to-transparent opacity-50"></div>

                {/* Header Section */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                        className="relative w-28 h-28 mb-6"
                    >
                        <div className="absolute inset-0 rounded-full border-2 border-terminal-green shadow-[0_0_30px_rgba(74,222,128,0.3)] animate-pulse-slow"></div>
                        <img
                            src={profileImg}
                            alt="Muhammad Farhan"
                            className="w-full h-full rounded-full object-cover border-4 border-dark-bg"
                        />
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-terminal-green rounded-full border-4 border-dark-bg flex items-center justify-center">
                            <FaCheckCircle className="text-dark-bg text-[10px]" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl md:text-3xl font-bold text-white tracking-tight text-center"
                    >
                        Transmission Successful
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-500 text-xs font-mono mt-2"
                    >
                        {date} • {time}
                    </motion.div>
                </div>

                {/* Email Body */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-dark-bg/50 rounded-xl p-6 md:p-8 border border-white/5 mb-8"
                >
                    <p className="text-slate-300 leading-relaxed mb-6 font-sans text-lg">
                        Thank you for reaching out to <strong className="text-white">Muhammad Farhan</strong>.
                    </p>
                    <p className="text-slate-400 leading-relaxed mb-6">
                        Your message has been securely received through my portfolio contact system.
                        I truly appreciate your interest and will review your message carefully.
                        You can expect a response within <span className="text-terminal-green font-mono">24–48 hours</span>.
                    </p>

                    {/* Signature */}
                    <div className="border-t border-white/10 pt-6 mt-6">
                        <p className="text-white font-bold text-lg">Muhammad Farhan</p>
                        <p className="text-terminal-green font-mono text-sm mb-1">Full Stack Developer</p>
                        <p className="text-slate-500 text-sm">Available for Remote & Freelance Projects</p>
                    </div>
                </motion.div>

                {/* Action Button */}
                <div className="text-center">
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(74, 222, 128, 0.2)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-10 py-4 bg-terminal-green/10 border border-terminal-green/50 text-terminal-green font-mono font-bold rounded-lg hover:bg-terminal-green hover:text-dark-bg transition-all duration-300 flex items-center justify-center gap-3 mx-auto group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            <span>Return to Base</span>
                        </motion.button>
                    </Link>
                </div>

                {/* Decorations */}
                <div className="absolute bottom-4 right-6 text-[10px] text-slate-700 font-mono opacity-50">
                    ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>

            </motion.div>
        </div>
    );
};

export default ThankYou;
