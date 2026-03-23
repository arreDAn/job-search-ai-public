# System Architecture

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USERS / BROWSER                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                       │
│                    Deployed on Vercel                            │
│                                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────────┐ │
│  │  Login /   │ │   Jobs     │ │  Resume    │ │  Interview   │ │
│  │  Register  │ │  Search    │ │  Optimizer │ │  Prep        │ │
│  └────────────┘ └────────────┘ └────────────┘ └──────────────┘ │
│  ┌────────────────────────┐ ┌────────────────────────────────┐  │
│  │  Applications Tracker  │ │  Dashboard                     │  │
│  └────────────────────────┘ └────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Landing Pages: Home, About, Services, Future Services  │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API (JSON)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                 BACKEND API (Flask + Python)                     │
│                 Deployed on Google Cloud Run                     │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌──────────────────┐  │
│  │   Auth   │ │ Scraper  │ │  Matcher  │ │  Resume          │  │
│  │(Firebase)│ │ (Indeed) │ │  (Skills) │ │  Optimizer       │  │
│  └──────────┘ └──────────┘ └───────────┘ │  (Gemini API)    │  │
│  ┌──────────┐ ┌──────────┐               └──────────────────┘  │
│  │Interview │ │App       │ ┌──────────────────────────────────┐ │
│  │Generator │ │Tracker   │ │  Dashboard Aggregator            │ │
│  │(Gemini)  │ │          │ └──────────────────────────────────┘ │
│  └──────────┘ └──────────┘                                      │
└────────────────────┬──────────────────────┬─────────────────────┘
                     │                      │
                     ▼                      ▼
┌────────────────────────────┐  ┌──────────────────────────────┐
│       DATABASE             │  │    EXTERNAL APIs             │
│  SQLite (dev)              │  │                              │
│  PostgreSQL (prod)         │  │  Google Gemini 2.5 Flash    │
│                            │  │  Indeed (web scraping)       │
│  Tables:                   │  │                              │
│  - Users                   │  └──────────────────────────────┘
│  - Jobs                    │
│  - Applications            │
│  - Resumes                 │
│  - Interviews              │
└────────────────────────────┘
```

## Backend Modules

| Module         | Responsibility                                           |
|----------------|----------------------------------------------------------|
| `auth`         | Firebase token verification, user sync via Admin SDK  |
| `scraper`      | Web scraping job listings from Indeed                     |
| `matcher`      | Skill extraction + resume-to-job compatibility scoring    |
| `optimizer`    | AI-powered resume rewriting via Google Gemini             |
| `interview`    | Question generation + answer evaluation via Gemini        |
| `tracker`      | Job application status management                        |
| `dashboard`    | Aggregated metrics for user activity                     |

## Data Flow

### Job Search Flow
```
User enters search query
        │
        ▼
Frontend → POST /api/jobs/scrape → Backend scrapes Indeed
        │
        ▼
Backend returns job listings → Frontend displays results
        │
        ▼
User clicks "Match" → POST /api/jobs/match
        │
        ▼
Backend extracts skills from resume + job description
        │
        ▼
Returns compatibility score (0-100%) + matched/missing skills
```

### Resume Optimization Flow
```
User pastes resume + job description
        │
        ▼
Frontend → POST /api/resumes/optimize
        │
        ▼
Backend sends prompt to Google Gemini 2.5 Flash
        │
        ▼
Gemini returns optimized resume
        │
        ▼
Backend stores result in DB + returns to frontend
```

### Interview Prep Flow
```
User provides job description
        │
        ▼
Frontend → POST /api/interview/generate
        │
        ▼
Backend sends prompt to Gemini → generates questions
        │
        ▼
User answers a question → POST /api/interview/evaluate
        │
        ▼
Gemini evaluates answer → returns score + feedback
```

## Database Schema

```
Users
├── id (PK)
├── email (unique)
├── firebase_uid (unique)
├── resume_text
└── created_at

Jobs
├── id (PK)
├── title
├── company
├── url (unique)
├── description
├── skills_required
├── salary
├── source
└── scraped_at

Applications
├── id (PK)
├── user_id (FK → Users)
├── job_id (FK → Jobs)
├── status
├── match_score
├── applied_date
└── notes

Resumes
├── id (PK)
├── user_id (FK → Users)
├── job_id (FK → Jobs)
├── optimized_resume
├── score
└── created_at

Interviews
├── id (PK)
├── user_id (FK → Users)
├── job_id (FK → Jobs)
├── question
├── user_answer
├── feedback
├── score
└── created_at
```

## Security

- Firebase Authentication (email/password with email verification)
- Firebase ID tokens verified server-side via Firebase Admin SDK
- Backend source code kept private
- API keys stored in environment variables (never in code)
- CORS configured for frontend domain only
- reCAPTCHA v3 on auth endpoints
