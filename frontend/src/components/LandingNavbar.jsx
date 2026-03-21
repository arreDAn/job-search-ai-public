import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/future', label: 'Future Services' },
];

export default function LandingNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="landing-logo">
          <span className="logo-icon">⚡</span> Job Search AI
        </Link>
        <button
          className={`mobile-menu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
        <div className={`landing-nav-links ${menuOpen ? 'show' : ''}`}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`landing-nav-link${location.pathname === l.to ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className={`landing-nav-actions ${menuOpen ? 'show' : ''}`}>
          <Link to="/login" className="btn-landing btn-landing-ghost" onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
          <Link to="/register" className="btn-landing btn-landing-primary btn-landing-sm" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
