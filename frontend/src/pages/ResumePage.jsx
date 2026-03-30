import { useState } from 'react';
import { api } from '../api/client';
import QuotaExceeded from '../components/QuotaExceeded';

export default function ResumePage() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quotaError, setQuotaError] = useState(null);

  const handleOptimize = async (e) => {
    e.preventDefault();
        setError('');
    setQuotaError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await api.optimizeResume(resume, jobDescription);
      setResult(data);
    } catch (err) {
      if (err.status === 429 && err.quota) {
        setQuotaError(err.quota);
      } else {
        setError(err.error || 'Failed to optimize resume');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setResume(ev.target.result);
    reader.readAsText(file);
  };

  const handleCopy = () => {
    if (result?.optimized_resume) {
      navigator.clipboard.writeText(result.optimized_resume);
    }
  };

  return (
    <div className="page">
      <h1>Resume Optimizer</h1>
      <p className="page-subtitle">
        Paste your resume and a job description to get an AI-optimized version tailored for the role.
      </p>

      <form onSubmit={handleOptimize} className="resume-form">
        <div className="form-row">
          <div className="form-group form-group-half">
            <label htmlFor="resume">
              Your Resume
              <span className="label-hint"> — paste text or upload a .txt file</span>
            </label>
            <textarea
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your resume content here..."
              rows={12}
              required
            />
            <input type="file" accept=".txt" onChange={handleFileUpload} className="file-input" />
          </div>

          <div className="form-group form-group-half">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description here..."
              rows={12}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Optimizing with AI...' : 'Optimize Resume'}
        </button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}
      {quotaError && (
        <QuotaExceeded
          action="resume_optimize"
          tier={quotaError.tier}
          limit={quotaError.limit}
          resetsAt={quotaError.resets_at}
        />
      )}

            {result && (
        <div className="page" style={{ gap: '1.5rem' }}>

          {/* Overall Score & Feedback */}
          <div className="card">
            <div className="result-header">
              <h2>Analysis Results</h2>
              <div className="result-meta">
                {result.score != null && (
                  <span className={`match-badge ${result.score >= 70 ? 'match-high' : result.score >= 40 ? 'match-mid' : 'match-low'}`}>
                    Fit Score: {result.score}%
                  </span>
                )}
              </div>
            </div>
            {result.overall_feedback && (
              <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: 1.6 }}>
                {result.overall_feedback}
              </p>
            )}
          </div>

          {/* Strengths */}
          {result.strengths?.length > 0 && (
            <div className="card">
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--success)' }}>✅ What You Do Well</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem' }}>
                {result.strengths.map((s, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Keywords */}
          {result.missing_keywords?.length > 0 && (
            <div className="card">
              <h3 style={{ marginBottom: '0.75rem', color: 'var(--warning)' }}>⚠️ Missing Keywords</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {result.missing_keywords.map((kw, i) => (
                  <span key={i} className="skill-tag skill-missing">{kw}</span>
                ))}
              </div>
            </div>
          )}

          {/* Section Breakdown */}
          {result.sections?.length > 0 && (
            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>📋 Section-by-Section Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {result.sections.map((section, i) => (
                  <div key={i} style={{
                    border: `1px solid ${
                      section.status === 'good' ? 'rgba(34,197,94,0.3)'
                      : section.status === 'critical' ? 'rgba(239,68,68,0.3)'
                      : 'rgba(245,158,11,0.3)'
                    }`,
                    borderRadius: 'var(--radius)',
                    padding: '1rem',
                    background: section.status === 'good'
                      ? 'rgba(34,197,94,0.05)'
                      : section.status === 'critical'
                      ? 'rgba(239,68,68,0.05)'
                      : 'rgba(245,158,11,0.05)',
                  }}>
                    {/* Section Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontWeight: 600 }}>{section.name}</h4>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '12px',
                        background: section.status === 'good'
                          ? 'rgba(34,197,94,0.15)'
                          : section.status === 'critical'
                          ? 'rgba(239,68,68,0.15)'
                          : 'rgba(245,158,11,0.15)',
                        color: section.status === 'good'
                          ? 'var(--success)'
                          : section.status === 'critical'
                          ? 'var(--danger)'
                          : 'var(--warning)',
                      }}>
                        {section.status === 'good' ? '✓ Good'
                          : section.status === 'critical' ? '✗ Critical'
                          : '⚠ Needs Work'}
                      </span>
                    </div>

                    {/* Feedback */}
                    {section.feedback && (
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                        {section.feedback}
                      </p>
                    )}

                    {/* Issues */}
                    {section.issues?.length > 0 && (
                      <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {section.issues.map((issue, j) => (
                          <li key={j} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{issue}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Changes */}
          {result.key_changes?.length > 0 && (
            <div className="card">
              <h3 style={{ marginBottom: '0.75rem' }}>🔧 Key Changes Made</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem' }}>
                {result.key_changes.map((change, i) => (
                  <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{change}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Optimized Resume */}
          <div className="card result-card">
            <div className="result-header">
              <h2>✨ Optimized Resume</h2>
              <button className="btn btn-sm btn-secondary" onClick={handleCopy}>
                Copy to Clipboard
              </button>
            </div>
            <pre className="resume-output">{result.optimized_resume}</pre>
          </div>

        </div>
      )}
    </div>
  );
}
