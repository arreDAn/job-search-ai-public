import { useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../components/AuthContext';

export default function JobsPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [matchResults, setMatchResults] = useState({});
  const [matchingId, setMatchingId] = useState(null);
  const [savingId, setSavingId] = useState(null);
  const [applyingId, setApplyingId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setError('');
    setLoading(true);
    setMatchResults({});
    try {
      const data = await api.scrapeJobs(query, location || undefined);
      setJobs(data.jobs || []);
      if (data.jobs?.length === 0) setError('No jobs found. Try a different search.');
    } catch (err) {
      setError(err.error || 'Failed to search jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async (job, idx) => {
    if (!user?.resume_text) {
      setError('Add your resume in your profile first to calculate match scores.');
      return;
    }
    setMatchingId(idx);
    try {
      const result = await api.matchJob(user.resume_text, job.description || '');
      setMatchResults((prev) => ({ ...prev, [idx]: result }));
    } catch (err) {
      setError(err.error || 'Failed to calculate match');
    } finally {
      setMatchingId(null);
    }
  };

  const handleSaveAndApply = async (job, idx) => {
    setSavingId(idx);
    try {
      const saved = await api.saveJob(job);
      const jobId = saved.job?.id;
      setApplyingId(idx);
      const match = matchResults[idx];
      await api.createApplication(jobId, match?.score, null);
      setJobs((prev) => prev.map((j, i) => (i === idx ? { ...j, _applied: true } : j)));
    } catch (err) {
      setError(err.error || 'Failed to save/apply');
    } finally {
      setSavingId(null);
      setApplyingId(null);
    }
  };

  return (
    <div className="page">
      <h1>Job Search &amp; Matching</h1>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, skills, or keywords"
            className="search-input"
            required
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (optional)"
            className="search-input"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="job-list">
        {jobs.map((job, idx) => {
          const match = matchResults[idx];
          return (
            <div key={idx} className="job-card">
              <div className="job-card-header">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-company">{job.company}{job.location ? ` • ${job.location}` : ''}</p>
                </div>
                {match && (
                  <div className={`match-badge ${match.score >= 70 ? 'match-high' : match.score >= 40 ? 'match-mid' : 'match-low'}`}>
                    {match.score}% match
                  </div>
                )}
              </div>

              {job.description && (
                <p className="job-description">{job.description.slice(0, 300)}{job.description.length > 300 ? '...' : ''}</p>
              )}

              {match && (
                <div className="match-details">
                  {match.matched_skills?.length > 0 && (
                    <div className="skills-row">
                      <span className="skills-label">Matched:</span>
                      {match.matched_skills.map((s) => (
                        <span key={s} className="skill-tag skill-matched">{s}</span>
                      ))}
                    </div>
                  )}
                  {match.missing_skills?.length > 0 && (
                    <div className="skills-row">
                      <span className="skills-label">Missing:</span>
                      {match.missing_skills.map((s) => (
                        <span key={s} className="skill-tag skill-missing">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="job-card-actions">
                {job.url && (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm">
                    View Posting
                  </a>
                )}
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleMatch(job, idx)}
                  disabled={matchingId === idx}
                >
                  {matchingId === idx ? 'Matching...' : match ? 'Re-match' : 'Check Match'}
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleSaveAndApply(job, idx)}
                  disabled={savingId === idx || applyingId === idx || job._applied}
                >
                  {job._applied ? 'Applied ✓' : savingId === idx || applyingId === idx ? 'Saving...' : 'Save & Apply'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
