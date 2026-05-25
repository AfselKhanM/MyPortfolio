import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { Sun, Moon, Menu, X, Code2 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove the hash from the URL cleanly
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="navbar-container container">
        <a href="/" className="logo" onClick={handleHomeClick}>
          <Code2 size={28} className="logo-icon" />
          <span>MyPortfolio</span>
        </a>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href === '#home' ? '/' : link.href} 
                  onClick={link.href === '#home' ? handleHomeClick : () => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
