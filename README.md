<div align="center">

# 🤖 CareerAgent AI
### *The AI Brain Behind Your Next Big Career Move*

<p>An intelligent, agentic career coaching platform that analyzes your profile, closes your skill gaps, simulates real interviews, and builds your personalized path to top-tier companies — all powered by cutting-edge LLMs.</p>

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

<br/>

![GitHub stars](https://img.shields.io/github/stars/Mayank10123/MENTORSHIPP?style=social)&nbsp;
![GitHub forks](https://img.shields.io/github/forks/Mayank10123/MENTORSHIPP?style=social)&nbsp;
![License](https://img.shields.io/badge/license-MIT-blue.svg)

<br/>

[**🚀 Live Demo**](https://mentorshippp.vercel.app/) &nbsp;·&nbsp; [**🐛 Report Bug**](https://github.com/Mayank10123/MENTORSHIPP/issues) &nbsp;·&nbsp; [**✨ Request Feature**](https://github.com/Mayank10123/MENTORSHIPP/issues)

</div>

---

## 🧠 What is CareerAgent AI?

Most people treat job hunting like a lottery. **CareerAgent AI** treats it like engineering.

This platform deploys a suite of specialized AI agents that work together to evaluate where you are, map where you need to go, and train you to get there — all in real time. Whether you're targeting Google, cracking DSA rounds, or rewriting your resume for ATS systems, CareerAgent AI gives you an unfair advantage.

**Built for:**
- 🚀 Engineers targeting FAANG & Tier-1 companies
- 🎓 Graduates entering a brutally competitive market
- 🔄 Professionals making a strategic career switch
- 💼 Anyone serious about owning their career trajectory

---

## 📸 Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="./screenshots/login.png" width="100%"/><br/><br/>
      <b>🔐 Executive Login Portal</b><br/>
      <sub>Secure access via Google SSO or email authentication</sub>
    </td>
    <td align="center" width="50%">
      <img src="./screenshots/signup.png" width="100%"/><br/><br/>
      <b>🚀 Onboarding</b><br/>
      <sub>Join the network — deploy your personal AI intelligence suite</sub>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="./screenshots/dashboard.png" width="100%"/><br/><br/>
      <b>📊 Executive Intelligence Console</b><br/>
      <sub>Placement probability · Skill gap heatmap · Company fit scores · AI brain status · XP progression</sub>
    </td>
  </tr>
</table>

---

## ✨ Core Features

| Feature | What it does |
|---|---|
| 🧠 **Intelligent Profile Analysis** | Evaluates your skills, projects & experience. Gives you a career score with precise improvement actions. |
| 🗺️ **Adaptive Career Roadmaps** | Builds a week-by-week learning plan based on your target role, current level, and timeline. |
| 🎤 **Mock Interview Studio** | Simulates HR, DSA, and System Design rounds with real-time AI feedback and scoring. |
| 📊 **Progress & Analytics** | Tracks XP, streaks, tasks completed, and skill growth across every session. |
| 🤝 **AI Mentor Chat** | Your always-on career advisor — context-aware, role-specific, and brutally honest. |
| 📄 **Resume Lab** | Scans your resume for ATS compatibility, keyword gaps, and rewrites weak sections. |
| 🏆 **Gamification Engine** | Earn XP, unlock badges, and level up from Junior → Senior → Director tier. |
| 💡 **Company Intelligence** | Real fit scores for Google, AWS, Netflix & more — with role-specific hiring insights. |

---

## 🏗️ Architecture

Three microservices. One unified career intelligence system.
┌──────────────────────────────────────────────┐
│               CLIENT  (Next.js 14)            │
│      React · Tailwind CSS · Firebase Auth    │
│  Dashboard · Interview Studio · Resume Lab   │
└───────────────────────┬──────────────────────┘
│  REST API
┌───────────────────────▼──────────────────────┐
│          SERVER  (Node.js + Express)           │
│       MongoDB · JWT Auth · Middleware        │
└───────────────────────┬──────────────────────┘
│  Internal API
┌───────────────────────▼──────────────────────┐
│         AI SERVICE  (Python + FastAPI)         │
│  Profile Agent · Interview Agent · Planner   │
│     Resume Evaluator · Groq LLM (LLaMA)      │
└──────────────────────────────────────────────┘

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | Next.js 14, React, Tailwind CSS |
| **Backend** | Node.js, Express.js, MongoDB |
| **AI Service** | Python, FastAPI, Groq (LLaMA 3) |
| **Auth** | Firebase Authentication |
| **Deployment** | Vercel (frontend) + Render (backend & AI) |

---

## ⚡ Quick Start

> **Prerequisites:** Python 3.8+, Node.js 18+, MongoDB, Firebase project, Groq API key

```bash
# Clone the repo
git clone https://github.com/Mayank10123/MENTORSHIPP.git
cd MENTORSHIPP

# Start AI Service
cd ai_service
pip install -r requirements.txt
python main.py                    # → http://localhost:8000

# Start Backend
cd ../server
npm install && npm run dev        # → http://localhost:5000

# Start Frontend
cd ../client
npm install && npm run dev        # → http://localhost:3000
```

> Set up your `.env` files before running. See [`ENV_VARS.md`](./ENV_VARS.md) for all required variables.

---

## 📚 Documentation

| File | Description |
|---|---|
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Full production deployment guide (Render + Vercel) |
| [`ENV_VARS.md`](./ENV_VARS.md) | All environment variables explained |
| [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) | Common errors and how to fix them |
| [`RENDER_CHECKLIST.md`](./RENDER_CHECKLIST.md) | Pre-deploy checklist |

---

## 🤝 Contributing

We welcome contributions from the community — especially GSSoC contributors! 🎉

1. Fork the repository
2. Create your branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request against `main`

Please keep PRs focused and well-described.

---

<div align="center">

Built with ❤️ by [**Mayank Mishra**](https://github.com/Mayank10123)

[🌐 mentorshippp.vercel.app](https://mentorshippp.vercel.app/)

**⭐ If this project helped you, give it a star — it means a lot!**

</div>