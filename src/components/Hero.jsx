import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import heroImage from '../assets/profile.jpeg';
import resumePdf from '../assets/resume.pdf';
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
            <a href={resumePdf} className="btn btn-secondary" target="_blank" rel="noopener noreferrer" download="Afsel_Khan_Resume.pdf">
              Resume <Download size={18} />
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
            <img src={heroImage} alt="Afsel Khan" className="hero-image" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
