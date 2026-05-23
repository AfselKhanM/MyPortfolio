import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-title">
            <span className="highlight">Afsel Khan</span>
          </h1>
          <h2 className="hero-subtitle">Software Engineering Student</h2>
          <p className="hero-description">
            Passionate about building scalable applications, exploring AI/ML, and solving complex problems with elegant code.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" className="btn btn-secondary" download>
              Resume <Download size={18} />
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:contact@example.com" aria-label="Email">
              <Mail size={24} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="hero-shape shape-1"></div>
          <div className="hero-shape shape-2"></div>
          <div className="hero-image-container glass">
            {/* Placeholder for actual image */}
            <div className="hero-image-placeholder">
              &lt;/&gt;
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
