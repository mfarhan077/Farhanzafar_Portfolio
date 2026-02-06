import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaGithub, FaArrowRight } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import profileImg from '../../assets/images/profile2.jpg';

const StarField = () => {
    // Generate static stars for performance
    const stars = [...Array(50)].map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 3 + 2,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        opacity: star.opacity,
                    }}
                    animate={{
                        opacity: [star.opacity, 0.2, star.opacity],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
};

const TechnologyOrbit = ({ icon, radius, duration, delay }) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{ width: radius, height: radius }}
            animate={{ rotate: 360 }}
            transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
        >
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transformOrigin: `50% ${radius / 2}px` }}
            >
                <div className="bg-dark-bg p-2 rounded-full border border-white/10 shadow-lg text-gray-400">
                    {icon}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ... imports
const Hero = () => {
    const roles = ["Data Scientist", "Data Visualization", "ML Engineer"];
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            // Typing Speed Logic
            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                // Determine pause at end of word
                setTimeout(() => setIsDeleting(true), 1500);
                setTypingSpeed(1500); // Pause before deleting
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, roles, typingSpeed]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full grid md:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left pt-10 md:pt-0"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-xs tracking-widest uppercase font-bold mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        Available for hire
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter leading-none"
                    >
                        FARHAN
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white mb-6 tracking-tighter leading-none"
                    >
                        ZAFAR
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
                        className="h-1 w-20 bg-accent mb-8 mx-auto md:mx-0 origin-left"
                    ></motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-xl md:text-2xl text-gray-400 font-mono mb-8 tracking-wide flex flex-col md:flex-row gap-2 md:items-center justify-center md:justify-start"
                    >
                        <span>CREATIVE</span>
                        <span className="text-white font-bold relative">
                            {text}
                            <span className="animate-blink ml-1 border-r-2 border-accent h-6 inline-block align-middle"></span>
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-gray-500 max-w-lg mx-auto md:mx-0 mb-10 text-base md:text-lg leading-relaxed"
                    >
                        Architecting scalable digital solutions with <span className="text-accent">React</span>, <span className="text-purple-400">Next.js</span>, <span className="text-green-400">Node.js</span>, and Cloud Infrastructure. Building full-cycle applications from pixel-perfect UIs to robust backends.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-accent text-black font-bold rounded-none skew-x-[-10deg] hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                        >
                            <span className="skew-x-[10deg]">VIEW WORK</span>
                            <FaArrowRight className="skew-x-[10deg] group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-none skew-x-[-10deg] hover:bg-white/5 transition-colors flex items-center justify-center"
                        >
                            <span className="skew-x-[10deg]">CONTACT ME</span>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right Visual (Orbital Profile) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center items-center h-[500px] w-full"
                >
                    {/* Glowing Core Background */}
                    <div className="absolute w-[300px] h-[300px] bg-accent/20 rounded-full blur-[80px] animate-pulse-slow"></div>

                    {/* Orbit Rings (Decorative) */}
                    <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 animate-spin-slow-reverse"></div>
                    <div className="absolute w-[550px] h-[550px] rounded-full border border-white/5 animate-spin-slow"></div>

                    {/* Floating Tech Icons in Orbit */}
                    <div className="absolute inset-0 animate-spin-slow">
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-dark-card p-3 rounded-xl border border-white/10 shadow-lg transform -rotate-12">
                            <FaReact className="text-3xl text-[#61DAFB]" />
                        </div>
                        <div className="absolute bottom-20 right-20 bg-dark-card p-3 rounded-xl border border-white/10 shadow-lg transform rotate-12">
                            <SiNextdotjs className="text-3xl text-white" />
                        </div>
                        <div className="absolute top-1/2 left-0 bg-dark-card p-3 rounded-xl border border-white/10 shadow-lg transform -rotate-6">
                            <FaNodeJs className="text-3xl text-[#68A063]" />
                        </div>
                    </div>

                    {/* Central Profile Image Container */}
                    <div className="relative z-10 w-64 h-64 md:w-80 md:h-80">
                        {/* Glassmorphic/Tech border */}
                        <div className="absolute inset-0 rounded-full border-2 border-accent/30 shadow-[0_0_50px_rgba(56,189,248,0.3)]"></div>
                        <div className="absolute inset-2 rounded-full border border-white/10 border-dashed animate-spin-slow"></div>

                        <div className="absolute inset-4 rounded-full overflow-hidden bg-gray-800">
                            <img
                                src={profileImg}
                                alt="Farhan Zafar"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                            />
                        </div>

                        {/* Floating Status Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-0 right-4 bg-dark-card/90 backdrop-blur border border-white/10 px-4 py-2 rounded-lg shadow-xl"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Experience</div>
                                    <div className="text-sm font-bold text-white">3+ Years</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </motion.div>

            </div >
        </section >
    );
};

export default Hero;
