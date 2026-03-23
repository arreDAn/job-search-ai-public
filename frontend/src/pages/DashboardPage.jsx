import { useState, useEffect } from 'react';
import { api } from '../api/client';

const ACTION_LABELS = {
  resume_optimize: 'Resume Optimizations',
  interview_generate: 'Interview Sessions',
  interview_evaluate: 'Answer Evaluations',
};

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api.getDashboard(), api.getUsage()])
      .then(([dashData, usageData]) => { setData(dashData); setUsage(usageData); })
      .catch((err) => setError(err.error || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!data) return null;

  const { applications, interviews, resumes } = data;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {usage && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h2 style={{ margin: 0 }}>Today's Usage</h2>
            <span className="badge" style={{ background: 'var(--accent)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', textTransform: 'capitalize' }}>
              {usage.tier} tier
            </span>
          </div>
          <div className="stats-grid">
            {Object.entries(usage.usage).map(([action, info]) => {
              const pct = info.limit === -1 ? 0 : Math.round((info.used / info.limit) * 100);
              const isAtLimit = info.limit !== -1 && info.remaining === 0;
              return (
                <div key={action} className="stat-card" style={{ position: 'relative' }}>
                  <div className="stat-number" style={{ color: isAtLimit ? 'var(--danger, #e74c3c)' : undefined }}>
                    {info.limit === -1 ? '∞' : `${info.remaining}/${info.limit}`}
                  </div>
                  <div className="stat-label">{ACTION_LABELS[action] || action}</div>
                  {info.limit !== -1 && (
                    <div style={{ width: '100%', background: '#e0e0e0', borderRadius: 4, height: 6, marginTop: 8 }}>
                      <div style={{ width: `${Math.min(pct, 100)}%`, background: isAtLimit ? 'var(--danger, #e74c3c)' : 'var(--accent, #6c63ff)', borderRadius: 4, height: 6, transition: 'width 0.3s' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
            Resets at midnight UTC
            {usage.tier === 'free' && ' · Upgrade to Pro for higher limits'}
          </p>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{applications.total}</div>
          <div className="stat-label">Applications</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{applications.avg_match_score ?? '—'}</div>
          <div className="stat-label">Avg Match Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{interviews.total}</div>
          <div className="stat-label">Interview Qs</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{interviews.avg_score ?? '—'}</div>
          <div className="stat-label">Avg Interview Score</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{resumes.total}</div>
          <div className="stat-label">Resumes Optimized</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{resumes.avg_score ?? '—'}</div>
          <div className="stat-label">Avg Resume Score</div>
        </div>
      </div>

      {Object.keys(applications.by_status).length > 0 && (
        <div className="card">
          <h2>Applications by Status</h2>
          <div className="status-bars">
            {Object.entries(applications.by_status).map(([status, count]) => (
              <div key={status} className="status-bar-row">
                <span className={`badge badge-${status}`}>{status.replace('_', ' ')}</span>
                <div className="status-bar">
                  <div
                    className="status-bar-fill"
                    style={{ width: `${(count / applications.total) * 100}%` }}
                  />
                </div>
                <span className="status-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {applications.recent.length > 0 && (
        <div className="card">
          <h2>Recent Applications</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Match</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.recent.map((app) => (
                  <tr key={app.id}>
                    <td>{app.job?.title || '—'}</td>
                    <td>{app.job?.company || '—'}</td>
                    <td><span className={`badge badge-${app.status}`}>{app.status.replace('_', ' ')}</span></td>
                    <td>{app.match_score != null ? `${app.match_score}%` : '—'}</td>
                    <td>{app.applied_date ? new Date(app.applied_date).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
