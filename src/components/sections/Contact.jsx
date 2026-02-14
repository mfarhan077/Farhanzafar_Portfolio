import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTerminal } from 'react-icons/fa';

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
        console.log('> Transmitting data packet:', formData);
        alert('Signal transmitted successfully! (Demo)');
    };

    return (
        <section id="contact" className="py-20 md:py-24 bg-transparent relative overflow-hidden flex items-center justify-center min-h-[80vh] md:min-h-screen">

            <div className="w-full max-w-4xl px-4 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight font-mono">
                        <span className="text-terminal-cyan">&lt;</span>
                        Contact_Me
                        <span className="text-terminal-cyan"> /&gt;</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-terminal-cyan to-terminal-green mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-mono">
                        Initialize a connection request. Open to collaboration on new projects.
                    </p>
                </motion.div>

                {/* Terminal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#0a0a16]/90 backdrop-blur-xl rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] mx-auto relative group"
                >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-terminal-cyan/20 to-terminal-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>

                    {/* Terminal Header */}
                    <div className="bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 font-mono text-xs select-none tracking-wider">
                            <FaTerminal size={10} />
                            <span>user@portfolio: ~/contact-form</span>
                        </div>
                        <div className="w-14"></div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-10 font-mono h-full flex flex-col justify-between relative">
                        {/* Line Numbers Background (Simulated) */}
                        <div className="absolute left-4 top-10 bottom-10 w-6 flex flex-col items-center text-slate-800 text-xs select-none font-mono leading-relaxed opacity-50 hidden md:flex">
                            {Array.from({ length: 15 }).map((_, i) => <span key={i}>{i + 1}</span>)}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 md:pl-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name Input */}
                                <div className="relative group">
                                    <label className="block text-slate-500 text-xs mb-2">
                                        <span className="text-purple-400">const</span> <span className="text-blue-400">name</span> <span className="text-slate-400">=</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-dark-bg/50 border border-slate-700 rounded p-4 text-terminal-green focus:outline-none focus:border-terminal-cyan focus:shadow-[0_0_10px_rgba(88,166,255,0.2)] transition-all font-mono placeholder:text-slate-700"
                                        placeholder='"Enter Name"'
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative group">
                                    <label className="block text-slate-500 text-xs mb-2">
                                        <span className="text-purple-400">const</span> <span className="text-blue-400">email</span> <span className="text-slate-400">=</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-dark-bg/50 border border-slate-700 rounded p-4 text-terminal-green focus:outline-none focus:border-terminal-cyan focus:shadow-[0_0_10px_rgba(88,166,255,0.2)] transition-all font-mono placeholder:text-slate-700"
                                        placeholder='"Enter Email"'
                                    />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="relative group">
                                <label className="block text-slate-500 text-xs mb-2">
                                    <span className="text-purple-400">const</span> <span className="text-blue-400">message</span> <span className="text-slate-400">=</span>
                                </label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-dark-bg/50 border border-slate-700 rounded p-4 text-emerald-300 focus:outline-none focus:border-terminal-cyan focus:shadow-[0_0_10px_rgba(88,166,255,0.2)] transition-all font-mono placeholder:text-slate-700 resize-none leading-relaxed"
                                    placeholder={`\`\n  Type your message here...\n\``}
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-between items-center pt-2">
                                <div className="text-xs text-slate-600 hidden sm:block">
                                    <span className="text-purple-400">return</span> <span className="text-yellow-300">await</span> transmission.send();
                                </div>
                                <button
                                    type="submit"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-terminal-cyan/10 border border-terminal-cyan text-terminal-cyan font-bold rounded hover:bg-terminal-cyan hover:text-dark-bg transition-all duration-300 shadow-[0_0_10px_rgba(88,166,255,0.2)] hover:shadow-[0_0_20px_rgba(88,166,255,0.5)] font-mono"
                                >
                                    <span>[ EXECUTE ]</span>
                                    <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
