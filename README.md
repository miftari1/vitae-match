# 📘 Vitae-Match

**Vitae-Match** is a full-stack AI-powered resume analyzer that compares a candidate’s CV against a job posting to determine how well they match.  
It uses **FastAPI**, **React**, **TailwindCSS**, and **Sentence Transformers (NLP)** to analyze semantic similarity and skill overlap — giving users a **match score** and charts for missing vs. matched skills.

---

## 🚀 Features

✅ Upload your PDF CV and paste a job description  
✅ AI-powered similarity analysis using Sentence Transformers  
✅ Match percentage visualization  
✅ Highlights matched and missing skills  
✅ Secure JWT-based authentication (login/register)  
✅ Persistent user sessions (analyses saved per user)  
✅ Modern React + Tailwind frontend  
✅ FastAPI backend with SQLite storage 


## ⚙️ Tech Stack

**Backend**
- FastAPI  
- SQLModel + SQLite  
- Sentence Transformers (for NLP)  
- PyJWT for JWT authentication  
- Passlib / Pwdlib for password hashing  

**Frontend**
- React (Vite)  
- TailwindCSS  
- Axios for API requests  
- Recharts for visualization  

---

## 🧩 How It Works

1. **User Registration/Login**  
   Users sign up via the `/users/register` endpoint or log in to get a JWT token.

2. **Resume Upload**  
   The user uploads a PDF file and pastes a job posting.

3. **Analysis Engine**  
   The backend extracts text from the CV, compares it with the job posting using a Sentence Transformer model, and calculates:
   - Overall **match percentage**
   - **Matched skills** and **missing skills**

4. **Visualization**  
   The frontend displays:
   - A **match percentage chart**
   - A **skills comparison chart**

5. **Session Saving**  
   Analysis results are stored in the database, linked to the user account.

---

## 🧰 Setup Instructions

### 🖥️ **Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # on Windows
source venv/bin/activate  # on macOS/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload

### 💻 **Frontend**
cd frontend
npm install
npm run start

### **Here’s a list of all available API routes in the **Vitae-Match** backend:**

- **POST /users/register** — Register a new user  
- **POST /login** — Log in and receive a JWT token  
- **GET /users/me** — Retrieve information about the current authenticated user  
- **GET /users/me/analyses** — Get all previous analysis sessions for the current user  
- **POST /analyze** — Upload a resume and job description to get a similarity match and skill comparison  

## 📊 **Example API Usage**

Below are examples showing how to interact with the **Vitae-Match API** using `curl`.  
All endpoints assume your backend runs locally at **http://127.0.0.1:8000**.

---

### 🧾 **Register a New User**

**Endpoint:**  
`POST /users/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "full_name": "John Doe",
  "email": "john@example.com"
}

**Expected Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "full_name": "John Doe",
  "email": "john@example.com",
  "created_at": "2025-10-26T12:34:56.789Z"
}

### 🧾 **User Login**

**Endpoint:**  
`POST /login`

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}


### 🧾 **User Login**

**Endpoint:**  
`POST /analyze`

**Form Data:**
file: PDF resume file (binary)
job_description: Job posting tex

**Expected Response:**
```json
{
  "score": 87,
  "matched_skills": ["Python", "Machine Learning", "SQL"],
  "missing_skills": ["Deep Learning", "AWS"]
}
