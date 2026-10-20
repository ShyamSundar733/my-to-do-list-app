# ⚡ TaskFlow - DevOps Ready To-Do List Application

TaskFlow is a modern full-stack To-Do List microservices application built with **React (Frontend)** and **Node.js + Express (Backend)**, designed specifically to serve as a starter/template project for **DevOps projects** (Docker containerization, CI/CD pipelines, Kubernetes deployments, Monitoring, and Helm charts).

---

## 📁 Repository Structure

```
to-do-list/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/      # Request handlers & logic
│   │   ├── models/           # Data models (In-memory / easily pluggable DB)
│   │   ├── routes/           # Express endpoint router
│   │   └── server.js         # Entry point & express setup
│   ├── .env.example          # Environment variable template
│   ├── Dockerfile            # Multi-stage Node.js container build with HEALTHCHECK
│   └── package.json
│
├── frontend/                 # React + Vite Single Page Application
│   ├── src/
│   │   ├── components/       # Header, Stats, TodoInput, TodoItem, TodoFilter, TodoList
│   │   ├── App.jsx           # Main App & API integration state
│   │   ├── App.css           # Modern glassmorphism & layout styles
│   │   ├── index.css         # CSS design system & dark theme tokens
│   │   └── main.jsx
│   ├── .env.example          # Environment variable template
│   ├── Dockerfile            # Multi-stage build (Vite Build -> Nginx Server)
│   ├── nginx.conf            # Nginx config with reverse proxy to backend
│   └── package.json
│
├── docker-compose.yml        # Docker Compose config for full-stack deployment
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Start Backend API Server
```bash
cd backend
npm install
npm run dev
# Server starts on http://localhost:5000
```

### 2. Start Frontend React App
```bash
cd frontend
npm install
npm run dev
# Web application starts on http://localhost:3000
```

---

## 🐳 Running with Docker & Docker Compose

This application comes pre-configured with production-ready multi-stage Dockerfiles and health check probes.

```bash
# Build and spin up both containers
docker-compose up --build -d

# View container status
docker-compose ps

# View live application logs
docker-compose logs -f
```

- **Frontend Application**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/todos`
- **Health Check Endpoint**: `http://localhost:5000/health`

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Liveness & Readiness probe status for DevOps |
| `GET` | `/api/todos` | Fetch all tasks |
| `GET` | `/api/todos/:id` | Fetch task by ID |
| `POST` | `/api/todos` | Create a task `({ text, priority, category })` |
| `PUT` | `/api/todos/:id` | Update task content |
| `PATCH` | `/api/todos/:id/toggle` | Toggle task completion status |
| `DELETE` | `/api/todos/:id` | Delete task by ID |
| `DELETE` | `/api/todos/completed/clear` | Clear all completed tasks |

---

## 🛠️ DevOps Project Use Cases

1. **Docker Containerization**: Custom multi-stage builds (`node:alpine` and `nginx:alpine`).
2. **CI/CD Pipelines**: Easy target for GitHub Actions, GitLab CI, or Jenkins (Linting, Docker Build, Push to ECR/DockerHub).
3. **Kubernetes Deployment**:
   - `Deployment` and `Service` manifests for Frontend & Backend.
   - Configure `Ingress` or `Nginx Ingress Controller`.
   - Setup `LivenessProbe` and `ReadinessProbe` using `/health`.
4. **Monitoring & Logging**:
   - Collect stdout/stderr logs from Express and Nginx using Fluentd / Loki / ELK Stack.
   - Monitor container metrics using Prometheus & Grafana.

---

## 📄 License
MIT
