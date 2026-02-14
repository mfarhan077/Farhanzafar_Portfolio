import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaLayerGroup } from 'react-icons/fa';

const About = () => {
    // Professional Config-style snippet
    const configSnippet = [
        { line: 1, text: <><span className="text-purple-400">const</span> <span className="text-yellow-300">engineer</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span></> },
        { line: 2, text: <><span className="text-blue-300 pl-4">name</span><span className="text-white">:</span> <span className="text-green-300">'Farhan Zafar'</span>,</> },
        { line: 3, text: <><span className="text-blue-300 pl-4">focus</span><span className="text-white">:</span> <span className="text-green-300">'Scalability & Performance'</span>,</> },
        { line: 4, text: <><span className="text-blue-300 pl-4">stack</span><span className="text-white">:</span> <span className="text-white">{'['}</span><span className="text-green-300">'React'</span>, <span className="text-green-300">'Node.js'</span>, <span className="text-green-300">'AWS'</span><span className="text-white">{']'}</span>,</> },
        { line: 5, text: <><span className="text-blue-300 pl-4">status</span><span className="text-white">:</span> <span className="text-green-300">'Ready to Deploy'</span></> },
        { line: 6, text: <><span className="text-white">{'};'}</span></> },
    ];

    const techStack = [
        {
            category: "Frontend Architecture",
            icon: <FaLayerGroup className="text-cyan-400" />,
            skills: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"]
        },
        {
            category: "Backend Engineering",
            icon: <FaServer className="text-green-400" />,
            skills: ["Node.js", "Express", "Python", "FastAPI"]
        },
        {
            category: "Data & DevOps",
            icon: <FaDatabase className="text-purple-400" />,
            skills: ["PostgreSQL", "MongoDB", "Docker", "AWS"]
        }
    ];

    return (
        <section id="about" className="py-20 lg:py-28 bg-transparent text-gray-300 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Column: Professional Profile */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-8 bg-cyan-500"></span>
                            <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">About The Developer</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Scale</span>.
                        </h2>

                        <div className="space-y-6 text-base md:text-lg text-gray-400 leading-relaxed">
                            <p>
                                I am a <span className="text-gray-200 font-medium">Full-Stack Engineer</span> focused on building high-performance applications. My philosophy is simple: clean code, scalable architecture, and user-centric design.
                            </p>
                            <p>
                                Specializing in the modern JavaScript ecosystem and Python, I bridge the gap between complex backend logic and intuitive frontend experiences. I treat every commit as a step towards a more robust solution.
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
                                    className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-cyan-500/30 transition-colors group"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-white/5 rounded-md group-hover:bg-cyan-500/10 transition-colors">
                                            {tech.icon}
                                        </div>
                                        <h4 className="text-white font-medium text-sm">{tech.category}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {tech.skills.map((skill, i) => (
                                            <span key={i} className="text-xs font-mono text-gray-400 bg-black/30 px-2 py-1 rounded border border-white/5">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Key Stats */}
                        <div className="mt-10 flex gap-8 md:gap-12 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-2xl md:text-3xl font-bold text-white">3+</h4>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-2xl md:text-3xl font-bold text-white">20+</h4>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">Projects Built</p>
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
                        <div className="relative bg-[#0d1117] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                            {/* Terminal Header */}
                            <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                                </div>
                                <div className="text-xs text-gray-500 font-mono">config.json</div>
                                <div className="w-10"></div> {/* Spacer */}
                            </div>

                            {/* Terminal Content - Scrollable on mobile */}
                            <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-7 md:leading-8 overflow-x-auto custom-scrollbar">
                                <div className="min-w-[300px]">
                                    {configSnippet.map((line, i) => (
                                        <div key={i} className="table-row">
                                            <span className="table-cell text-gray-700 text-right pr-4 select-none w-8">{line.line}</span>
                                            <span className="table-cell whitespace-nowrap">{line.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -z-10 top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full blur-[100px]"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
