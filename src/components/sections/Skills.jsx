import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiGraphql, SiMongodb, SiPostgresql, SiTailwindcss, SiRedux } from 'react-icons/si';

// Skills Data
const skills = [
    { name: "React", icon: <FaReact />, color: "#61DAFB", orbit: 1 },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff", orbit: 1 },
    { name: "Redux", icon: <SiRedux />, color: "#764ABC", orbit: 1 },

    { name: "Node.js", icon: <FaNodeJs />, color: "#339933", orbit: 2 },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", orbit: 2 },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", orbit: 2 },

    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", orbit: 3 },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", orbit: 3 },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "#38B2AC", orbit: 3 },

    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", orbit: 4 },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", orbit: 4 },
    { name: "Docker", icon: <FaDocker />, color: "#2496ED", orbit: 4 },
    { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", orbit: 4 },
];

const OrbitRing = ({ radius, speed, skills, direction = 1 }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
                className="rounded-full border border-slate-800/60"
                style={{
                    width: radius * 2,
                    height: radius * 2,
                }}
                animate={{ rotate: 360 * direction }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {skills.map((skill, i) => {
                    const angle = (360 / skills.length) * i;
                    return (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                            }}
                        >
                            <motion.div
                                animate={{ rotate: -360 * direction }}
                                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                                className="relative group cursor-pointer pointer-events-auto"
                                whileHover={{ scale: 1.2 }}
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-dark-card border border-slate-700 shadow-lg transition-all duration-300 group-hover:border-terminal-cyan group-hover:shadow-[0_0_20px_rgba(88,166,255,0.4)]">
                                    <div className="text-xl md:text-2xl transition-colors duration-300 group-hover:text-white" style={{ color: skill.color }}>
                                        {skill.icon}
                                    </div>
                                </div>

                                {/* Terminal Tooltip */}
                                <div className="absolute top-[-45px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none z-50">
                                    <div className="bg-dark-card/95 backdrop-blur px-3 py-1.5 rounded-sm border border-terminal-green shadow-[0_0_15px_rgba(46,160,67,0.2)] whitespace-nowrap">
                                        <span className="text-terminal-green font-mono text-xs font-bold tracking-wider">
                                            <span className="text-slate-500 mr-1">$</span>
                                            {skill.name}
                                        </span>
                                    </div>
                                    {/* Arrow */}
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-terminal-green absolute left-1/2 -translate-x-1/2 bottom-[-6px]"></div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

const Skills = () => {
    const orbits = [
        { id: 1, radius: 80, speed: 40, skills: skills.filter(s => s.orbit === 1) },
        { id: 2, radius: 150, speed: 55, skills: skills.filter(s => s.orbit === 2) },
        { id: 3, radius: 220, speed: 70, skills: skills.filter(s => s.orbit === 3) },
        { id: 4, radius: 290, speed: 85, skills: skills.filter(s => s.orbit === 4) },
    ];

    return (
        <section id="skills" className="py-24 relative overflow-hidden min-h-screen flex flex-col items-center justify-center bg-transparent">

            {/* Section Header */}
            <div className="relative z-10 mb-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white font-mono tracking-tighter mb-4"
                >
                    <span className="text-terminal-cyan">&lt;</span>
                    SKILLS_ORBIT
                    <span className="text-terminal-cyan">/&gt;</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-terminal-green font-mono text-sm tracking-[0.2em] uppercase"
                >
                    System Capabilities Initialized
                </motion.p>
            </div>

            {/* Orbit Container */}
            <div className="relative w-full h-[600px] flex items-center justify-center scale-75 md:scale-100">
                {/* Central Core - React */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    className="absolute z-20 w-24 h-24 rounded-full bg-dark-card border-2 border-terminal-cyan shadow-[0_0_50px_rgba(88,166,255,0.4)] flex items-center justify-center"
                >
                    <div className="absolute inset-0 rounded-full border border-terminal-cyan opacity-50 animate-ping"></div>
                    <FaReact className="text-5xl text-terminal-cyan animate-spin-slow drop-shadow-[0_0_10px_rgba(88,166,255,0.8)]" />
                </motion.div>

                {orbits.map((orbit, i) => (
                    <OrbitRing
                        key={i}
                        radius={orbit.radius}
                        speed={orbit.speed}
                        skills={orbit.skills}
                        direction={i % 2 === 0 ? 1 : -1}
                    />
                ))}
            </div>
        </section>
    );
};

export default Skills;
