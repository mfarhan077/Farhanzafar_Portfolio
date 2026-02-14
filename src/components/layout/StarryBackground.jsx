import React, { useEffect, useRef } from 'react';

const StarryBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particleCount = 45; // Reduced for cleaner, minimal look
        const connectionDistance = 180; // Slightly increased range
        const mouseDistance = 250;

        let particles = [];

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.15, // Much slower, smoother movement
                    vy: (Math.random() - 0.5) * 0.15,
                    baseSize: Math.random() * 1.5 + 0.5,
                    pulseSpeed: 0.01 + Math.random() * 0.02, // Slower pulsing
                    pulseOffset: Math.random() * Math.PI * 2,
                    opacity: Math.random() * 0.4 + 0.1 // Subtler base opacity
                });
            }
        };

        const handleMouseMove = (event) => {
            mouseRef.current.x = event.clientX;
            mouseRef.current.y = event.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        const draw = () => {
            // 1. Dark Terminal Background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0d1117'); // GitHub Dark Dim
            gradient.addColorStop(1, '#010409'); // Even darker

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and Draw Particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Slower Pulsing
                const time = Date.now() * p.pulseSpeed;
                const pulse = Math.sin(time * 0.1 + p.pulseOffset);
                const currentSize = p.baseSize + pulse * 0.2;

                // Gentler Opacity Fade
                let currentOpacity = p.opacity + (pulse * 0.1);
                if (currentOpacity < 0.1) currentOpacity = 0.1;
                if (currentOpacity > 0.6) currentOpacity = 0.6;

                // Mouse Interaction (Smoother Repulsion)
                if (mouseRef.current.x != null) {
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        const repulsionStrength = 0.4; // Softer push
                        p.vx -= forceDirectionX * force * repulsionStrength * 0.05;
                        p.vy -= forceDirectionY * force * repulsionStrength * 0.05;
                    }
                }

                // Screen wrapping
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw Glowing Node (Terminal Green / Cyan)
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                // Alternate between Green and Cyan based on index for a "Matrix/Code" feel
                const isSystemNode = i % 2 === 0;
                const color = isSystemNode ? `rgba(46, 160, 67, ${currentOpacity})` : `rgba(88, 166, 255, ${currentOpacity})`; // Green / Blue

                ctx.fillStyle = color;
                ctx.shadowBlur = 8; // Glow effect
                ctx.shadowColor = isSystemNode ? `rgba(46, 160, 67, ${currentOpacity * 0.8})` : `rgba(88, 166, 255, ${currentOpacity * 0.8})`;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset for lines

                // Draw Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const lineBaseAlpha = 0.12 * (1 - distance / connectionDistance);
                        const fadeFactor = (currentOpacity + p2.opacity) / 2;

                        // Lines should be subtle green/cyan mix
                        ctx.strokeStyle = `rgba(56, 139, 253, ${lineBaseAlpha * fadeFactor * 4})`;
                        ctx.lineWidth = 0.4;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        handleResize();
        draw();

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-dark-bg overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block w-full h-full"
            />
        </div>
    );
};

export default StarryBackground;
