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
- Generates professional resume summaries using Gemini AI
- Context-aware output based on user experience
- Retry mechanism + fallback handling for API failures
- Clean JSON structured response for UI rendering

---

### ⚡ AI Skills Organizer (Unique Feature ⭐)
- One-click **AI button to categorize skills automatically**
- Groups skills into:
  - Frontend (React, HTML, CSS, etc.)
  - Backend (Node.js, Express, etc.)
  - Database (MongoDB, SQL)
  - Tools & Platforms (Git, Postman, Docker, etc.)
- Improves resume readability and ATS scoring
- Removes manual effort of organizing skills

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
- Designed for ATS compatibility and readability

---

### 🔐 Authentication System
- Secure login & registration
- JWT-based authentication
- Protected user routes

---

### 💾 Resume Management
- Save multiple resumes per user
- Edit and update anytime
- Data stored securely in MongoDB

---

## 🧱 System Architecture

Frontend (React + Vite)  
        ↓  
Backend (Node.js + Express)  
        ↓  
MongoDB Atlas Database  
        ↓  
Gemini AI API (Summary + Skills categorization)

---

## 🗂 Database Schema (MongoDB)

### User Model
```json
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

🤖 AI Integration (Gemini API)
AI-powered resume summary generation
AI-based skills categorization logic
Retry mechanism for rate limits (429 handling)
Cached responses for performance optimization
Safe fallback responses when API fails

⚙️ Tech Stack

Frontend: React, Vite, Context API
Backend: Node.js, Express.js
Database: MongoDB Atlas
Authentication: JWT
AI: Google Gemini API
Deployment: Render

🛠 Installation & Setup
# Clone repository
git clone https://github.com/T-nisha05/ResumeBuilder

# Backend setup
cd backend
npm install
npm start

# Frontend setup
cd frontend
npm install
npm run dev

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
POST	/api/ai/generate-summary	AI resume summary
POST	/api/ai/skills	AI skill categorization
GET	/api/resumes	Fetch resumes
POST	/api/resumes	Create resume

💡 Key Learnings
Full-stack deployment using Render
AI integration using Gemini API
Real-world API design & architecture
JWT authentication flow
MongoDB schema modeling
AI-driven UI automation (skills categorization)
Production environment handling

🚀 Future Enhancements
AI resume scoring (ATS match score)
Drag & drop resume editor
Resume PDF export improvements
Public resume sharing links
Smart job-role based templates
Multi-language resume support

👨‍💻 Author
Tanu Pandya
GitHub: T-nisha05

⭐ Project Status

✔ Fully deployed
✔ Production ready
✔ AI integrated full-stack system
✔ Internship / Portfolio ready
✔ Real-world problem solving project

🏁 Final Note
This project demonstrates strong full-stack engineering skills including API development, authentication systems,
 database design, and AI integration — with real-world usability and automation features like AI-based skill categorization.
