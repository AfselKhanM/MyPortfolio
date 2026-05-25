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
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/AfselKhanM/SkillPointAverage',
      demo: 'https://skill-point-average.vercel.app/'
    },
    {
      title: 'IntruderX',
      description: 'An IoT-based home intrusion detection system designed to detect unauthorized human motion using a PIR sensor and NodeMCU.',
      image: '/api/placeholder/600/400',
      tags: ['Arduino', 'NodeMCU', 'PIR sensor', 'Telegram bot'],
      github: 'https://github.com/AfselKhanM/IntruderX',

    },
    {
      title: 'CarRace-AI',
      description: 'A real-time, 2D autonomous car racing simulation built entirely with native web technologies.',
      image: '/api/placeholder/600/400',
      tags: ['HTML5', 'JavaScript', 'Canvas', 'CSS'],
      github: 'https://github.com/AfselKhanM/CarRace-AI',
      demo: 'https://afselkhanm.github.io/CarRace-AI/'
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{ height: '100%' }}
            >
              <div className="project-card glass" style={{ height: '100%' }}>
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
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo">
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  )}
                </div>
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
