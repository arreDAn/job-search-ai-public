import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/resume', label: 'Resume' },
    { to: '/interview', label: 'Interview' },
    { to: '/applications', label: 'Applications' },
  ];

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">Job Search AI</Link>
      <div className="navbar-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link${location.pathname === l.to ? ' active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="navbar-user">
        <span className="user-email">{user.email}</span>
        <button onClick={handleLogout} className="btn btn-sm">Logout</button>
      </div>
    </nav>
  );
}
