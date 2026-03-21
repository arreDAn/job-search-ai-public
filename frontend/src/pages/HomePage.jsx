import { Link } from 'react-router-dom';
import WireframeMesh from '../components/WireframeMesh';

export default function HomePage() {
  return (
    <div className="landing-page home-simple">
      {/* Hero */}
      <section className="home-hero">
        <h1 className="home-title">
          Your Personalized Job<br />Search Assistant
        </h1>
        <p className="home-brand">Job Search AI</p>
        <p className="home-desc">
          Our AI-powered platform matches you with the right jobs, optimizes your
          resume for every application, and preps you for interviews — all in one place.
        </p>
        <div className="home-actions">
          <Link to="/register" className="btn-landing btn-landing-primary">
            Get Started
          </Link>
          <Link to="/services" className="btn-landing btn-landing-info">
            Learn More
          </Link>
        </div>
      </section>

      {/* Animated wireframe */}
      <div className="mesh-section">
        <WireframeMesh />
      </div>

      <footer className="landing-footer">
        <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: 0 }}>
          &copy; {new Date().getFullYear()} Job Search AI. Built with React, Flask &amp; AI.
        </div>
      </footer>
    </div>
  );
}
