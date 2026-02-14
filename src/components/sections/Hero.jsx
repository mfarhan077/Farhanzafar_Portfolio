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
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent pt-20 md:pt-0">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-900/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center min-h-[calc(100vh-80px)]">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start"
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

                    <h1 className="font-black text-white mb-0 tracking-tighter leading-[0.9] text-[clamp(3.5rem,8vw,6rem)]">
                        FARHAN
                    </h1>
                    <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-white mb-6 tracking-tighter leading-[0.9] text-[clamp(3.5rem,8vw,6rem)]">
                        ZAFAR
                    </h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
                        className="h-1 w-20 bg-accent mb-8 origin-center md:origin-left"
                    ></motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="h-8 mb-8" // Fixed height to prevent layout shift
                    >
                        <h2 className="text-xl md:text-2xl text-slate-400 font-mono tracking-wide flex flex-row gap-2 items-center justify-center md:justify-start">
                            <span>INNOVATION</span>
                            <span className="text-white font-bold relative">
                                {text}
                                <span className="animate-blink ml-1 border-r-2 border-accent h-5 md:h-6 inline-block align-middle"></span>
                            </span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="text-slate-400 max-w-lg text-base md:text-lg leading-relaxed mb-10"
                    >
                        Architecting scalable digital solutions with <span className="text-accent font-medium">React</span>, <span className="text-purple-400 font-medium">Next.js</span>, <span className="text-green-400 font-medium">Node.js</span>, and Cloud Infrastructure. Building full-cycle applications from pixel-perfect UIs to robust backends.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-accent text-slate-950 font-bold text-center rounded hover:bg-white transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                        >
                            <span>VIEW WORK</span>
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-transparent border border-white/10 text-white font-bold text-center rounded hover:bg-white/5 transition-colors flex items-center justify-center w-full sm:w-auto backdrop-blur-sm"
                        >
                            <span>CONTACT ME</span>
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Right Visual (Orbital Profile) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative flex justify-center items-center py-12 md:py-0 w-full order-1 md:order-2"
                >
                    {/* Responsive Scaling Container */}
                    <div className="relative w-[clamp(280px,50vw,500px)] h-[clamp(280px,50vw,500px)] flex items-center justify-center">
                        {/* Glowing Core Background */}
                        <div className="absolute inset-[15%] bg-accent/20 rounded-full blur-[60px] animate-pulse-slow"></div>

                        {/* Orbit Rings (Decorative) */}
                        <div className="absolute inset-[10%] rounded-full border border-white/5 animate-spin-slow-reverse"></div>
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow"></div>

                        {/* Floating Tech Icons in Orbit */}
                        <div className="absolute inset-0 animate-spin-slow">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-dark-card/80 backdrop-blur p-2 md:p-3 rounded-xl border border-white/10 shadow-lg transform -rotate-12">
                                <FaReact className="text-2xl md:text-3xl text-[#61DAFB]" />
                            </div>
                            <div className="absolute bottom-[15%] right-[10%] bg-dark-card/80 backdrop-blur p-2 md:p-3 rounded-xl border border-white/10 shadow-lg transform rotate-12">
                                <SiNextdotjs className="text-2xl md:text-3xl text-white" />
                            </div>
                            <div className="absolute top-1/2 left-0 bg-dark-card/80 backdrop-blur p-2 md:p-3 rounded-xl border border-white/10 shadow-lg transform -rotate-6">
                                <FaNodeJs className="text-2xl md:text-3xl text-[#68A063]" />
                            </div>
                        </div>

                        {/* Central Profile Image Container */}
                        <div className="relative z-10 w-[65%] h-[65%]">
                            {/* Glassmorphic/Tech border */}
                            <div className="absolute inset-0 rounded-full border-2 border-accent/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]"></div>
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
                                className="absolute bottom-[5%] right-[5%] bg-dark-card/90 backdrop-blur border border-white/10 px-3 py-2 md:px-4 rounded-lg shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg md:text-xl">⚡</span>
                                    <div>
                                        <div className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-1">Experience</div>
                                        <div className="text-xs md:text-sm font-bold text-white leading-none">3+ Years</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </motion.div>

            </div >
        </section >
    );
};

export default Hero;
