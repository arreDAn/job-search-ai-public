# Job Search AI

A full-stack AI-powered platform that helps job seekers find relevant jobs, optimize resumes, and prepare for interviews.

## Live Demo

> [https://job-search-ai.vercel.app](https://job-search-ai.vercel.app)

## Features

- **Job Search & Scraping** — Scrape job listings from Indeed with keyword and location filters
- **Resume-to-Job Matching** — Skill extraction engine that calculates a 0-100% compatibility score
- **AI Resume Optimizer** — Rewrites your resume for a specific job using Google Gemini
- **Interview Prep** — Generates interview questions from job descriptions and evaluates your answers with AI feedback
- **Application Tracker** — Track job applications with status updates and notes
- **Dashboard** — Aggregated metrics: match scores, interview history, resume versions

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18, Vite, React Router v6     |
| Backend     | Python, Flask, SQLAlchemy           |
| AI          | Google Gemini API                   |
| Database    | SQLite (dev) / PostgreSQL (prod)    |
| Auth        | JWT (JSON Web Tokens), bcrypt       |
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
│   ├── components/       # Shared components (Navbar, AuthContext, ProtectedRoute)
│   ├── pages/            # Page components
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
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
```

## Screenshots

> _Coming soon_

## Author

**Daniel Arre** — [GitHub](https://github.com/arreDAn)

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.
