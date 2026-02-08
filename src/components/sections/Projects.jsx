import React from 'react';
import { motion } from 'framer-motion';
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
            whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.2)" }} // Premium Lift + Glow Shadow
            className="group relative rounded-xl overflow-hidden bg-dark-card border border-white/5 hover:border-accent/40 transition-all duration-300 h-full flex flex-col shadow-lg shadow-black/20"
        >
            {/* Image Container */}
            <div className="h-48 overflow-hidden relative border-b border-white/5">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <span className="text-accent text-xs font-semibold tracking-wider uppercase mb-2 block">{project.category}</span>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                </div>

                <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-800/50 rounded-md border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <a
                        href={project.demoLink}
                        className="flex-1 py-2.5 bg-accent text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent-hover transition-all duration-300 shadow-lg shadow-accent/20"
                    >
                        <FaExternalLinkAlt className="text-xs" /> Live Demo
                    </a>
                    {/* GitHub / Code Link */}
                    {(() => {
                        const gitUrl = project.codeLink || project.githubLink;
                        if (gitUrl && gitUrl !== '#' && gitUrl !== '') {
                            return (
                                <a
                                    href={gitUrl}
                                    className="p-2.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-300 border border-white/5"
                                    title="View Code"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaGithub className="text-lg" />
                                </a>
                            );
                        }
                        return null;
                    })()}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    // Updated to Full Stack Examples to match the new persona
    const projects = [
        {
            title: "To Do List App",
            category: "Full Stack Web App",
            description: "A real-time task management app built with React and Firebase that lets users add, update, and delete tasks instantly with responsive UI updates. Features include category selection, date picker, and instant state synchronization across devices. Built with TailwindCSS for styling and integrated with Supabase and Stripe for future scalability.",
            tags: ["React", "Firebase", "TailwindCSS", "Supabase", "Stripe"],
            demoLink: "https://youtu.be/Rvhac-4EBs8?si=Q3zKYUD-60EeMOq6",
            githubLink: "https://github.com/mfarhan077",
            image: todoAppImg // Updated Image
        },
        {
            title: "Nexus Dashboard",
            category: "Cloud Analytics",
            description: "High-performance analytics dashboard for visualizing cloud infrastructure metrics. Implements real-time data visualization using WebSockets and D3.js.",
            tags: ["React", "TypeScript", "Node.js", "WebSockets", "D3.js"],
            demoLink: "#",
            codeLink: "#",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" // Dashboard
        },
        {
            title: "Ether E-Commerce",
            category: "Full Stack Web App",
            description: "A modern, headless e-commerce solution with dynamic inventory management, cart functionality, and secure checkout processes.",
            tags: ["Next.js", "Shopify API", "Framer Motion", "Redux"],
            demoLink: "#",
            codeLink: "#",
            image: etherImg
        }
    ];

    return (
        <section id="projects" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 tracking-tight">
                        Featured Work
                    </h2>
                    <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Selected projects that demonstrate experience in building scalable web applications.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="https://github.com/mfarhan077" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-colors duration-300 font-medium group">
                        View Full Project Archive <FaGithub className="group-hover:text-white transition-colors" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
