import React, { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const Background = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  // Use a ref to store the current theme so the animation loop can read it 
  // without needing to restart/reinitialize the canvas when the theme toggles.
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Realistic star colors for both modes
    const darkStarColors = ['#ffffff', '#f8fafc', '#e2e8f0', '#bae6fd', '#fed7aa']; 
    const lightStarColors = ['#0f172a', '#1e293b', '#334155', '#3b82f6', '#8b5cf6'];
    
    // Mouse tracking for subtle 3D parallax
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
    };

    const handleMouseMove = (event) => {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- CLASSES ---

    class Star {
      constructor(canvasWidth, canvasHeight) {
        this.reset(canvasWidth, canvasHeight);
      }
      reset(canvasWidth, canvasHeight) {
        // Spread stars widely to handle parallax overscan
        this.x = Math.random() * canvasWidth * 1.2 - (canvasWidth * 0.1);
        this.y = Math.random() * canvasHeight * 1.2 - (canvasHeight * 0.1);
        this.size = Math.random() * 1.2 + 0.1; 
        this.depth = Math.random() * 0.5 + 0.05;
        
        // Store both colors so it can instantly switch when theme changes
        this.darkColor = darkStarColors[Math.floor(Math.random() * darkStarColors.length)];
        this.lightColor = lightStarColors[Math.floor(Math.random() * lightStarColors.length)];
        
        this.twinkleSpeed = Math.random() * 0.01 + 0.002;
        this.opacity = Math.random();
        this.baseOpacity = Math.random() * 0.5 + 0.1;
      }
      draw(offsetX, offsetY, isDark) {
        ctx.beginPath();
        const x = this.x + (offsetX * this.depth * 0.15); // Increased for more responsiveness
        const y = this.y + (offsetY * this.depth * 0.15);
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        
        ctx.fillStyle = isDark ? this.darkColor : this.lightColor;
        
        // Slow realistic twinkling
        this.opacity += this.twinkleSpeed;
        if (this.opacity > 1 || this.opacity < this.baseOpacity) {
          this.twinkleSpeed = -this.twinkleSpeed;
        }
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    // A single massive, cinematic planet in the background
    class CinematicPlanet {
      constructor(canvasWidth, canvasHeight) {
        // Massive size to look realistic (like we are in low orbit)
        this.radius = Math.max(canvasWidth, canvasHeight) * 0.7;
        // Positioned far off-screen in the bottom right corner to avoid Hero content
        this.baseX = canvasWidth * 1.05;
        this.baseY = canvasHeight * 1.45;
        this.depth = 0.08; // Far away background object parallax
      }

      draw(offsetX, offsetY, isDark) {
        const x = this.baseX + (offsetX * this.depth * 0.05);
        const y = this.baseY + (offsetY * this.depth * 0.05);

        ctx.save();
        ctx.translate(x, y);

        // 1. Planet Body
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        
        // Light source coming from top-left relative to the planet
        const gradient = ctx.createRadialGradient(
          -this.radius * 0.4, -this.radius * 0.4, this.radius * 0.1,
          0, 0, this.radius
        );
        
        if (isDark) {
          // Dark Mode: Deep ocean/atmosphere fading instantly into absolute pitch black space
          gradient.addColorStop(0, '#0f172a'); // Subdued highlight
          gradient.addColorStop(0.3, '#020617'); // Twilight zone
          gradient.addColorStop(0.5, '#000000'); // Pitch black shadow
          gradient.addColorStop(1, '#000000'); 
        } else {
          // Light Mode: Darker True Blue planet
          gradient.addColorStop(0, '#4883e1ff'); // Solid medium-dark blue highlight
          gradient.addColorStop(0.4, '#667fc4ff'); // Dark blue surface
          gradient.addColorStop(0.8, '#324b90ff'); // Deep blue shadow
          gradient.addColorStop(1, '#192d6fff'); // Extremely dark blue edge
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // 2. Atmospheric Rim Lighting
        ctx.beginPath();
        ctx.arc(0, 0, this.radius + 20, 0, Math.PI * 2);
        const atmos = ctx.createRadialGradient(
          0, 0, this.radius - 10, 
          0, 0, this.radius + 20
        );
        
        atmos.addColorStop(0, 'rgba(0,0,0,0)');
        if (isDark) {
          atmos.addColorStop(0.85, 'rgba(56, 189, 248, 0.6)'); // Bright blue glow for dark mode
        } else {
          atmos.addColorStop(0.85, 'rgba(29, 78, 216, 0.4)'); // Dark blue atmospheric glow for light mode
        }
        atmos.addColorStop(1, 'rgba(0,0,0,0)');
        
        // Clip the atmosphere to simulate sunlight hitting only the upper edge
        ctx.save();
        ctx.beginPath();
        ctx.arc(-this.radius * 0.1, -this.radius * 0.1, this.radius + 25, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = atmos;
        ctx.fill();
        ctx.restore();

        ctx.restore();
      }
    }

    // --- INITIALIZATION ---

    let stars = [];
    let massivePlanet = null;

    function init() {
      stars = [];
      const numStars = window.innerWidth < 768 ? 400 : 1200; // Tons of stars for absolute realism
      for (let i = 0; i < numStars; i++) stars.push(new Star(canvas.width, canvas.height));
      
      massivePlanet = new CinematicPlanet(canvas.width, canvas.height);
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // --- ANIMATION LOOP ---

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const isDark = themeRef.current === 'dark';
      
      // Clear completely to allow the CSS body background color to show through!
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Faster easing for more responsive feel
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      
      const offsetX = mouse.x - (canvas.width / 2);
      const offsetY = mouse.y - (canvas.height / 2);

      // Distant milky-way dust band
      const mwGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      mwGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      if (isDark) {
        mwGradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.06)'); // Extremely faint galactic blue band
      } else {
        mwGradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.03)'); // Barely visible in light mode
      }
      mwGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mwGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars (Background)
      for (let s of stars) {
        s.draw(offsetX, offsetY, isDark);
      }
      
      // Draw massive cinematic planet (Foreground)
      if (massivePlanet) {
        massivePlanet.draw(offsetX, offsetY, isDark);
      }
    }

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Background;
