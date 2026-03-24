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
        <div className="card result-card">
          <div className="result-header">
            <h2>Optimized Resume</h2>
            <div className="result-meta">
              {result.score != null && (
                <span className={`match-badge ${result.score >= 70 ? 'match-high' : result.score >= 40 ? 'match-mid' : 'match-low'}`}>
                  Fit Score: {result.score}%
                </span>
              )}
              <button className="btn btn-sm btn-secondary" onClick={handleCopy}>
                Copy to Clipboard
              </button>
            </div>
          </div>
          <pre className="resume-output">{result.optimized_resume}</pre>
        </div>
      )}
    </div>
  );
}
