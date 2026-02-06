import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaGithub, FaServer, FaDatabase } from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiTypescript, SiGraphql, SiMongodb, SiPostgresql, SiJest, SiCypress, SiTailwindcss, SiKubernetes } from 'react-icons/si';

const skills = [
    { name: "React", icon: <FaReact />, color: "#61DAFB", orbit: 1, course: "Advanced React Patterns" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#fff", orbit: 1, course: "The Complete Guide" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933", orbit: 2, course: "Node.js: The Complete Guide" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", orbit: 2, course: "Understanding TypeScript" },
    { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", orbit: 2, course: "JavaScript: The Weird Parts" },
    { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", orbit: 3 },
    { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", orbit: 3, course: "Advanced CSS & SASS" },
    { name: "Tailwind", icon: <SiTailwindcss />, color: "#38B2AC", orbit: 3 },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", orbit: 4, course: "MongoDB for Developers" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", orbit: 4 },
    { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", orbit: 4 },
    { name: "Docker", icon: <FaDocker />, color: "#2496ED", orbit: 4 },
];

const DriftingParticles = () => {
    // Generate random particles
    const particles = [...Array(20)].map((_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: 20 + Math.random() * 20,
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-slate-500 rounded-full opacity-20"
                    style={{
                        left: `${p.x}% `,
                        top: `${p.y}% `,
                        width: p.size,
                        height: p.size,
                        boxShadow: "0 0 10px rgba(255,255,255,0.5)"
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
};

// Simplified Implementation for stability
const OrbitRing = ({ radius, speed, skills, direction = 1 }) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 rounded-full border border-slate-700/30"
            style={{
                width: radius * 2,
                height: radius * 2,
                x: -radius,
                y: -radius,
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
                // Position on the circle (relative to center of ring which is radius, radius)

                return (
                    <motion.div
                        key={i}
                        className="absolute w-12 h-12 md:w-14 md:h-14 -ml-6 -mt-6 md:-ml-7 md:-mt-7 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 shadow-lg group hover:scale-125 hover:z-50 transition-all duration-300 cursor-pointer"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                            // The second rotate cancels local rotation so icon is upright,
                            // BUT the parent ring is rotating. So we need to counter-rotate the icon continuously.
                        }}
                    >
                        <motion.div
                            animate={{ rotate: -360 * direction }}
                            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full flex items-center justify-center rounded-full relative"
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-40 rounded-full transition-opacity duration-300"
                                style={{ background: `radial-gradient(circle, ${skill.color}, transparent)` }}
                            ></div>
                            <div className="text-xl md:text-2xl transition-colors duration-300" style={{ color: skill.color }}>
                                {skill.icon}
                            </div>

                            {/* Certified/Course Indicator Glow */}
                            {skill.course && (
                                <div className="absolute inset-0 rounded-full border border-accent/50 shadow-[0_0_15px_#6366f1] animate-pulse-slow"></div>
                            )}

                            {/* Planet Name & Course Tooltip */}
                            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-center min-w-[140px] bg-slate-900/95 backdrop-blur-xl px-4 py-3 rounded-xl border border-slate-700 pointer-events-none z-50 transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-2xl">
                                <div className="text-slate-200 text-xs font-bold whitespace-nowrap tracking-wide">{skill.name}</div>
                                {skill.course && (
                                    <div className="text-[10px] text-accent font-medium whitespace-nowrap mt-1 flex items-center justify-center gap-1">
                                        <span>✦</span> {skill.course}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

const Skills = () => {
    // Group skills by orbit level - Cinematic slow speeds
    const orbits = [
        { id: 1, radius: 80, speed: 45, skills: skills.filter(s => s.orbit === 1) },
        { id: 2, radius: 150, speed: 60, skills: skills.filter(s => s.orbit === 2) },
        { id: 3, radius: 220, speed: 75, skills: skills.filter(s => s.orbit === 3) },
        { id: 4, radius: 290, speed: 90, skills: skills.filter(s => s.orbit === 4) },
    ];

    return (
        <section id="skills" className="py-24 bg-transparent relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
            {/* Deep Space Gradients - Professional Slate/Indigo */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-[-50%] left-[-20%] w-[1000px] h-[1000px] bg-indigo-900/10 rounded-full blur-[200px] animate-pulse"></div>
                <div className="absolute bottom-[-50%] right-[-20%] w-[1000px] h-[1000px] bg-slate-800/10 rounded-full blur-[200px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full mb-12 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-slate-100 mb-4 tracking-tight">
                        TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">STACK</span>
                    </h2>
                    <h3 className="text-accent font-bold tracking-[0.3em] uppercase text-xs md:text-sm">
                        Zero-Gravity Arsenal
                    </h3>
                </motion.div>
            </div>

            {/* Solar System Container */}
            <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center perspective-1000">

                {/* Drifting Star Particles in Foreground/Midground */}
                <DriftingParticles />

                {/* Central Star (Sun) */}
                <div className="absolute z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_0_80px_rgba(99,102,241,0.5)] flex items-center justify-center animate-pulse-slow">
                    <FaReact className="text-3xl md:text-4xl text-white animate-spin-slow drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>

                {/* Orbit Rings */}
                {orbits.map((orbit, i) => (
                    <OrbitRing
                        key={i}
                        radius={orbit.radius}
                        speed={orbit.speed}
                        skills={orbit.skills}
                        direction={i % 2 === 0 ? 1 : -1} // Alternate rotation direction
                    />
                ))}
            </div>

        </section>
    );
};

export default Skills;
