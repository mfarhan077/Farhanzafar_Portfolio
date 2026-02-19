import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaTerminal, FaEnvelope, FaUser, FaCommentAlt, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('SENDING');

        // Validating fields
        if (!formData.name || !formData.email || !formData.message) {
            // Using a simple alert for now if no toast library is present, or just console error
            // ideally we would use a toast here
            console.error("Validation failed");
            setStatus('ERROR');
            setIsSubmitting(false);
            return;
        }

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                name: formData.name,
                email: formData.email,
                message: formData.message
            }, PUBLIC_KEY);

            setStatus('SUCCESS');
            setTimeout(() => {
                navigate('/thank-you');
            }, 1000); // Wait a bit to show success state
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus('ERROR');
            setIsSubmitting(false);

            // Neon Error Toast Logic (Inline for simplicity if no library)
            const errorToast = document.createElement('div');
            errorToast.innerHTML = `
                <div style="
                    position: fixed; 
                    bottom: 20px; 
                    right: 20px; 
                    background: rgba(20, 20, 30, 0.9); 
                    border: 1px solid #ef4444; 
                    color: #fb7185; 
                    padding: 16px 24px; 
                    border-radius: 8px; 
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.3); 
                    font-family: monospace; 
                    z-index: 1000;
                    backdrop-filter: blur(10px);
                    animation: slideIn 0.3s ease-out;
                ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>⚠</span>
                        <strong>TRANSMISSION FAILED</strong>
                    </div>
                </div>
                <style>
                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                </style>
            `;
            document.body.appendChild(errorToast);
            setTimeout(() => errorToast.remove(), 4000);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-24 bg-transparent relative overflow-hidden flex items-center justify-center min-h-[80vh] md:min-h-screen">

            <div className="w-full max-w-4xl px-4 md:px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-green to-emerald-600">
                            &lt;CONTACT /&gt;
                        </span>
                    </h2>
                    <p className="text-slate-400 font-mono text-sm md:text-base max-w-2xl mx-auto px-4">
                        Ready to collaborate? Initialize a secure connection functionality below.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">

                    {/* Left Panel: Contact Info / Terminal Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-dark-card/50 backdrop-blur border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[300px]"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-8 text-terminal-green/80 border-b border-slate-800 pb-4">
                                <FaTerminal />
                                <span className="font-mono text-sm">secure_channel.sh</span>
                            </div>

                            <div className="space-y-6 font-mono text-sm text-slate-300">
                                <p>
                                    <span className="text-purple-400">const</span> <span className="text-yellow-300">availability</span> = <span className="text-green-400">"OPEN_TO_WORK"</span>;
                                </p>
                                <p>
                                    <span className="text-purple-400">const</span> <span className="text-yellow-300">location</span> = <span className="text-green-400">"Remote / Hybrid"</span>;
                                </p>
                                <p className="text-slate-500">
                                    // Awaiting incoming transmission...
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12">
                            <h3 className="text-white font-bold mb-4">Connect Directly:</h3>
                            <a href="mailto:contact@farhanzafar.dev" className="flex items-center gap-3 text-slate-400 hover:text-terminal-green transition-colors mb-2 break-all md:break-normal">
                                <FaEnvelope className="shrink-0" /> contact@farhanzafar.dev
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Panel: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

                            {/* Name Input */}
                            <div className="group">
                                <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Identity</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-terminal-green transition-colors">
                                        <FaUser />
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-dark-bg/50 border border-slate-700 rounded-lg p-4 pl-12 text-white focus:outline-none focus:border-terminal-green focus:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all duration-300 font-mono placeholder:text-slate-700 disabled:opacity-50"
                                        placeholder="Enter Name"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="group">
                                <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Frequency (Email)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-terminal-green transition-colors">
                                        <FaEnvelope />
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-dark-bg/50 border border-slate-700 rounded-lg p-4 pl-12 text-white focus:outline-none focus:border-terminal-green focus:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all duration-300 font-mono placeholder:text-slate-700 disabled:opacity-50"
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="group">
                                <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">Payload (Message)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-6 text-slate-600 group-focus-within:text-terminal-green transition-colors">
                                        <FaCommentAlt />
                                    </span>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={isSubmitting}
                                        rows="4"
                                        className="w-full bg-dark-bg/50 border border-slate-700 rounded-lg p-4 pl-12 text-white focus:outline-none focus:border-terminal-green focus:shadow-[0_0_20px_rgba(74,222,128,0.2)] transition-all duration-300 font-mono placeholder:text-slate-700 resize-none leading-relaxed disabled:opacity-50"
                                        placeholder="Initialize transmission..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                type="submit"
                                className={`w-full py-4 font-mono font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300
                                    ${isSubmitting
                                        ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-terminal-green/10 text-terminal-green border border-terminal-green hover:bg-terminal-green hover:text-dark-bg hover:shadow-[0_0_25px_rgba(74,222,128,0.4)]'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        <span>TRANSMITTING...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>[ EXECUTE SEND ]</span>
                                        <FaPaperPlane className="text-sm" />
                                    </>
                                )}
                            </motion.button>

                            {status === 'ERROR' && (
                                <p className="text-red-500 font-mono text-xs text-center mt-2">
                                    Connection Error. Please try again.
                                </p>
                            )}

                        </form>
                    </motion.div>

                </div>

            </div>

        </section>
    );
};

export default Contact;
