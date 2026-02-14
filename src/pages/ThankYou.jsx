import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const ThankYou = () => {
    // Random Success Messages
    const messages = [
        "Transmission Received. Stand by for Uplink.",
        "Message Encrypted & Delivered Successfully.",
        "Communication Established. I'll get back to you immediately.",
        "Packet Sent. Acknowledgment incoming soon.",
        "Signal Strong. Your message has landed safely."
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure top of page on load
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-bg relative overflow-hidden px-4">

            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-terminal-green/5 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 max-w-lg w-full bg-dark-card/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl"
            >
                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-terminal-green/10 text-terminal-green mb-8"
                >
                    <FaCheckCircle className="text-4xl" />
                </motion.div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    System Acknowledged
                </h1>

                {/* Dynamic Message */}
                <p className="text-slate-400 font-mono text-sm md:text-base leading-relaxed mb-10">
                    &gt; {randomMessage}
                </p>

                {/* Back Button */}
                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-transparent border border-slate-700 text-slate-300 font-mono font-bold rounded-lg hover:border-terminal-green hover:text-terminal-green hover:bg-terminal-green/5 transition-all flex items-center justify-center gap-2 mx-auto group w-full sm:w-auto"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Base</span>
                    </motion.button>
                </Link>

                {/* Footer Code Decoration */}
                <div className="mt-8 pt-8 border-t border-slate-800/50">
                    <div className="flex justify-between text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                        <span>Status: 200 OK</span>
                        <span>Latency: 24ms</span>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default ThankYou;
