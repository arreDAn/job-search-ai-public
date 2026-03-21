import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingNavbar from './components/LandingNavbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FutureServicesPage from './pages/FutureServicesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import ResumePage from './pages/ResumePage';
import InterviewPage from './pages/InterviewPage';
import ApplicationsPage from './pages/ApplicationsPage';

const landingRoutes = ['/', '/about', '/services', '/future'];

function AppShell() {
  const location = useLocation();
  const isLanding = landingRoutes.includes(location.pathname);

  return (
    <>
      {isLanding ? <LandingNavbar /> : <Navbar />}
      {isLanding ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/future" element={<FutureServicesPage />} />
        </Routes>
      ) : (
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/jobs" element={<ProtectedRoute><JobsPage /></ProtectedRoute>} />
            <Route path="/resume" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
