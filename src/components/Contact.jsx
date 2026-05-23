import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    alert('Thank you for your message. I will get back to you soon!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Interested in working together or have a question? Feel free to reach out.
        </p>

        <div className="contact-grid">
          <motion.div 
            className="contact-info glass"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's Connect</h3>
            <p className="contact-description">
              I'm currently looking for internship opportunities and exciting projects to collaborate on.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:contact@example.com">contact@example.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <h4>LinkedIn</h4>
                  <a href="www.linkedin.com/in/afselkhanm" target="_blank" rel="me noopener noreferrer">linkedin.com/in/afselkhanm</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaGithub size={20} />
                </div>
                <div>
                  <h4>GitHub</h4>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com/username</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form-container glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
