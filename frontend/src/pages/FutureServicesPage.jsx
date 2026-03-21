import { Link } from 'react-router-dom';

const roadmap = [
  {
    phase: 'Phase 1',
    status: 'completed',
    title: 'Core Platform',
    items: [
      'User authentication (JWT)',
      'Job search & scraping',
      'AI job matching with Gemini',
      'Resume optimization',
      'Interview question generation',
      'Application tracking dashboard',
    ],
  },
  {
    phase: 'Phase 2',
    status: 'in-progress',
    title: 'Enhanced AI Features',
    items: [
      'Cover letter generation',
      'Multi-resume management',
      'Salary estimation by role',
      'Company research assistant',
      'Email template generator',
    ],
  },
  {
    phase: 'Phase 3',
    status: 'planned',
    title: 'Advanced Analytics',
    items: [
      'Application success rate tracking',
      'Market trend analysis',
      'Skill demand forecasting',
      'Personalized learning paths',
      'Weekly job search reports',
    ],
  },
  {
    phase: 'Phase 4',
    status: 'planned',
    title: 'Ecosystem Integration',
    items: [
      'LinkedIn profile sync',
      'Calendar integration for interviews',
      'Browser extension for 1-click apply',
      'Mobile app (React Native)',
      'API access for developers',
    ],
  },
];

const statusStyles = {
  completed: { label: 'Completed', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  'in-progress': { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  planned: { label: 'Planned', color: '#6c63ff', bg: 'rgba(108,99,255,0.12)' },
};

export default function FutureServicesPage() {
  return (
    <div className="landing-page">
      <section className="page-hero">
        <span className="hero-badge">Product Roadmap</span>
        <h1 className="hero-title">
          What's Coming<br />
          <span className="gradient-text">Next</span>
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: 660, margin: '0 auto' }}>
          We're constantly improving Job Search AI. Here's a look at what's been built
          and what's on the horizon.
        </p>
      </section>

      <section className="landing-section">
        <div className="roadmap-timeline">
          {roadmap.map((r) => {
            const st = statusStyles[r.status];
            return (
              <div key={r.phase} className="roadmap-item">
                <div className="roadmap-marker">
                  <div
                    className="roadmap-dot"
                    style={{ background: st.color, boxShadow: `0 0 12px ${st.color}55` }}
                  />
                  <div className="roadmap-line" />
                </div>
                <div className="roadmap-card">
                  <div className="roadmap-header">
                    <span className="roadmap-phase">{r.phase}</span>
                    <span
                      className="roadmap-status"
                      style={{ color: st.color, background: st.bg }}
                    >
                      {st.label}
                    </span>
                  </div>
                  <h3>{r.title}</h3>
                  <ul className="roadmap-list">
                    {r.items.map((item) => (
                      <li key={item}>
                        <span className="roadmap-check" style={{ color: st.color }}>
                          {r.status === 'completed' ? '✓' : '○'}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="landing-section">
        <h2 className="section-title">
          Have a <span className="gradient-text">Feature Idea?</span>
        </h2>
        <p className="section-subtitle">
          This is an actively developed project. Feedback and ideas are always welcome —
          try the platform and share your thoughts!
        </p>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Try What's Already Built</h2>
          <p>The core platform is live and ready. Create an account to explore all current features.</p>
          <Link to="/register" className="btn-landing btn-landing-primary btn-landing-lg">
            Get Started Free
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
