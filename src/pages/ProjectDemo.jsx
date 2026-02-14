import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaCalendarAlt, FaUser, FaTools, FaCheckCircle, FaExternalLinkAlt, FaLaptopCode, FaLock } from 'react-icons/fa';
import todoDemoVideo from '../assets/images/todo-app-demo.mp4';
import etherImg from '../assets/images/ether-ecommerce.png';
// Using a placeholder for Nexus if no local image exists, or reuse a generic tech one
const nexusImg = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop";

// Project Data - Centralized
const projectsData = {
    "todo-app": {
        title: "todo_list.exe",
        headingHighlight: ".exe",
        subtitle: "v1.0.0 (Stable)",
        description: "A fully functional task management application. Try it out below! You can add tasks, set categories, mark as important, and manage your day directly in this window.",
        liveAppUrl: "/Todo-App/index.html",
        githubLink: "https://github.com/mfarhan077",
        tags: ["Vanilla JS", "HTML5", "CSS3", "LocalStorage"],
        features: [
            "Interactive Task Management",
            "Local Storage Persistence",
            "Category Filtering",
            "Responsive Design"
        ]
    },
    "nexus-dashboard": {
        title: "Nexus Dashboard",
        headingHighlight: "Dashboard",
        subtitle: "Cloud Infrastructure Analytics",
        description: "An advanced analytics dashboard providing real-time insights into cloud infrastructure metrics. Leverages WebSockets for live data streaming.",
        videoUrl: "",
        image: nexusImg,
        githubLink: "#",
        tags: ["React", "TypeScript", "D3.js"],
        features: [
            "Real-time WebSocket Data",
            "D3.js Virtualizations",
            "Serverless Architecture",
            "Role-Based Access Control"
        ]
    },
    "ether-ecommerce": {
        title: "Ether E-Commerce",
        headingHighlight: "E-Commerce",
        subtitle: "Next-Gen Shopping Platform",
        description: "A next-generation platform focusing on speed and user experience. Features dynamic inventory and secure checkout.",
        videoUrl: "",
        image: etherImg,
        githubLink: "#",
        tags: ["Next.js", "Shopify API", "Redux"],
        features: [
            "Headless Commerce",
            "Stripe Integration",
            "Dynamic Cart System",
            "ISR Rendering"
        ]
    }
};

const ProjectDemo = () => {
    const { id } = useParams();
    const project = projectsData[id];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-terminal-green bg-dark-bg font-mono">
                <h2 className="text-2xl font-bold mb-4">&lt;Error code="404" /&gt;</h2>
                <Link to="/" className="text-terminal-cyan hover:underline underline-offset-4">cd ..</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-slate-300 font-mono selection:bg-terminal-cyan/30 overflow-hidden relative bg-dark-bg">
            {/* Matrix/Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">

                {/* Back Link */}
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-terminal-green transition-colors mb-16 group font-medium text-sm">
                    <span className="text-terminal-cyan">&lt;</span> <span className="group-hover:translate-x-1 transition-transform">Back to Root</span>
                </Link>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    {/* Subtitle Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-terminal-green/20 bg-terminal-green/5 text-sm font-medium text-terminal-green mb-8 font-mono"
                    >
                        <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></span>
                        {project.subtitle || "Build Success"}
                    </motion.div>

                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                        <span className="text-terminal-cyan">&gt; </span>
                        {project.title.replace(project.headingHighlight, "")}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-green to-terminal-cyan">
                            {project.headingHighlight}
                        </span>
                        <span className="animate-pulse">_</span>
                    </h1>

                    {/* Description */}
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-light border-l-2 border-terminal-cyan/30 pl-6 text-left bg-dark-card/50 p-4 rounded-r-lg">
                        <span className="text-terminal-cyan block mb-2 text-sm">// Project Description</span>
                        {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {project.liveAppUrl ? (
                            <a
                                href="#app-container"
                                onClick={(e) => { e.preventDefault(); document.getElementById('app-container').scrollIntoView({ behavior: 'smooth' }) }}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black rounded-sm font-bold transition-all shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:shadow-[0_0_25px_rgba(0,255,0,0.4)] flex items-center justify-center gap-2 group"
                            >
                                <FaLaptopCode className="group-hover:animate-bounce" />
                                ./run_demo.sh
                            </a>
                        ) : (
                            <button
                                disabled
                                className="w-full sm:w-auto px-8 py-4 bg-white/5 text-slate-600 border border-white/5 rounded-sm font-bold cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <FaLock size={14} />
                                Access Denied
                            </button>
                        )}

                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 text-slate-300 hover:border-terminal-cyan hover:text-terminal-cyan rounded-sm font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <FaGithub size={20} />
                            git checkout
                        </a>
                    </div>
                </motion.div>

                {/* App / Video / Image Container */}
                <motion.div
                    id="app-container"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-6xl mx-auto"
                >
                    <div className={`relative bg-dark-bg rounded-lg overflow-hidden border border-slate-800 shadow-2xl shadow-black/80 ${project.liveAppUrl ? 'h-[800px]' : ''}`}>

                        {/* Code Editor Toolbar */}
                        <div className="bg-[#0d1117] border-b border-slate-800 flex items-end pt-3 px-4 gap-2 z-20 relative text-sm font-mono overflow-x-auto">
                            {/* Tab 1 */}
                            <div className="bg-[#161b22] text-terminal-cyan px-4 py-2 rounded-t-lg border-t border-l border-r border-slate-800 flex items-center gap-2 relative">
                                <span className="text-yellow-400">JS</span>
                                <span>Project_Demo.jsx</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-terminal-cyan"></span>
                            </div>
                            {/* Tab 2 (Inactive) */}
                            <div className="text-slate-500 px-4 py-2 flex items-center gap-2 hover:bg-[#161b22]/50 rounded-t-lg transition-colors cursor-pointer">
                                <span className="text-blue-400">CSS</span>
                                <span>styles.module.css</span>
                            </div>

                            {/* Address Bar Simulation (Right aligned) */}
                            <div className="ml-auto flex items-center gap-3 text-xs text-slate-500 pb-2">
                                <span>Main Branch</span>
                                <div className="w-2 h-2 rounded-full bg-terminal-green animate-pulse"></div>
                            </div>
                        </div>

                        {/* Content Area */}
                        {project.liveAppUrl ? (
                            <div className="w-full h-full bg-[#0d1117] relative">
                                <iframe
                                    src={project.liveAppUrl}
                                    className="w-full h-full border-none"
                                    title="Live Application"
                                ></iframe>
                            </div>
                        ) : (

                            <div className="aspect-video bg-slate-900/50 relative group">
                                {project.videoSrc ? (
                                    <video
                                        className="absolute inset-0 w-full h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        controls
                                    >
                                        <source src={project.videoSrc} type={project.videoType || "video/mp4"} />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : project.image ? (
                                    <>
                                        <img
                                            src={project.image}
                                            alt="Project Preview"
                                            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-700 blur-sm scale-110"
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
                                            <div className="bg-black/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                                                <div className="text-4xl mb-4">🚧</div>
                                                <h3 className="text-2xl font-bold text-white mb-2">Development in Progress</h3>
                                                <p className="text-slate-400">Live preview for this project is currently being polished.</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 text-slate-500">
                                        <p className="text-lg font-medium mb-2">Media Unavailable</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Features Section */}
                <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {project.features && project.features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-dark-card border border-slate-700/50 p-6 rounded-lg hover:border-terminal-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all group"
                        >
                            <div className="w-10 h-10 rounded bg-terminal-cyan/10 flex items-center justify-center mb-4 text-terminal-cyan group-hover:scale-110 transition-transform">
                                <span className="font-mono text-lg font-bold">{"{}"}</span>
                            </div>
                            <h3 className="text-white font-mono font-bold mb-2">key: "Feature_{index + 1}"</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-mono">value: "{feature}"</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProjectDemo;
