# Job Search AI

A full-stack AI-powered platform that helps job seekers find relevant jobs, optimize resumes, and prepare for interviews.

## Live Demo

> [https://job-search-ai-public.vercel.app](https://job-search-ai-public.vercel.app)

## Features

- **Job Search & Scraping** — Scrape job listings from Indeed with keyword and location filters
- **Resume-to-Job Matching** — Skill extraction engine that calculates a 0-100% compatibility score
- **AI Resume Optimizer** — Rewrites your resume for a specific job using Google Gemini 2.5 Flash
- **Interview Prep** — Generates interview questions from job descriptions and evaluates your answers with AI feedback
- **Application Tracker** — Track job applications with status updates and notes
- **Dashboard** — Aggregated metrics: match scores, interview history, resume versions
- **Landing Pages** — Professional marketing pages: Home, About, Services, Future Services

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18, Vite, React Router v6     |
| Backend     | Python, Flask, SQLAlchemy           |
| AI          | Google Gemini 2.5 Flash              |
| Database    | SQLite (dev) / PostgreSQL (prod)    |
| Auth        | Firebase Authentication              |
| Deployment  | Vercel (frontend), Google Cloud Run (backend) |

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) for system design and data flow diagrams.

## API Reference

See [API_SPEC.md](API_SPEC.md) for full endpoint documentation.

## Project Structure

```
frontend/
├── src/
│   ├── api/              # API client layer
│   ├── components/       # Shared components
│   │   ├── AuthContext.jsx
│   │   ├── Navbar.jsx
│   │   ├── LandingNavbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── WireframeMesh.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── FutureServicesPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── ResumePage.jsx
│   │   ├── InterviewPage.jsx
│   │   ├── ApplicationsPage.jsx
│   │   └── DashboardPage.jsx
│   ├── App.jsx           # Router setup
│   └── main.jsx          # Entry point
├── package.json
└── vite.config.js
```

> **Note:** Backend source code is kept private for security. See [ARCHITECTURE.md](ARCHITECTURE.md) for backend design details.

## Getting Started (Frontend)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://127.0.0.1:5000
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

## Screenshots

> _Coming soon_

## Author

**Daniel Arre** — [GitHub](https://github.com/arreDAn)

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
