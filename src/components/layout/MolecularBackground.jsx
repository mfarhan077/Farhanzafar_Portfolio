import React, { useEffect, useRef } from 'react';

const MolecularBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration - Premium Tuning
        const particleCount = 60; // Slightly reduced for cleaner look
        const connectionDistance = 160;
        const mouseDistance = 220;

        // Colors & Style
        const baseColor = { r: 34, g: 211, b: 238 }; // Cyan #22d3ee

        let mouse = { x: null, y: null };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // Depth simulation: 0 = far, 1 = near
                this.depth = Math.random();

                // Size depends on depth (0.5 to 2.5px)
                this.size = (this.depth * 2) + 0.5;

                // Speed depends on depth (Parallax: nearer moves faster, but overall very slow)
                const speedMultiplier = 0.15; // 10x slower than typical
                this.vx = (Math.random() - 0.5) * speedMultiplier * (1 + this.depth);
                this.vy = (Math.random() - 0.5) * speedMultiplier * (1 + this.depth);

                // Oscillation for "anti-gravity" floating feel
                this.angle = Math.random() * Math.PI * 2;
                this.oscillationSpeed = Math.random() * 0.002;
            }

            update() {
                // Gentle floating movement
                this.x += this.vx;
                this.y += this.vy;

                // Add subtle sine-wave drift
                this.angle += this.oscillationSpeed;
                this.y += Math.sin(this.angle) * 0.05;
                this.x += Math.cos(this.angle) * 0.05;

                // Wrap around edges for infinite feel (smoother than bouncing)
                if (this.x < -50) this.x = width + 50;
                if (this.x > width + 50) this.x = -50;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;

                // Mouse interaction (Smooth gentle repulsion)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    // Only react if close enough
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;

                        // Push away - weight by depth (nearer particles move more)
                        const interactionStrength = 0.8 * (0.5 + this.depth * 0.5);

                        this.vx -= forceDirectionX * force * interactionStrength * 0.05;
                        this.vy -= forceDirectionY * force * interactionStrength * 0.05;
                    }
                }

                // Friction to return to normal speed after mouse interaction
                // Target velocity is very low, so we damp towards it or just simple friction
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Keep them moving minimally if they stall
                if (Math.abs(this.vx) < 0.01) this.vx += (Math.random() - 0.5) * 0.001;
                if (Math.abs(this.vy) < 0.01) this.vy += (Math.random() - 0.5) * 0.001;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Alpha based on depth (fades far particles)
                const alpha = 0.3 + (this.depth * 0.5); // 0.3 to 0.8
                ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha})`;

                // Glow only for nearer particles
                if (this.depth > 0.6) {
                    ctx.shadowBlur = 10 * this.depth;
                    ctx.shadowColor = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.5)`;
                } else {
                    ctx.shadowBlur = 0;
                }

                ctx.fill();
                ctx.shadowBlur = 0; // Reset
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // 1. Draw connections FIRST (Layer 0)
            // Only connect if both particles are close AND relatively same depth group to avoid messy cross-depth lines?
            // For now, simpler is cleaner: Connect all nearby.

            ctx.lineWidth = 0.5; // Thin lines

            for (let a = 0; a < particles.length; a++) {
                // Optimization: compare with subset or just loop all (count is low < 100)
                for (let b = a + 1; b < particles.length; b++) { // Optimized loop
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Opacity based on distance AND average depth
                        let distFactor = 1 - (distance / connectionDistance);
                        let avgDepth = (particles[a].depth + particles[b].depth) / 2;
                        let alpha = distFactor * avgDepth * 0.2; // Max opacity 0.2 (very subtle)

                        if (alpha > 0) {
                            ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha})`;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }

            // 2. Draw Particles (Layer 1)
            // Sort by depth so near ones draw on top? (Optional for 2D circles, but good for parallax feel if overlapping)
            // particles.sort((a, b) => a.depth - b.depth); 

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        // Event Listeners
        window.addEventListener('resize', () => {
            resize();
            init();
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX; // Ensure accurate coordinates
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Start
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            // Cleanup other listeners if passed as verified functions, 
            // but for anonymous functions in simple React effects, mostly fine if component doesn't remount often.
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
            // No opacity prop here, control alpha in canvas for cleaner look
            />
            {/* Overlay for subtle texture/vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_120%)] opacity-60 pointer-events-none"></div>
        </div>
    );
};

export default MolecularBackground;
