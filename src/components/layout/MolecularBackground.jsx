import React, { useEffect, useRef } from 'react';

const MolecularBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Configuration
        const particleCount = 70; // Adjusted for performance
        const connectionDistance = 140;
        const mouseDistance = 200;

        // Colors
        const particleColor = 'rgba(34, 211, 238, 0.8)'; // Cyan
        const lineColor = 'rgba(34, 211, 238, 0.15)'; // Faint Cyan

        let mouse = { x: null, y: null };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow gentle movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction (gentle repulsion)
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        const directionX = forceDirectionX * force * 0.6;
                        const directionY = forceDirectionY * force * 0.6;
                        this.vx -= directionX;
                        this.vy -= directionY;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = particleColor;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height); // Clear canvas

            // Draw background gradient directly on canvas for better blend
            // Or rely on CSS background of parent container

            // Draw connections first (behind particles)
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1;
                        // Opacity based on distance
                        let opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.4})`;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                        ctx.shadowBlur = 0; // No shadow for lines
                    }
                }
            }

            // Draw and update particles
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
            mouse.x = e.x;
            mouse.y = e.y;
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
            // Cleanup
            window.removeEventListener('resize', resize);
            // window.removeEventListener('mousemove', ...);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block"
                style={{ opacity: 0.8 }}
            />
            {/* Overlay for subtle texture/vignette if needed */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,#020617_100%)] opacity-80 pointer-events-none"></div>
        </div>
    );
};

export default MolecularBackground;
