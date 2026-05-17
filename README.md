# AI Career Mentor

An intelligent career coaching platform powered by advanced AI agents, designed to guide professionals through comprehensive career development, interview preparation, and skill assessment.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)
![AI Powered](https://img.shields.io/badge/AI-Powered-blueviolet?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red?style=for-the-badge)

---
## Live Demo

[Visit Live Application]https://mentorshippp.vercel.app/

---

# 📸 Dashboard Preview

![Dashboard](assets/dashboard.png)

---

## Overview

AI Career Mentor combines machine learning, personalized coaching, and interactive features to create an adaptive learning experience. The platform intelligently evaluates your profile, creates customized roadmaps, conducts mock interviews, and provides real-time mentorship.
---

## Key Features

- **Intelligent Profile Analysis** - AI-powered assessment of skills, experience, and career goals
- **Adaptive Roadmaps** - Personalized career development paths based on your profile and aspirations
- **Mock Interview Studio** - Practice interviews with AI evaluation and feedback
- **Career Intelligence** - Company insights and role-specific recommendations
- **Smart Resume Lab** - Resume analysis and optimization suggestions
- **Gamification Elements** - Engagement features to motivate progress
- **Real-Time Mentorship** - Chat interface with AI mentor for guidance
- **Progress Tracking** - Comprehensive analytics and achievement monitoring
---
## System Architecture

![System Architecture](assets/architecture-diagram.png)

---

## Workflow Diagram

![Workflow Diagram](assets/workflow-diagram.png)

---
## Architecture

**Backend (ai_service/)**
- Python-based service with specialized AI agents
- Mentor Agent: Provides guidance and explanations
- Evaluator Agent: Assesses user performance and skills
- Planner Agent: Creates personalized development roadmaps
- LLM Integration: Advanced language models for intelligent responses

**Frontend (client/)**
- Next.js React application
- Responsive design with Tailwind CSS
- Features: Interview prep, profile dashboard, roadmaps, gamification
- Firebase authentication integration

**Server (server/)**
- Express.js backend API
- MongoDB integration for user and progress data
- RESTful endpoints for analysis and user management

---

## Project Structure

```bash
project-root/
│
├── ai_service/              # AI-powered services and agents
├── client/                  # Frontend application
├── server/                  # Backend APIs and business logic
├── assets/                  # README images and diagrams
│
├── README.md
├── DEPLOYMENT.md
├── ENV_VARS.md
├── TROUBLESHOOTING.md
└── LICENSE
```

---

## Getting Started

1. **Backend Setup**
   ```bash
   cd ai_service
   pip install -r requirements.txt
   python main.py
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Server Setup**
   ```bash
   cd server
   npm install
   npm start
   ```

## Environment Variables

Refer to:

- [ENV_VARS.md](ENV_VARS.md)

for complete environment configuration details.

---

## Technology Stack

## Frontend
- React.js
- Next.js
- Tailwind CSS

## Backend
- Node.js
- Express.js

## AI Services
- Python
- LangChain
- LLM Frameworks

## Database & Authentication
- MongoDB
- Firebase

## Deployment
- Vercel
- Render

---

## Additional Documentation

- [Deployment Guide](DEPLOYMENT.md)
- [Environment Variables](ENV_VARS.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

## License

MIT License - see LICENSE file for details
