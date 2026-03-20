import { useState, useEffect } from 'react';
import { api } from '../api/client';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getDashboard()
      .then(setData)
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
