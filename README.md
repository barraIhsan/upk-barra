# Student Grades CRUD

Simple web app for managing student grades across different subjects.

## Setup

### 1. Database Setup

Create `student_grade_manager` database and fill the table:

```sql
CREATE TABLE grades (
  id VARCHAR(36) PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_student_subject (student_name, subject),
  KEY idx_student_name (student_name),
  KEY idx_subject (subject)
);
```

### 2. Install Dependencies

```bash
pnpm install
```

on both `frontend` and `backend`

### 3. Environment Setup

Copy `.env.example` on backend and rename it to `.env`. Then, modify it appropriately

### 4. Development

```bash
pnpm run start # on backend
pnpm run dev # on frontend
```

Server runs at `http://localhost:3000`
