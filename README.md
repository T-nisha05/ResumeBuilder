# 📄 ResumeBuilder — AI Powered Resume Builder

A full-stack **AI-powered Resume Builder** that helps users create, structure, and optimize professional resumes in real-time. The platform includes an AI-driven summary generator and a unique **“AI Skills Organizer” button** that automatically categorizes skills based on tech stack (Frontend, Backend, Database, Tools, etc.).

Built with React, Node.js, Express, MongoDB, and Gemini AI, and deployed on Render for production use.

---

## 🚀 Live Demo

Frontend: https://resumebuilder-1-uywr.onrender.com  
Backend API: https://resume-builder-backend-svs4.onrender.com  

---

## 📌 Problem Statement

Students and job seekers often face:
- Unstructured and messy skill sections in resumes
- Difficulty in writing professional summaries
- Lack of ATS-friendly formatting
- Manual categorization of technical skills

This project solves these issues using **AI assistance + automation + structured templates**.

---

## ✨ Key Features

### 🧠 AI Resume Summary Generator
- Generates professional summaries using Gemini AI
- Context-aware output based on user experience
- Retry mechanism + fallback handling for API failures
- Clean JSON structured response for UI rendering

---

### ⚡ AI Skills Organizer (Unique Feature ⭐)
- One-click AI button to categorize skills automatically
- Groups skills into:
  - Frontend (React, HTML, CSS)
  - Backend (Node.js, Express)
  - Database (MongoDB, SQL)
  - Tools (Git, Postman, Docker)
- Improves resume readability and ATS score
- Eliminates manual skill sorting

---

### 📝 Resume Builder (Live Editor)
- Real-time resume creation and editing
- Dynamic sections:
  - Personal Info
  - Education
  - Experience
  - Projects
  - Skills
- Instant preview updates

---

### 🎨 Multiple Resume Templates
- Clean and modern templates
- Switch templates instantly
- ATS-friendly design

---

### 🔐 Authentication System
- Secure login & registration
- JWT-based authentication
- Protected routes

---

### 💾 Resume Management
- Save multiple resumes per user
- Edit and update anytime
- MongoDB-based persistence

---

## 🧱 System Architecture

```text
Frontend (React + Vite)
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Atlas Database
        ↓
Gemini AI API
````
---

## 🤖 AI Integration (Gemini API)

- AI-powered resume summary generation  
- AI-based skills categorization  
- Retry mechanism for rate limits (429 handling)  
- Cached responses for performance optimization  
- Safe fallback responses when API fails  

---

## ⚙️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Vite, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT |
| AI Integration | Google Gemini API |
| Deployment | Render |

---

## 🗂 Database Schema (MongoDB)

```
User Model
{
  "name": "string",
  "email": "string",
  "password": "hashed",
  "createdAt": "date"
}

Resume Model
{
  "userId": "ObjectId",
  "title": "string",
  "personalInfo": {},
  "education": [],
  "experience": [],
  "projects": [],
  "skills": {
    "frontend": [],
    "backend": [],
    "database": [],
    "tools": []
  },
  "createdAt": "date"
}
````
---

## 🛠 Installation & Setup

git clone https://github.com/T-nisha05/ResumeBuilder
```
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
````
---

## 🔐 Environment Variables

Create a `.env` file in the **backend** folder and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=https://your-frontend-url.onrender.com
```
---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | User registration |
| POST | /api/auth/login | User login |
| POST | /api/ai/generate-summary | AI resume summary |
| POST | /api/ai/skills | AI skill categorization |
| GET | /api/resumes | Fetch resumes |
| POST | /api/resumes | Create resume |

---


## 💡 Key Learnings

- Full-stack deployment using Render  
- AI integration using Gemini API  
- JWT authentication flow  
- MongoDB schema design  
- Production-level environment handling  
- AI-based UI automation (skills categorization)

---

## 🚀 Future Enhancements

- AI resume scoring (ATS match score)  
- Drag & drop editor  
- PDF export improvements  
- Resume sharing links  
- Smart job-role templates

---

## 👨‍💻 Author

Tanisha Pandya | Software Engineering Aspirant
GitHub: https://github.com/T-nisha05
---

## ⭐ Project Status

- ✅ Successfully deployed on Render (Frontend + Backend)
- ✅ Production-ready full-stack application
- ✅ AI-powered features integrated (Gemini API)
- ✅ Portfolio-ready project for internship applications

---

🚀 Built a full-stack resume builder demonstrating end-to-end engineering skills, including REST API development, secure authentication, scalable database design, and seamless AI integration, with automation features such as AI-powered skill categorization to enhance user experience and resume quality.
