# Referral Platform (MERN Stack)

## 🚀 Overview
This is a demo project for the **Full Stack Developer Internship Assignment**.  
It implements a **Referral Platform** where users can:
- Signup & Login securely (JWT Auth).
- Create and manage their **profile** (personal, education, employment).
- Post and manage **job referrals**.
- Access a **dashboard** to navigate between features.

Built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**.

---

## 🛠️ Tech Stack
- **Frontend**: React + Material-UI (MUI) + Axios + React Router
- **Backend**: Node.js + Express + JWT Authentication
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (stored in localStorage)
- **Optional (Not implemented yet)**: Docker, Public feed, Search filters

---

## 📂 Project Structure

(/backend -> Express API + MongoDB
/frontend -> React frontend with Material-UI
README.md -> Setup instructions + project info
)

## 🔑 Demo Login (Mandatory)
Reviewer can use this pre-seeded account:

- **Email**: hire-me@anshumat.org  
- **Password**: HireMe@2025!  

---

## ⚡ Features
✅ Secure Login/Signup  
✅ Profile creation (personal, education, employment)  
✅ Post job referrals (title, company, description, status)  
✅ Dashboard to navigate between features  
✅ CRUD (Create, Read, Delete) for referrals  

---

## 🖥️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/referral-platform.git
cd referral-platform

2. Setup Backend
cd backend
npm install

Create a .env file in /backend with:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/referral-platform
JWT_SECRET=your_jwt_secret

Run backend:
npm start

3. Setup Frontend
cd ../frontend
npm install
npm start

4. Access App
Frontend: http://localhost:3000
Backend API: http://localhost:5000

  
👨‍💻 Author: Likith Poojary

