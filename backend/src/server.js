const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Request logger middleware (useful for DevOps logs inspection)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint (essential for Docker / Kubernetes probes)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'todo-backend-api'
  });
});

// API Routes
app.use('/api/todos', todoRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 TaskFlow Backend API server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  console.log(`🏥 Health check endpoint available at http://localhost:${PORT}/health`);
});
