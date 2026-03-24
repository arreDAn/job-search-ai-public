import { useState, useEffect } from 'react';
import { api } from '../api/client';
import QuotaExceeded from '../components/QuotaExceeded';

export default function InterviewPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [generating, setGenerating] = useState(false);
  const [evaluatingId, setEvaluatingId] = useState(null);
  const [error, setError] = useState('');
  const [quotaError, setQuotaError] = useState(null);

  // History
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

    const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setQuotaError(null);
    setQuestions([]);
    setAnswers({});
    setEvaluations({});
    setGenerating(true);
    try {
      const data = await api.generateQuestions(jobDescription, undefined, numQuestions);
      setQuestions(data.questions || []);
    } catch (err) {
      if (err.status === 429 && err.quota) {
        setQuotaError(err.quota);
      } else {
        setError(err.error || 'Failed to generate questions');
      }
    } finally {
      setGenerating(false);
    }
  };

    const handleEvaluate = async (q) => {
    const answer = answers[q.id];
    if (!answer?.trim()) return;
    setEvaluatingId(q.id);
    setError('');
    setQuotaError(null);
    try {
      const data = await api.evaluateAnswer(q.id, answer);
      setEvaluations((prev) => ({ ...prev, [q.id]: data }));
    } catch (err) {
      if (err.status === 429 && err.quota) {
        setQuotaError(err.quota);
      } else {
        setError(err.error || 'Failed to evaluate answer');
      }
    } finally {
      setEvaluatingId(null);
    }
  };

  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const data = await api.getInterviewHistory();
      setHistory(data.interviews || []);
      setShowHistory(true);
    } catch (err) {
      setError(err.error || 'Failed to load history');
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Interview Prep</h1>

      <div className="page-actions">
        <button
          className="btn btn-secondary"
          onClick={showHistory ? () => setShowHistory(false) : loadHistory}
          disabled={historyLoading}
        >
          {historyLoading ? 'Loading...' : showHistory ? 'Back to Practice' : 'View History'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {quotaError && (
        <QuotaExceeded
          action={quotaError.action || 'interview_generate'}
          tier={quotaError.tier}
          limit={quotaError.limit}
          resetsAt={quotaError.resets_at}
        />
      )}

      {showHistory ? (
        <div className="interview-history">
          <h2>Interview History</h2>
          {history.length === 0 ? (
            <p className="empty-state">No interview history yet. Practice some questions first!</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="card history-card">
                <div className="history-question">
                  <strong>Q:</strong> {item.question}
                </div>
                {item.user_answer && (
                  <div className="history-answer">
                    <strong>Your Answer:</strong> {item.user_answer}
                  </div>
                )}
                {item.score != null && (
                  <div className="history-meta">
                    <span className={`score-badge ${item.score >= 7 ? 'score-high' : item.score >= 4 ? 'score-mid' : 'score-low'}`}>
                      Score: {item.score}/10
                    </span>
                    <span className="history-date">
                      {item.answered_at ? new Date(item.answered_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                )}
                {item.feedback && (
                  <div className="history-feedback">{item.feedback}</div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <>
          <form onSubmit={handleGenerate} className="interview-form">
            <div className="form-group">
              <label htmlFor="jobDesc">Job Description</label>
              <textarea
                id="jobDesc"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste a job description to generate tailored interview questions..."
                rows={6}
                required
              />
            </div>
            <div className="form-row-inline">
              <div className="form-group">
                <label htmlFor="numQ">Number of Questions</label>
                <select
                  id="numQ"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                >
                  {[3, 5, 7, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" disabled={generating}>
                {generating ? 'Generating...' : 'Generate Questions'}
              </button>
            </div>
          </form>

          {questions.length > 0 && (
            <div className="questions-list">
              <h2>Practice Questions</h2>
              {questions.map((q, idx) => {
                const evaluation = evaluations[q.id];
                return (
                  <div key={q.id} className="card question-card">
                    <div className="question-header">
                      <span className="question-number">Q{idx + 1}</span>
                      <p className="question-text">{q.question}</p>
                    </div>

                    <div className="form-group">
                      <textarea
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Type your answer here..."
                        rows={4}
                        disabled={!!evaluation}
                      />
                    </div>

                    {!evaluation ? (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEvaluate(q)}
                        disabled={evaluatingId === q.id || !answers[q.id]?.trim()}
                      >
                        {evaluatingId === q.id ? 'Evaluating...' : 'Submit Answer'}
                      </button>
                    ) : (
                      <div className="evaluation">
                        <div className="evaluation-header">
                          <span className={`score-badge ${evaluation.score >= 7 ? 'score-high' : evaluation.score >= 4 ? 'score-mid' : 'score-low'}`}>
                            Score: {evaluation.score}/10
                          </span>
                        </div>
                        {evaluation.feedback && <p className="eval-feedback">{evaluation.feedback}</p>}
                        {evaluation.strengths && <p className="eval-strengths"><strong>Strengths:</strong> {evaluation.strengths}</p>}
                        {evaluation.weaknesses && <p className="eval-weaknesses"><strong>Areas to improve:</strong> {evaluation.weaknesses}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
