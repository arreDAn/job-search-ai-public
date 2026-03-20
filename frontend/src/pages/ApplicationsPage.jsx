import { useState, useEffect } from 'react';
import { api } from '../api/client';

const STATUSES = ['applied', 'phone_screen', 'interview', 'offer', 'rejected', 'accepted', 'withdrawn'];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async (status) => {
    setLoading(true);
    setError('');
    try {
      const data = await api.listApplications(status || undefined);
      setApplications(data.applications || []);
    } catch (err) {
      setError(err.error || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(filter); }, [filter]);

  const startEdit = (app) => {
    setEditingId(app.id);
    setEditStatus(app.status);
    setEditNotes(app.notes || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditStatus('');
    setEditNotes('');
  };

  const saveEdit = async (appId) => {
    setSaving(true);
    try {
      const updated = await api.updateApplication(appId, { status: editStatus, notes: editNotes });
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? updated.application : a))
      );
      cancelEdit();
    } catch (err) {
      setError(err.error || 'Failed to update application');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <h1>Applications</h1>

      <div className="filter-bar">
        <label>Filter by status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading applications...</div>
      ) : applications.length === 0 ? (
        <p className="empty-state">
          No applications found. Search for jobs and apply to get started!
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Status</th>
                <th>Match</th>
                <th>Applied</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>
                    {app.job?.url ? (
                      <a href={app.job.url} target="_blank" rel="noopener noreferrer">
                        {app.job.title}
                      </a>
                    ) : (
                      app.job?.title || '—'
                    )}
                  </td>
                  <td>{app.job?.company || '—'}</td>
                  <td>
                    {editingId === app.id ? (
                      <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`badge badge-${app.status}`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    )}
                  </td>
                  <td>{app.match_score != null ? `${app.match_score}%` : '—'}</td>
                  <td>{app.applied_date ? new Date(app.applied_date).toLocaleDateString() : '—'}</td>
                  <td>
                    {editingId === app.id ? (
                      <input
                        type="text"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add notes..."
                        className="inline-input"
                      />
                    ) : (
                      app.notes || '—'
                    )}
                  </td>
                  <td>
                    {editingId === app.id ? (
                      <div className="action-btns">
                        <button className="btn btn-sm btn-primary" onClick={() => saveEdit(app.id)} disabled={saving}>
                          {saving ? '...' : 'Save'}
                        </button>
                        <button className="btn btn-sm" onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <button className="btn btn-sm btn-secondary" onClick={() => startEdit(app)}>
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
