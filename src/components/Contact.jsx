import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import './Contact.css';

const Contact = () => {
  // Obfuscate email to prevent basic web scrapers from harvesting it
  const eUser = "afselkhanofficial";
  const eDomain = "gmail.com";
  const emailAddress = `${eUser}@${eDomain}`;
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = React.useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert("Please complete the Captcha to verify you are human.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e57d121b-4b89-49c4-842d-7ff50b588b92",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          "h-captcha-response": captchaToken
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert("Success! Your message has been sent directly to my email.");
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
        if (captchaRef.current) {
          captchaRef.current.resetCaptcha();
        }
      } else {
        alert("Oops! Something went wrong: " + result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Oops! There was a network error sending your message.");
    } finally {
      setIsSubmitting(false);
    }
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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            style={{ height: '100%' }}
          >
            <div className="contact-info glass" style={{ height: '100%' }}>
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
                  <a href={composeUrl} target="_blank" rel="noopener noreferrer">
                    afselkhan@gmail.com
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaLinkedin size={20} />
                </div>
                <div>
                  <h4>LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/afselkhanm" target="_blank" rel="me noopener noreferrer">linkedin.com/in/afselkhanm</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaGithub size={20} />
                </div>
                <div>
                  <h4>GitHub</h4>
                  <a href="https://github.com/AfselKhanM" target="_blank" rel="noopener noreferrer">github.com/afselkhanm</a>
                </div>
              </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ height: '100%' }}
          >
            <div className="contact-form-container glass" style={{ height: '100%' }}>
            <form 
              className="contact-form" 
              onSubmit={handleSubmit}
            >
              
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
                  maxLength={500}
                ></textarea>
                <small style={{ alignSelf: 'flex-end', color: 'var(--secondary-color)', fontSize: '0.8rem' }}>
                  {formData.message.length}/500 characters
                </small>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  ref={captchaRef}
                  theme="dark"
                />
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send size={18} />}
              </button>
            </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
