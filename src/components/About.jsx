import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Terminal, Cpu } from 'lucide-react';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Frontend', icon: <Layout size={24} />, items: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind'] },
    { name: 'Backend', icon: <Server size={24} />, items: ['Node.js', 'Express', 'Python', 'Java'] },
    { name: 'Database', icon: <Database size={24} />, items: ['MongoDB', 'MySQL'] },
    { name: 'Tools', icon: <Terminal size={24} />, items: ['Git','Linux', 'Burpsuite', 'Wireshark'] },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          I'm a dedicated engineering student with a strong foundation in software development and problem-solving.
        </p>

        <div className="about-grid">
          <motion.div 
            className="about-text solid-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3>My Journey</h3>
            <p>
              My interest in software engineering started when I built my first simple web page. Since then, I've been fascinated by how technology can solve real-world problems.
            </p>
            <p>
              Currently pursuing my Bachelor's degree in Computer Science & Engineering. I'm always eager to learn new technologies and apply them to build efficient, scalable, and user-friendly applications.
            </p>
            <div className="education-timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>B.E. in Computer Science and Engineering (Cyber Security)</h4>
                  <span className="timeline-date">2023 - Present</span>
                  <p>Velammal Engineering College, GPA: 8.46/10.0</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="skills-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {skills.map((skillGroup, index) => (
              <div key={index} className="skill-card solid-card">
                <div className="skill-header">
                  <span className="skill-icon">{skillGroup.icon}</span>
                  <h3>{skillGroup.name}</h3>
                </div>
                <div className="skill-tags">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
