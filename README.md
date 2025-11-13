# 🧠 Synchro – AI-Powered Smart Blogging Platform

**Live:** [synchro-blog.vercel.app](https://synchro-blog.vercel.app/)

Synchro is an AI-powered smart blogging platform built with **Next.js**, **NextAuth**, and **MongoDB**, integrating **Google Gemini** and **OpenAI** to make blogging faster, smarter, and more efficient.

---

## 🚀 Features

### 👤 User
- Secure email & OTP authentication  
- Temporary login lock system (5 failed attempts = 15m lock)  
- Profile & cover image updates, editable bio and info  
- Profession-based post creation  
- Like, comment, follow, message & schedule posts  
- Real-time notifications (likes, comments, follows)  
- Profession validation quiz with AI-based evaluation  
- Apply for profession change or unblock via community  

### 🧑‍💼 Admin
- Manage all users and posts  
- Handle profession and unblock requests  
- Send user notifications via email  
- Create or schedule announcements  

---

## 🛠️ Tech Stack
- **Frontend & Backend:** Next.js, React, Tailwind CSS, Framer Motion   
- **Auth:** NextAuth, Bcrypt  
- **AI:** Google Gemini, OpenAI API  
- **Others:** TanStack Query, Recharts, Nodemailer, SweetAlert2  

---

## 📦 Packages
`@tanstack/react-query`, `bcrypt`, `next-auth`, `nodemailer`, `openai`, `react-toastify`, `sweetalert2`, `recharts`, `lucide-react`, `framer-motion`

---

## ⚡ Getting Started
```bash
# Clone repo
git clone https://github.com/its-MAHADi/synchro-blog.git

# Install dependencies
npm install

# Run development server
npm run dev
