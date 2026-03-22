import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { firebaseUser, user, loading, resendVerification, logout } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  if (!firebaseUser) return <Navigate to="/login" replace />;

  // Block unverified email users
  if (!firebaseUser.emailVerified) {
    return <VerifyEmailGate resendVerification={resendVerification} logout={logout} email={firebaseUser.email} />;
  }

  if (!user) return <div className="loading">Loading...</div>;
  return children;
}

function VerifyEmailGate({ resendVerification, logout, email }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleResend = async () => {
    setError('');
    try {
      await resendVerification();
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to resend verification email');
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Verify Your Email</h1>
        <p className="auth-subtitle">
          We sent a verification link to <strong>{email}</strong>.
          Please check your inbox and click the link to continue.
        </p>
        {error && <div className="alert alert-error">{error}</div>}
        {sent && <div className="alert alert-success">Verification email sent!</div>}
        <button className="btn btn-primary btn-block" onClick={handleRefresh}>
          I've verified — let me in
        </button>
        <button className="btn btn-secondary btn-block" onClick={handleResend} disabled={sent} style={{ marginTop: '0.5rem' }}>
          {sent ? 'Email sent' : 'Resend verification email'}
        </button>
        <p className="auth-footer">
          <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Sign out</a>
        </p>
      </div>
    </div>
  );
}
