import { Link } from 'react-router-dom';

const features = [
  {
    icon: '🔍',
    title: 'Smart Job Matching',
    desc: 'AI analyzes your resume against job listings and provides a detailed match score with skill gap analysis.',
  },
  {
    icon: '📄',
    title: 'Resume Optimization',
    desc: 'Get AI-powered suggestions to tailor your resume for specific roles, boosting your chances of landing interviews.',
  },
  {
    icon: '🎤',
    title: 'Interview Prep',
    desc: 'Practice with AI-generated interview questions tailored to the job, with real-time feedback on your answers.',
  },
  {
    icon: '📊',
    title: 'Application Tracker',
    desc: 'Track every application in one dashboard — statuses, scores, and progress all in a single view.',
  },
];

const stats = [
  { value: '95%', label: 'Match Accuracy' },
  { value: '3x', label: 'More Interviews' },
  { value: '60%', label: 'Time Saved' },
  { value: '24/7', label: 'AI Availability' },
];

export default function HomePage() {
  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">AI-Powered Job Search Platform</span>
          <h1 className="hero-title">
            Land Your Dream Job<br />
            <span className="gradient-text">With AI On Your Side</span>
          </h1>
          <p className="hero-subtitle">
            Stop sending generic applications. Our AI matches you to the right roles,
            optimizes your resume, and prepares you for interviews — all in one platform.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn-landing btn-landing-primary">
              Get Started Free
            </Link>
            <Link to="/services" className="btn-landing btn-landing-outline">
              See Features
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-float-card card-1">
              <div className="float-icon">📊</div>
              <div>
                <div className="float-title">Match Score</div>
                <div className="float-value gradient-text">92%</div>
              </div>
            </div>
            <div className="hero-float-card card-2">
              <div className="float-icon">✅</div>
              <div>
                <div className="float-title">Resume Optimized</div>
                <div className="float-value" style={{ color: '#22c55e' }}>+35 pts</div>
              </div>
            </div>
            <div className="hero-float-card card-3">
              <div className="float-icon">🎯</div>
              <div>
                <div className="float-title">Interview Ready</div>
                <div className="float-value" style={{ color: '#f59e0b' }}>8/10</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="landing-stats">
        {stats.map((s) => (
          <div key={s.label} className="landing-stat">
            <div className="landing-stat-value">{s.value}</div>
            <div className="landing-stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="landing-section" id="features">
        <h2 className="section-title">
          Everything You Need to <span className="gradient-text">Get Hired</span>
        </h2>
        <p className="section-subtitle">
          From finding the right jobs to acing the interview, our platform covers every step of your job search.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section">
        <h2 className="section-title">
          How It <span className="gradient-text">Works</span>
        </h2>
        <div className="steps-row">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Upload Resume</h3>
            <p>Upload your existing resume or paste its content to get started.</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Find &amp; Match Jobs</h3>
            <p>Search for jobs and get AI-powered match scores with skill analysis.</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Optimize &amp; Apply</h3>
            <p>Tailor your resume for each role, practice interviews, and apply with confidence.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Job Search?</h2>
          <p>Join now and let AI handle the heavy lifting while you focus on what matters.</p>
          <Link to="/register" className="btn-landing btn-landing-primary btn-landing-lg">
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Job Search AI</span>
            <p>AI-powered tools to land your dream job.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <Link to="/services">Features</Link>
              <Link to="/future">Roadmap</Link>
              <Link to="/about">About</Link>
            </div>
            <div className="footer-col">
              <h4>Get Started</h4>
              <Link to="/login">Sign In</Link>
              <Link to="/register">Create Account</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Job Search AI. Built with React, Flask &amp; AI.
        </div>
      </footer>
    </div>
  );
}
