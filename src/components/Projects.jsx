import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'SkillPointAverage',
      description: 'A web-based platform that enables users to manage and evaluate their technical skills in a structured manner.',
      image: '/api/placeholder/600/400',
      tags: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
      github: '#',
      demo: '#'
    },
    {
      title: 'IoT Weather Station',
      description: 'Real-time weather monitoring system using ESP32, DHT11 sensors, and a web dashboard for data visualization.',
      image: '/api/placeholder/600/400',
      tags: ['C++', 'React', 'Express', 'WebSockets'],
      github: '#',
      demo: '#'
    },
    {
      title: 'E-Commerce Microservices',
      description: 'A scalable e-commerce backend built with a microservices architecture, featuring Docker containerization.',
      image: '/api/placeholder/600/400',
      tags: ['Java', 'Spring Boot', 'Docker', 'PostgreSQL'],
      github: '#',
      demo: '#'
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          Here are some of the engineering projects I've worked on recently.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card glass"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub Repository">
                    <FaGithub size={20} /> Code
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
