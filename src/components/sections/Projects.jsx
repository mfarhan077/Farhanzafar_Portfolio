import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import etherImg from '../../assets/images/ether-ecommerce.png';
import todoAppImg from '../../assets/images/todoapp.jpeg';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className="group relative rounded-2xl overflow-hidden bg-[#0a0a16] border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col h-full shadow-xl hover:shadow-2xl hover:shadow-cyan-900/20"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16] via-transparent to-transparent z-10 opacity-60"></div>
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow relative z-20">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                    {project.description}
                </p>

                {/* Read More Link */}
                <div className="mb-6">
                    <Link to={`/project/${project.id}`} className="text-cyan-400 text-sm font-semibold cursor-pointer hover:underline">
                        Read More...
                    </Link>
                </div>

                {/* Action Buttons - Dual Layout */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <Link
                        to={`/project/${project.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-sm font-bold hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300 group/btn"
                    >
                        <FaExternalLinkAlt className="text-xs group-hover/btn:-translate-y-0.5 transition-transform" />
                        Live Demo
                    </Link>

                    <a
                        href={project.codeLink || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-purple-500/30 text-purple-400 text-sm font-bold transition-all duration-300 group/btn ${project.codeLink ? 'bg-purple-950/30 hover:bg-purple-500/10 hover:border-purple-400' : 'opacity-50 cursor-not-allowed bg-transparent'}`}
                    >
                        <FaGithub className="text-sm group-hover/btn:-translate-y-0.5 transition-transform" />
                        Code
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    // Updated to Full Stack Examples to match the new persona
    const projects = [
        {
            id: "todo-app",
            title: "To Do List App",
            category: "Full Stack Web App",
            description: "A real-time task management app built with React and Firebase that lets users add, update, and delete tasks instantly.",
            tags: ["React", "Firebase", "TailwindCSS"],
            demoLink: "#", // Handled by Link now
            githubLink: "https://github.com/mfarhan077",
            codeLink: "https://github.com/mfarhan077",
            image: todoAppImg
        },
        {
            id: "nexus-dashboard",
            title: "Nexus Dashboard",
            category: "Cloud Analytics",
            description: "High-performance analytics dashboard for visualizing cloud infrastructure metrics using WebSockets and D3.js.",
            tags: ["React", "TypeScript", "D3.js"],
            demoLink: "#",
            codeLink: "#",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: "ether-ecommerce",
            title: "Ether E-Commerce",
            category: "Full Stack Web App",
            description: "A modern, headless e-commerce solution with dynamic inventory management and secure checkout processes.",
            tags: ["Next.js", "Shopify API", "Redux"],
            demoLink: "#",
            codeLink: "#",
            image: etherImg
        }
    ];

    return (
        <section id="projects" className="py-20 md:py-24 relative bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-100 mb-4 tracking-tight">
                        FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">WORK</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
                        Selected projects that demonstrate experience in building scalable web applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="https://github.com/mfarhan077" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300 font-medium group text-lg">
                        View Full Project Archive <FaGithub className="group-hover:text-white transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
