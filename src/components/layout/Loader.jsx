import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
    // Text sequence state
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    // Sequence timings (in ms)
    const sequence = [
        { text: "[ACCESS GRANTED]", delay: 0, duration: 1500, style: "text-terminal-green font-mono tracking-widest text-xl md:text-3xl drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" },
        { text: "Welcome, User", delay: 1500, duration: 2500, style: "text-terminal-cyan font-mono font-bold text-2xl md:text-5xl drop-shadow-[0_0_15px_rgba(103,232,249,0.8)]" },
        { text: "Initializing Portfolio System...", delay: 4000, duration: 2500, style: "text-purple-400 font-mono text-lg md:text-2xl tracking-wide drop-shadow-[0_0_10px_rgba(192,132,252,0.8)]" },
        { text: "EXECUTE STARTUP...", delay: 6500, duration: 2000, style: "text-yellow-400 font-bold font-mono text-3xl md:text-6xl uppercase tracking-[0.2em] animate-pulse drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" }
    ];

    useEffect(() => {
        let timeouts = [];

        // Calculate total time for progress bar (sum of delays + last duration) ~ 8.5s
        const totalTime = 8500;
        const intervalTime = 50; // Update every 50ms
        const structSteps = totalTime / intervalTime;
        const incrementPerStep = 100 / structSteps;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + incrementPerStep;
            });
        }, intervalTime);

        // Schedule steps
        sequence.forEach((item, index) => {
            const timeout = setTimeout(() => {
                setCurrentStep(index);
            }, item.delay);
            timeouts.push(timeout);
        });

        // Completion
        const totalDuration = sequence[sequence.length - 1].delay + sequence[sequence.length - 1].duration;
        const completeTimeout = setTimeout(() => {
            onComplete();
        }, totalDuration);
        timeouts.push(completeTimeout);

        return () => timeouts.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816] overflow-hidden">
            {/* Ambient Space Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-[#0a0a2e] to-black opacity-90"></div>

            {/* Glowing Orbs for Atmosphere */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse"></div>

            {/* Text Container */}
            <div className="relative z-10 text-center px-4 w-full max-w-4xl min-h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {sequence.map((item, index) => (
                        (currentStep === index) && (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={item.style}
                            >
                                {item.text}
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>

            {/* Bottom Progress Section */}
            <div className="absolute bottom-10 left-0 w-full flex flex-col items-center justify-center z-20">
                {/* Digital Counter */}
                <div className="text-cyan-400 font-mono text-xl md:text-2xl font-bold tracking-widest mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                    {Math.min(100, Math.floor((progress / 100) * 100))}%
                </div>

                {/* Progress Line */}
                <div className="w-64 md:w-96 h-0.5 bg-gray-800 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] relative"
                        style={{ width: `${progress}%` }}
                    >
                        <div className="absolute right-0 top-0 h-full w-2 bg-white blur-[2px]"></div>
                    </div>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-2 uppercase tracking-[0.2em] opacity-60">
                    System Initialization
                </div>
            </div>

            {/* Futuristic Tech Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
        </div>
    );
};

export default Loader;
