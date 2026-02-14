import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
    // Current stage of the loading sequence
    const [status, setStatus] = useState('initializing');
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState('> SYSTEM INITIALIZING...');

    useEffect(() => {
        let interval;

        // Progress Bar Simulation
        const simulateProgress = () => {
            interval = setInterval(() => {
                setProgress(prev => {
                    // Phase-based progression
                    if (prev < 30) return prev + 1; // Fast
                    if (prev < 70) return prev + 0.5; // Slower (module loading)
                    if (prev < 90) return prev + 2; // Fast (optimizing)
                    if (prev < 100) return prev + 0.5; // Final check
                    return 100;
                });
            }, 50);
        };

        simulateProgress();

        // Text Sequence Logic
        const sequence = async () => {
            // Phase 1: Init
            await new Promise(r => setTimeout(r, 1000));
            setStatus('modules');

            // Phase 2: Module Loading (Rapid Flicker)
            const modules = [
                "Loading Core.jsx...",
                "Optimizing Assets...",
                "Establishing Uplink...",
                "Encrypting Connection...",
                "Syncing User Data..."
            ];

            for (const mod of modules) {
                setCurrentText(`> ${mod}`);
                await new Promise(r => setTimeout(r, 400));
            }

            // Phase 3: Finalizing
            setStatus('finalizing');
            setCurrentText("> ACCESS GRANTED");
            await new Promise(r => setTimeout(r, 1000));

            // Complete
            onComplete();
        };

        sequence();

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d1117] overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-terminal-green/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Central Content */}
            <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center gap-8">

                {/* Tech Loader Animation */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Outer Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-slate-800 rounded-full border-t-terminal-green border-r-transparent border-b-cyan-500 border-l-transparent"
                    ></motion.div>

                    {/* Inner Ring */}
                    <motion.div
                        animate={{ rotate: -180 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border border-slate-800 rounded-full border-t-purple-500 border-r-transparent border-b-transparent border-l-purple-500 opacity-70"
                    ></motion.div>

                    {/* Center Pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    ></motion.div>
                </div>

                {/* Text Display */}
                <div className="h-12 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`font-mono text-lg tracking-widest ${status === 'finalizing'
                                ? 'text-terminal-green font-bold text-shadow-green'
                                : 'text-slate-300'
                                }`}
                        >
                            {currentText}
                            <span className="animate-blink inline-block ml-1 w-2 h-5 bg-terminal-green align-middle"></span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden relative group">
                    <motion.div
                        className="h-full bg-gradient-to-r from-terminal-green via-cyan-400 to-purple-500 relative"
                        style={{ width: `${Math.min(100, progress)}%` }}
                    >
                        <div className="absolute right-0 top-0 h-full w-4 bg-white blur-[4px]"></div>
                    </motion.div>
                </div>

                {/* System Stats (Decoration) */}
                <div className="flex justify-between w-full text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    <span>Mem: 64TB</span>
                    <span>Net: Secure</span>
                    <span>Ver: 2.1.0</span>
                </div>

            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>

        </div>
    );
};

export default Loader;
