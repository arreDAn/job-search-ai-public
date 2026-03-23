# API Specification

**Base URL (production):** `https://job-search-ai-backend-141172818759.us-central1.run.app/api`  
**Base URL (local dev):** `http://localhost:5000/api`

All endpoints use the `/api` prefix.  
Protected endpoints require a Firebase ID token in the `Authorization` header:

```
Authorization: Bearer <Firebase ID token>
```

The frontend obtains tokens automatically via `auth.currentUser.getIdToken()`. Tokens expire after ~1 hour; Firebase refreshes them transparently.

> **reCAPTCHA v3:** The `/auth/register` and `/auth/login` endpoints also accept an optional `recaptcha_token` field in the request body, validated server-side when `RECAPTCHA_SECRET_KEY` is configured.

---

## Authentication

### Register
```
POST /api/auth/register
Authorization: Bearer <Firebase ID token>
```
Firebase creates the account on the client side before this call. This endpoint syncs the Firebase user to the local PostgreSQL database.

**Request body:** _(optional)_
```json
{
  "recaptcha_token": "..."
}
```
**Response (201):**
```json
{
  "message": "User registered successfully",
  "user_id": 1
}
```

**Rate limit:** 5 per hour

---

### Login
```
POST /api/auth/login
Authorization: Bearer <Firebase ID token>
```
Verifies the Firebase token and returns the local user profile. Creates a local user if one does not exist yet.

**Request body:** _(optional)_
```json
{
  "recaptcha_token": "..."
}
```
**Response (200):**
```json
{
  "message": "Login successful",
  "user_id": 1
}
```

**Rate limit:** 10 per hour

---

### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <Firebase ID token>
```
**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "resume_text": "...",
  "created_at": "2026-03-18T12:00:00"
}
```

---

## Jobs

### Scrape Jobs
```
POST /api/jobs/scrape
```
**Request:**
```json
{
  "source": "indeed",
  "query": "python developer",
  "location": "New York, NY",
  "max_results": 10
}
```
**Response (200):**
```json
{
  "jobs": [
    {
      "title": "Senior Python Developer",
      "company": "TechCo",
      "location": "New York, NY",
      "description": "We are looking for...",
      "url": "https://indeed.com/...",
      "source": "indeed"
    }
  ]
}
```

---

### List Saved Jobs
```
GET /api/jobs
```
**Response (200):**
```json
{
  "jobs": [
    {
      "id": 1,
      "title": "Senior Python Developer",
      "company": "TechCo",
      "url": "https://...",
      "description": "...",
      "skills_required": "python, flask, aws",
      "salary": "$120k-150k",
      "source": "indeed",
      "scraped_at": "2026-03-18T12:00:00"
    }
  ]
}
```

---

### Save a Job
```
POST /api/jobs
```
**Request:**
```json
{
  "title": "Python Developer",
  "company": "TechCo",
  "url": "https://indeed.com/job/123",
  "description": "...",
  "skills_required": "python, flask",
  "salary": "$120k",
  "source": "indeed"
}
```
**Response (201):**
```json
{
  "job": { ... }
}
```

---

### Match Resume to Job
```
POST /api/jobs/match
Authorization: Bearer <Firebase ID token>
```
**Request (option 1 — by job description):**
```json
{
  "resume": "Python developer with 5 years experience in Flask, AWS...",
  "job_description": "Looking for a Python dev with Flask, Docker, Kubernetes..."
}
```
**Request (option 2 — by job_id):**
```json
{
  "resume": "Python developer with 5 years experience...",
  "job_id": 1
}
```
**Response (200):**
```json
{
  "score": 75,
  "match_percentage": "75%",
  "matched_skills": ["python", "flask", "aws"],
  "missing_skills": ["docker", "kubernetes"],
  "job_skills": ["python", "flask", "aws", "docker", "kubernetes"],
  "skills_matched": 3,
  "skills_total": 5
}
```

---

## Resumes

### Optimize Resume
```
POST /api/resumes/optimize
Authorization: Bearer <Firebase ID token>
```
**Request:**
```json
{
  "resume": "Current resume text...",
  "job_description": "Job posting text..."
}
```
**Response (200):**
```json
{
  "optimized_resume": "Rewritten resume tailored to the job...",
  "score": 88,
  "resume_id": 5
}
```

---

## Interviews

### Generate Questions
```
POST /api/interview/generate
Authorization: Bearer <Firebase ID token>
```
**Request:**
```json
{
  "job_description": "Senior Python developer with Flask and AWS experience..."
}
```
**Response (200):**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "Explain how you would design a REST API using Flask..."
    },
    {
      "id": 2,
      "question": "Describe your experience with AWS services..."
    }
  ]
}
```

---

### Evaluate Answer
```
POST /api/interview/evaluate
Authorization: Bearer <Firebase ID token>
```
**Request:**
```json
{
  "interview_id": 1,
  "answer": "I would start by defining the resource endpoints..."
}
```
**Response (200):**
```json
{
  "score": 8,
  "feedback": "Good answer. You covered REST principles well. Consider mentioning error handling and authentication."
}
```

---

### Interview History
```
GET /api/interview/history
Authorization: Bearer <Firebase ID token>
```
**Response (200):**
```json
{
  "interviews": [
    {
      "id": 1,
      "question": "Explain how you would design...",
      "user_answer": "I would start by...",
      "feedback": "Good answer...",
      "score": 8,
      "created_at": "2026-03-18T12:00:00"
    }
  ]
}
```

---

## Applications

### Track Application
```
POST /api/applications
Authorization: Bearer <Firebase ID token>
```
**Request:**
```json
{
  "job_id": 1,
  "status": "applied",
  "notes": "Applied via company website"
}
```
**Response (201):**
```json
{
  "application": { ... }
}
```

---

### List Applications
```
GET /api/applications
Authorization: Bearer <Firebase ID token>
```
**Response (200):**
```json
{
  "applications": [ ... ],
  "total": 5
}
```

---

### Update Application
```
PATCH /api/applications/:id
Authorization: Bearer <Firebase ID token>
```
**Request:**
```json
{
  "status": "interview",
  "notes": "Phone screen scheduled for Friday"
}
```
**Response (200):**
```json
{
  "application": { ... }
}
```

---

## Dashboard

### Get Dashboard Data
```
GET /api/dashboard
Authorization: Bearer <Firebase ID token>
```
**Response (200):**
```json
{
  "applications": {
    "total": 10,
    "by_status": { "applied": 5, "interview": 3, "offer": 1, "rejected": 1 },
    "avg_match_score": 78.5,
    "recent": [ ... ]
  },
  "interviews": {
    "total": 20,
    "answered": 15,
    "avg_score": 7.2
  },
  "resumes": {
    "total": 4,
    "avg_score": 80.0
  }
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "error": "Description of the error"
}
```

| Status Code | Meaning                  |
|-------------|--------------------------|
| 400         | Bad request / validation |
| 401         | Unauthorized (no token)  |
| 404         | Resource not found       |
| 500         | Internal server error    |
