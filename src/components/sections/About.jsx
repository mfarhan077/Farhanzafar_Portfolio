import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaLayerGroup, FaTerminal } from 'react-icons/fa';

const About = () => {
    // Typing Animation State
    const [text, setText] = useState('');
    const fullText = "> whoami";
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        if (startTyping) {
            if (text.length < fullText.length) {
                const timeout = setTimeout(() => {
                    setText(fullText.slice(0, text.length + 1));
                }, 100); // Typing speed
                return () => clearTimeout(timeout);
            }
        }
    }, [text, startTyping]);

    // Professional Config-style snippet
    const configSnippet = [
        { line: 1, text: <><span className="text-purple-400">const</span> <span className="text-yellow-300">developer</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span></> },
        { line: 2, text: <><span className="text-blue-300 pl-4">name</span><span className="text-white">:</span> <span className="text-green-300">'Farhan Zafar'</span>,</> },
        { line: 3, text: <><span className="text-blue-300 pl-4">architecture</span><span className="text-white">:</span> <span className="text-green-300">'Scalable & Secure'</span>,</> },
        { line: 4, text: <><span className="text-blue-300 pl-4">stack</span><span className="text-white">:</span> <span className="text-white">{'['}</span><span className="text-green-300">'React'</span>, <span className="text-green-300">'Node.js'</span>, <span className="text-green-300">'Cloud'</span><span className="text-white">{']'}</span>,</> },
        { line: 5, text: <><span className="text-blue-300 pl-4">status</span><span className="text-white">:</span> <span className="text-green-300">'Ready to Deploy'</span></> },
        { line: 6, text: <><span className="text-white">{'};'}</span></> },
    ];

    const techStack = [
        {
            category: "Frontend_Core",
            icon: <FaLayerGroup className="text-terminal-cyan" />,
            skills: ["React.js", "Next.js", "Tailwind", "Framer"]
        },
        {
            category: "Backend_Sys",
            icon: <FaServer className="text-terminal-green" />,
            skills: ["Node.js", "Express", "Python", "FastAPI"]
        },
        {
            category: "Database_Ops",
            icon: <FaDatabase className="text-purple-400" />,
            skills: ["PostgreSQL", "MongoDB", "Docker", "AWS"]
        }
    ];

    return (
        <section id="about" className="py-20 lg:py-28 bg-transparent text-slate-300 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Column: System Architecture */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        onViewportEnter={() => setStartTyping(true)}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1"
                    >
                        {/* Animated Badge */}
                        <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-terminal-cyan/5 border border-terminal-cyan/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] backdrop-blur-sm">
                            <FaTerminal className="text-terminal-cyan text-xs" />
                            <span className="text-terminal-cyan font-mono text-sm tracking-widest uppercase flex items-center gap-1 font-bold">
                                {text}
                                <span className="animate-pulse w-2 h-4 bg-terminal-cyan inline-block"></span>
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight font-mono">
                            Engineering <br />
                            <span className="text-terminal-green">High_Scale_Systems</span>
                        </h2>

                        <div className="space-y-6 text-base md:text-lg text-slate-400 leading-relaxed font-mono">
                            <p>
                                <span className="text-terminal-cyan">&gt;</span> Initializing <span className="text-white font-medium">Full-Stack Protocol</span>...
                                My core logic is built on clean code, scalable architecture, and user-centric design patterns.
                            </p>
                            <p>
                                <span className="text-terminal-cyan">&gt;</span> Bridging the gap between <span className="text-purple-400">complex_backend_logic</span> and <span className="text-terminal-green">intuitive_frontend_interfaces</span>. Every commit is optimized for performance and stability.
                            </p>
                        </div>

                        {/* Tech Stack Grid */}
                        <motion.div
                            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.15 }
                                }
                            }}
                        >
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="bg-dark-card border border-slate-800 rounded p-5 hover:border-terminal-cyan/50 transition-all group shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(88,166,255,0.1)]"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-dark-bg rounded-md group-hover:bg-terminal-cyan/10 transition-colors border border-white/5 group-hover:border-terminal-cyan/20">
                                            {tech.icon}
                                        </div>
                                        <h4 className="text-white font-medium text-sm font-mono">{tech.category}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {tech.skills.map((skill, i) => (
                                            <span key={i} className="text-xs font-mono text-terminal-cyan/80 bg-terminal-cyan/5 px-2 py-1 rounded border border-terminal-cyan/10">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Key Stats */}
                        <div className="mt-10 flex gap-8 md:gap-12 border-t border-slate-800 pt-8 border-dashed">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-bold text-white font-mono">3<span className="text-terminal-green">+</span></h4>
                                <p className="text-xs md:text-sm text-slate-500 mt-1 font-mono uppercase tracking-wider">System_Uptime (Yrs)</p>
                            </div>
                            <div>
                                <h4 className="text-2xl md:text-3xl font-bold text-white font-mono">20<span className="text-terminal-green">+</span></h4>
                                <p className="text-xs md:text-sm text-slate-500 mt-1 font-mono uppercase tracking-wider">Deployed_Modules</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Terminal Config */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative pt-0 lg:pt-16 order-1 lg:order-2 mb-12 lg:mb-0"
                    >
                        <div className="relative bg-[#0d1117]/90 backdrop-blur-md rounded-lg overflow-hidden border border-slate-700/50 shadow-2xl group">

                            {/* Glow */}
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-terminal-cyan/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg -z-10"></div>

                            {/* Terminal Header */}
                            <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-800">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                                    <FaCode size={10} />
                                    config.json
                                </div>
                                <div className="w-10"></div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-7 md:leading-8 overflow-x-auto custom-scrollbar bg-[#0d1117]">
                                <div className="min-w-[300px]">
                                    {configSnippet.map((line, i) => (
                                        <div key={i} className="table-row hover:bg-white/5 transition-colors">
                                            <span className="table-cell text-slate-700 text-right pr-4 select-none w-8 border-r border-slate-800/50 mr-4">{line.line}</span>
                                            <span className="table-cell whitespace-nowrap pl-4">{line.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -z-10 top-10 right-10 w-2/3 h-2/3 bg-gradient-to-br from-terminal-cyan/10 to-purple-600/10 rounded-full blur-[80px]"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
