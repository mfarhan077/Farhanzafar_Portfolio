import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signal transmitted:', formData);
        alert('Signal transmitted successfully! (Demo)');
    };

    // Terminal Input Styles
    const inputClasses = "w-full bg-transparent border-b border-gray-700 text-cyan-400 font-mono py-2 focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-600 text-sm md:text-base";
    const labelClasses = "block text-gray-500 font-mono text-xs mb-1";

    return (
        <section id="contact" className="py-20 md:py-24 bg-transparent relative overflow-hidden flex items-center justify-center">

            <div className="w-full max-w-4xl px-4 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h3 className="font-black text-white tracking-tighter leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
                        Let’s Work Together
                    </h3>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#0a0a16]/95 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl mx-auto"
                >
                    {/* Terminal Header */}
                    <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-slate-500 font-mono text-xs select-none tracking-wider">contact_protocol.exe</div>
                        <div className="w-14"></div> {/* Spacer for center alignment */}
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-10 font-mono h-full flex flex-col justify-between">
                        {/* Typing Effect Greeting */}
                        <div className="mb-8 md:mb-10 min-h-[60px]">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-cyan-400/80 text-sm md:text-base font-medium"
                            >
                                <span className="mr-2 text-cyan-400">➜</span>
                                <span className="typing-effect">Initializing secure transmission channel...</span>
                                <span className="animate-pulse ml-1 text-cyan-400">_</span>
                            </motion.div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Identity Input */}
                                <div className="relative group">
                                    <label className={labelClasses}>Identity</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                        placeholder="Enter Name"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>

                                {/* Frequency Input */}
                                <div className="relative group">
                                    <label className={labelClasses}>Frequency (Email)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                        placeholder="Enter Email"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-focus-within:w-full"></div>
                                </div>
                            </div>

                            {/* Data Packet Input */}
                            <div className="relative group">
                                <label className={labelClasses}>Data Packet (Message)</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Type your message here..."
                                ></textarea>
                                <div className="absolute bottom-2 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-focus-within:w-full"></div>
                            </div>

                            {/* Transmit Button */}
                            <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-6">
                                <div className="text-[10px] text-slate-600 hidden md:block">
                                    STATUS: <span className="text-emerald-500/70">READY_TO_TRANSMIT</span>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full md:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 font-bold rounded hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
                                >
                                    <span>TRANSMIT SIGNAL</span>
                                    <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
