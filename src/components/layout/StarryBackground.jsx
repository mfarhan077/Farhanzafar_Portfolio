import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particleCount = 50; // Balanced density
        const connectionDistance = 160;
        const mouseDistance = 220;
        const characters = ['0', '1', '{', '}', '<', '>', '*', '+', '?', '!', ';', '/'];

        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4; // Slower, more deliberate movement
                this.vy = (Math.random() - 0.5) * 0.4;

                // Tech Vibe Properties
                this.char = characters[Math.floor(Math.random() * characters.length)];
                this.size = Math.random() * 12 + 10; // Larger, bolder font
                this.baseColor = Math.random() > 0.5 ? '#0f0' : '#0ff'; // Terminal Green or Cyan
                this.opacity = Math.random() * 0.6 + 0.4; // MUCH bolder opacity (0.4 - 1.0)
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 3;
                    const directionY = forceDirectionY * force * 3;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }

            draw() {
                // Use the customized font
                ctx.font = `bold ${this.size}px "JetBrains Mono", monospace`; // Bold font
                ctx.fillStyle = this.baseColor;
                ctx.globalAlpha = this.opacity;
                ctx.fillText(this.char, this.x, this.y);
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear but keep transparent

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw Connections
            ctx.lineWidth = 0.8; // Thicker lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = '#58a6ff'; // GitHub Accent Blue for connections
                        ctx.globalAlpha = (1 - distance / connectionDistance) * 0.4; // More visible connections
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        // Mouse Listeners
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        window.addEventListener('resize', resizeCanvas);
        // Track mouse via window or container if needed, but here canvas is absolute full
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-dark-bg"
        />
    );
};

export default StarryBackground;
