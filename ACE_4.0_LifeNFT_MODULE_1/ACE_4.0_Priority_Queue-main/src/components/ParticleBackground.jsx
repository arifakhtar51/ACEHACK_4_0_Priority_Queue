import React, { useEffect, useRef } from 'react';

const AdvancedMultiDNABackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Load particles.js for a subtle background effect.
    const particlesScript = document.createElement('script');
    particlesScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
    particlesScript.async = true;
    document.body.appendChild(particlesScript);
    particlesScript.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 180, density: { enable: true, value_area: 800 } },
            color: {
              value: [
                "#e61919", "#cc0000", "#990000", "#ff6666",
                "#ff3333", "#b30000", "#800000", "#ff9999",
              ],
            },
            shape: {
              type: ["circle", "edge"],
              stroke: { width: 0, color: "#000000" },
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: { enable: true, speed: 0.8, opacity_min: 0.2, sync: false },
            },
            size: {
              value: 5,
              random: true,
              anim: { enable: true, speed: 2, size_min: 1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#cc0000",
              opacity: 0.4,
              width: 1.2,
            },
            move: {
              enable: true,
              speed: 2.5,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "bounce",
              bounce: true,
              attract: { enable: true, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: false },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 180, line_linked: { opacity: 0.8 } },
              bubble: { distance: 150, size: 12, duration: 2, opacity: 0.8, speed: 3 },
              repulse: { distance: 150, duration: 0.4 },
              push: { particles_nb: 6 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });
      }
    };

    // Create canvas for DNA animation.
    const canvas = document.createElement('canvas');
    canvas.id = 'dna-canvas';
    canvas.className = 'absolute inset-0 z-10 pointer-events-none';
    canvasRef.current = canvas;
    if (containerRef.current) {
      containerRef.current.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Define five DNA samples:
    // Four small samples at the corners and one larger sample at the center.
    const dnaSamples = [
      { // Top-Left
        xFactor: 0.2, yFactor: 0.2,
        widthFactor: 0.1, heightFactor: 0.15,
        segments: 15, angle: 0, rotationSpeed: 0.003,
        colors: ['#e61919', '#990000', '#cc0000', '#ff6666'],
        verticalSpeed: 0.2,
      },
      { // Top-Right
        xFactor: 0.8, yFactor: 0.2,
        widthFactor: 0.1, heightFactor: 0.15,
        segments: 15, angle: 0, rotationSpeed: 0.003,
        colors: ['#0066cc', '#3399ff', '#0033cc', '#99ccff'],
        verticalSpeed: 0.2,
      },
      { // Bottom-Left
        xFactor: 0.2, yFactor: 0.8,
        widthFactor: 0.1, heightFactor: 0.15,
        segments: 15, angle: 0, rotationSpeed: 0.003,
        colors: ['#009933', '#33cc66', '#006622', '#66ff99'],
        verticalSpeed: 0.2,
      },
      { // Bottom-Right
        xFactor: 0.8, yFactor: 0.8,
        widthFactor: 0.1, heightFactor: 0.15,
        segments: 15, angle: 0, rotationSpeed: 0.003,
        colors: ['#ff9933', '#cc6600', '#ffcc99', '#994c00'],
        verticalSpeed: 0.2,
      },
      { // Center (Medium-Big)
        xFactor: 0.5, yFactor: 0.5,
        widthFactor: 0.25, heightFactor: 0.3,
        segments: 30, angle: 0, rotationSpeed: 0.005,
        colors: ['#800080', '#9932CC', '#8A2BE2', '#BA55D3'],
        verticalSpeed: 0.25,
      }
    ];

    // Main animation loop.
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      dnaSamples.forEach(sample => {
        // Compute absolute positions.
        const xCenter = width * sample.xFactor;
        const yCenter = height * sample.yFactor;
        const sampleWidth = width * sample.widthFactor;
        const sampleHeight = height * sample.heightFactor;
        sample.angle += sample.rotationSpeed;
        const verticalOffset = sample.angle * sample.verticalSpeed;

        for (let i = 0; i < sample.segments; i++) {
          const fraction = i / sample.segments;
          const verticalPos = ((fraction + verticalOffset) % 1) * sampleHeight;
          const segmentY = verticalPos + (yCenter - sampleHeight / 2);

          // Calculate positions for two strands.
          const baseAngle = sample.angle + i * 0.2;
          const waveX0 = Math.sin(baseAngle) * (sampleWidth / 2);
          const waveX1 = Math.sin(baseAngle + Math.PI) * (sampleWidth / 2);
          const x0 = xCenter + waveX0;
          const x1 = xCenter + waveX1;

          // Draw a solid connecting line (without any gradient).
          ctx.beginPath();
          ctx.moveTo(x0, segmentY);
          ctx.lineTo(x1, segmentY);
          ctx.strokeStyle = sample.colors[0];
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw node on strand 0.
          ctx.beginPath();
          const nodeRadius0 = 3 + Math.sin(sample.angle * 3 + i) * 0.8;
          ctx.arc(x0, segmentY, nodeRadius0, 0, Math.PI * 2);
          const grad0 = ctx.createRadialGradient(x0, segmentY, 0, x0, segmentY, 6);
          grad0.addColorStop(0, sample.colors[0]);
          grad0.addColorStop(0.7, sample.colors[1]);
          grad0.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad0;
          ctx.fill();

          // Draw node on strand 1.
          ctx.beginPath();
          const nodeRadius1 = 3 + Math.sin(sample.angle * 3 + i) * 0.8;
          ctx.arc(x1, segmentY, nodeRadius1, 0, Math.PI * 2);
          const grad1 = ctx.createRadialGradient(x1, segmentY, 0, x1, segmentY, 6);
          grad1.addColorStop(0, sample.colors[2]);
          grad1.addColorStop(0.7, sample.colors[3]);
          grad1.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad1;
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (document.body.contains(particlesScript)) {
        document.body.removeChild(particlesScript);
      }
      if (canvasRef.current && canvasRef.current.parentNode) {
        canvasRef.current.parentNode.removeChild(canvasRef.current);
      }
    };
  }, []);

  return (
    <div
      id="background-container"
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none bg-gray-900"
    >
      <div id="particles-js" className="absolute inset-0 z-0" />
    </div>
  );
};

export default AdvancedMultiDNABackground;
