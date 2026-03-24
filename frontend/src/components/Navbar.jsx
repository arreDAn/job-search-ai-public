import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './AuthContext';

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/future', label: 'Future Services' },
  { to: '/pricing', label: 'Pricing' },
];

const appLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/resume', label: 'Resume' },
  { to: '/interview', label: 'Interview' },
  { to: '/applications', label: 'Applications' },
  { to: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = user ? appLinks : publicLinks;

  return (
    <nav className="landing-nav">
      <div className="landing-nav-inner">
        <Link to="/" className="landing-logo" onClick={() => setMenuOpen(false)}>
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
          {links.map((l) => (
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
          {user ? (
            <>
              <span className="nav-user-email">{user.email}</span>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="btn-landing btn-landing-ghost">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-landing btn-landing-ghost" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" className="btn-landing btn-landing-primary btn-landing-sm" onClick={() => setMenuOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
