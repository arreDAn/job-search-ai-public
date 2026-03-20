# API Specification

Base URL: `https://api.yourdomain.com/api`

All endpoints under `/api` prefix. Protected endpoints require `Authorization: Bearer <token>` header.

---

## Authentication

### Register
```
POST /api/auth/register
```
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response (201):**
```json
{
  "message": "User registered successfully",
  "user_id": 1
}
```

---

### Login
```
POST /api/auth/login
```
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response (200):**
```json
{
  "token": "eyJhbGciOi...",
  "user_id": 1,
  "email": "user@example.com"
}
```

---

### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
Authorization: Bearer <token>
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
