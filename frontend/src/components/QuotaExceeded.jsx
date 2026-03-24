import { Link } from 'react-router-dom';

export default function QuotaExceeded({ action, tier, remaining, limit, resetsAt }) {
  const actionLabels = {
    resume_optimize: 'Resume Optimizations',
    interview_generate: 'Interview Sessions',
    interview_evaluate: 'Answer Evaluations',
  };

  return (
    <div className="alert alert-error" style={{ marginTop: '1rem', padding: '1rem' }}>
      <div style={{ marginBottom: '0.75rem', fontWeight: 600 }}>
        ⚠️ Daily Limit Reached
      </div>
      <p style={{ marginBottom: '0.75rem' }}>
        You've used all {limit} {actionLabels[action] || action} for today.
      </p>
      <p style={{ fontSize: '0.85rem', color: 'inherit', opacity: 0.9, marginBottom: '1rem' }}>
        Resets at <strong>{new Date(resetsAt).toLocaleTimeString()}</strong> UTC
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Link to="/pricing" className="btn btn-primary btn-sm">
          Upgrade for Unlimited
        </Link>
        <a 
          href="/pricing" 
          className="btn btn-secondary btn-sm"
        >
          View Plans
        </a>
      </div>
    </div>
  );
}
