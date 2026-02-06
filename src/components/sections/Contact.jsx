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
    const inputClasses = "w-full bg-transparent border-b border-gray-700 text-cyan-400 font-mono py-2 focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-600";
    const labelClasses = "block text-gray-500 font-mono text-xs mb-1";

    return (
        <section id="contact" className="py-24 bg-transparent relative overflow-hidden flex items-center justify-center">

            <div className="w-full max-w-4xl px-4 relative z-10">

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0a0a16]/95 backdrop-blur-md rounded-lg overflow-hidden border border-gray-800 shadow-2xl"
                >
                    {/* Terminal Header */}
                    <div className="bg-[#1a1a2e] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-gray-500 font-mono text-xs select-none">contact_protocol.exe</div>
                        <div className="w-14"></div> {/* Spacer for center alignment */}
                    </div>

                    {/* Terminal Body */}
                    <div className="p-8 md:p-12 font-mono">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mb-12"
                        >
                            <h2 className="text-purple-400 text-xl md:text-2xl mb-2">
                                <span className="mr-2">➜</span>
                                Initialize transmission...
                            </h2>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                                </div>
                            </div>

                            {/* Data Packet Input */}
                            <div className="relative group">
                                <label className={labelClasses}>Data Packet (Message)</label>
                                <textarea
                                    name="message"
                                    rows="1"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Type your message here..."
                                    style={{ minHeight: '40px' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                ></textarea>
                            </div>

                            {/* Transmit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="group relative inline-flex items-center gap-3 px-8 py-3 bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 font-bold rounded hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300"
                                >
                                    <span>TRANSMIT SIGNAL</span>
                                    <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                                    {/* Button Glow Effect */}
                                    <div className="absolute inset-0 bg-cyan-400/20 blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                                </button>
                            </div>
                        </form>

                        {/* Footer Status */}
                        <div className="mt-12 text-gray-600 text-xs flex justify-between">
                            <span>STATUS: WAITING_FOR_INPUT</span>
                            <span className="animate-pulse">_</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
