import { auth } from '../firebase';

const API_BASE = import.meta.env.VITE_API_URL || '';
const RECAPTCHA_SITE_KEY = '6LdiF5UsAAAAAEY7nqA-iKZ3gU6MnyEM9dvl6gMb';

async function getRecaptchaToken(action) {
  try {
    await new Promise((resolve) => window.grecaptcha.ready(resolve));
    return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch {
    return null;
  }
}

async function getToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

async function request(path, options = {}) {
  const token = await getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, quota: data.quota, ...data };
  return data;
}

export const api = {
  // Auth — Firebase handles credentials; these sync with the backend
  register: async () => {
    const recaptcha_token = await getRecaptchaToken('register');
    return request('/api/auth/register', { method: 'POST', body: JSON.stringify({ recaptcha_token }) });
  },
  login: async () => {
    const recaptcha_token = await getRecaptchaToken('login');
    return request('/api/auth/login', { method: 'POST', body: JSON.stringify({ recaptcha_token }) });
  },
  getProfile: () => request('/api/auth/profile'),

  // Jobs
  scrapeJobs: (query, location, source = 'indeed', maxResults = 20) =>
    request('/api/jobs/scrape', {
      method: 'POST',
      body: JSON.stringify({ query, location, source, max_results: maxResults }),
    }),
  listJobs: () => request('/api/jobs'),
  saveJob: (job) =>
    request('/api/jobs', { method: 'POST', body: JSON.stringify(job) }),
  matchJob: (resume, jobDescription, jobId) =>
    request('/api/jobs/match', {
      method: 'POST',
      body: JSON.stringify({ resume, job_description: jobDescription, job_id: jobId }),
    }),

  // Resumes
  optimizeResume: (resume, jobDescription, jobId) =>
    request('/api/resumes/optimize', {
      method: 'POST',
      body: JSON.stringify({ resume, job_description: jobDescription, job_id: jobId }),
    }),

  // Interview
  generateQuestions: (jobDescription, jobId, numQuestions = 5) =>
    request('/api/interview/generate', {
      method: 'POST',
      body: JSON.stringify({ job_description: jobDescription, job_id: jobId, num_questions: numQuestions }),
    }),
  evaluateAnswer: (interviewId, answer) =>
    request('/api/interview/evaluate', {
      method: 'POST',
      body: JSON.stringify({ interview_id: interviewId, answer }),
    }),
  getInterviewHistory: (jobId) =>
    request(`/api/interview/history${jobId ? `?job_id=${jobId}` : ''}`),

  // Applications
  createApplication: (jobId, matchScore, notes, resumeId) =>
    request('/api/applications', {
      method: 'POST',
      body: JSON.stringify({ job_id: jobId, match_score: matchScore, notes, resume_id: resumeId }),
    }),
  listApplications: (status) =>
    request(`/api/applications${status ? `?status=${status}` : ''}`),
  updateApplication: (appId, updates) =>
    request(`/api/applications/${appId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // Dashboard
  getDashboard: () => request('/api/dashboard'),

  // Usage quota
  getUsage: () => request('/api/usage'),
};
