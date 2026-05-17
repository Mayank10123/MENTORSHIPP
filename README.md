<h1 align="center">🎯 AI Career Mentor</h1>

<p align="center">
  <strong>Your intelligent AI-powered career coaching companion</strong><br/>
  Interview prep · Career roadmaps · Real-time AI mentorship · Resume optimization
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/AI-Python-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/Database-MongoDB-darkgreen?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Auth-Firebase-orange?style=for-the-badge&logo=firebase" />
</p>

---

## 📖 Overview

**AI Career Mentor** is a comprehensive AI-driven platform that empowers professionals to accelerate their careers through intelligent mentoring and personalized recommendations.

The platform combines **machine learning**, **adaptive learning systems**, and **interactive career tools** to deliver:

- 🧠 **AI-powered profile analysis** — skill assessment and career evaluation
- 🗺️ **Personalized career roadmaps** — tailored learning and career paths
- 🎤 **Mock interview preparation** — interactive simulations with real-time feedback
- 📊 **Progress tracking & analytics** — performance monitoring and insights
- 🤝 **Real-time AI mentorship** — on-demand guidance and assistance
- 📄 **Resume Lab** — optimization suggestions and improvement tools
- 🏆 **Gamification** — achievement and engagement system
- 💡 **Career Intelligence** — role-specific recommendations and insights

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🧠 Intelligent Profile Analysis | AI-based skill assessment and career evaluation |
| 🗺️ Adaptive Roadmaps | Personalized learning and career paths |
| 🎤 Mock Interviews | Interactive simulations with real-time feedback |
| 📊 Progress Tracking | Analytics and performance monitoring |
| 🤝 Real-Time Mentorship | AI-powered guidance and assistance |
| 📄 Resume Lab | Resume improvement and optimization suggestions |
| 🏆 Gamification | Achievement and engagement system |
| 💡 Career Intelligence | Role-specific recommendations and insights |

---

## 🏗️ Architecture

The project follows a **multi-service architecture** for scalability and modularity, with three core services that communicate via REST APIs.

```
┌─────────────────────────────────────────────────────┐
│                    Client (Next.js)                  │
│         React · Tailwind CSS · Firebase Auth        │
└──────────────────────┬──────────────────────────────┘
                       │ REST API
┌──────────────────────▼──────────────────────────────┐
│                 Server (Node.js/Express)              │
│          REST APIs · MongoDB · Auth Middleware       │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│                 AI Service (Python)                   │
│       LLM Integrations · Career Analysis Engine     │
│       Specialized AI Agents · Roadmap Generation    │
└─────────────────────────────────────────────────────┘
```

### 🐍 Backend — `ai_service/`
- Python-based AI services and specialized agents
- LLM integrations and career analysis engine
- Personalized roadmap generation

### ⚛️ Frontend — `client/`
- Next.js React application with Tailwind CSS
- Interactive UI components and dashboard
- Interview modules and Firebase authentication

### 🖥️ Server — `server/`
- Node.js + Express backend
- REST APIs and MongoDB integration
- Authentication and user management

---

## 📁 Project Structure

```
MENTORSHIPP/
├── ai_service/         # AI agents and ML services
├── client/             # Frontend application (Next.js)
├── server/             # Backend API (Node.js/Express)
├── README.md
├── DEPLOYMENT.md
├── TROUBLESHOOTING.md
├── ENV_VARS.md
└── RENDER_CHECKLIST.md
```

---

## ⚡ Quick Start

> **Prerequisites:** Python 3.8+, Node.js 18+, MongoDB, Firebase project

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MENTORSHIPP
```

### 2. Set Up Environment Variables

Copy and fill in the required environment variables (see [`ENV_VARS.md`](./ENV_VARS.md)):

```bash
cp .env.example .env
```

### 3. Start the AI Backend

```bash
cd ai_service
pip install -r requirements.txt
python main.py
```

### 4. Start the Server

```bash
cd server
npm install
npm run dev
```

### 5. Start the Frontend

```bash
cd client
npm install
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## 📚 Documentation

| Document | Description |
|---|---|
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | Production deployment guide |
| [`ENV_VARS.md`](./ENV_VARS.md) | Environment variable reference |
| [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md) | Common issues and fixes |
| [`RENDER_CHECKLIST.md`](./RENDER_CHECKLIST.md) | Pre-deployment checklist |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.