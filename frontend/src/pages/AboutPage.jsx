import { Link } from 'react-router-dom';

const team = [
  {
    emoji: '👨‍💻',
    name: 'Full-Stack Development',
    detail: 'React frontend with a Python Flask REST API backend, deployed on Vercel and Google Cloud Run.',
  },
  {
    emoji: '🤖',
    name: 'AI & Machine Learning',
    detail: 'Powered by Google Gemini for resume analysis, job matching, and interview question generation.',
  },
  {
    emoji: '☁️',
    name: 'Cloud Infrastructure',
    detail: 'PostgreSQL on Supabase, containerized with Docker, CI/CD via Cloud Build, served globally.',
  },
];

const techStack = [
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  { name: 'React Router', category: 'Frontend' },
  { name: 'Flask', category: 'Backend' },
  { name: 'SQLAlchemy', category: 'Backend' },
  { name: 'Google Gemini', category: 'AI' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Google Cloud Run', category: 'DevOps' },
  { name: 'Vercel', category: 'DevOps' },
];

export default function AboutPage() {
  return (
    <div className="landing-page">
      <section className="page-hero">
        <span className="hero-badge">About The Project</span>
        <h1 className="hero-title">
          Built to Showcase<br />
          <span className="gradient-text">Modern AI Engineering</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: 660, margin: '0 auto' }}>
          Job Search AI is a full-stack portfolio project demonstrating how modern web technologies
          and AI can be combined to solve real-world problems in the job search process.
        </p>
      </section>

      <section className="landing-section">
        <h2 className="section-title">
          Core <span className="gradient-text">Competencies</span>
        </h2>
        <div className="features-grid" style={{ maxWidth: 900, margin: '0 auto' }}>
          {team.map((t) => (
            <div key={t.name} className="feature-card">
              <div className="feature-icon">{t.emoji}</div>
              <h3>{t.name}</h3>
              <p>{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="section-title">
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <p className="section-subtitle">
          A production-grade stack chosen for scalability, developer experience, and real-world relevance.
        </p>
        <div className="tech-grid">
          {techStack.map((t) => (
            <div key={t.name} className="tech-tag">
              <span className="tech-name">{t.name}</span>
              <span className="tech-cat">{t.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="section-title">
          Architecture <span className="gradient-text">Overview</span>
        </h2>
        <div className="arch-diagram">
          <div className="arch-box arch-frontend">
            <h4>Frontend</h4>
            <p>React + Vite on Vercel</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-box arch-backend">
            <h4>Backend API</h4>
            <p>Flask on Cloud Run</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-box arch-ai">
            <h4>AI Engine</h4>
            <p>Google Gemini</p>
          </div>
          <div className="arch-arrow-down">↓</div>
          <div className="arch-box arch-db">
            <h4>Database</h4>
            <p>PostgreSQL on Supabase</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Want to See It In Action?</h2>
          <p>Create an account and explore the full platform — matching, optimization, and interview prep.</p>
          <Link to="/register" className="btn-landing btn-landing-primary btn-landing-lg">
            Try It Now
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Job Search AI. Built with React, Flask &amp; AI.
        </div>
      </footer>
    </div>
  );
}
