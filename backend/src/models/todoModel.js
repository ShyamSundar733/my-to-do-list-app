// In-memory model for To-Do items
// Can easily be extended to connect to PostgreSQL, MongoDB, or Redis in DevOps pipelines

let todos = [
  {
    id: "1",
    text: "Set up Docker containers for Frontend and Backend",
    completed: true,
    priority: "high",
    category: "devops",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "2",
    text: "Create CI/CD Pipeline with GitHub Actions or Jenkins",
    completed: false,
    priority: "high",
    category: "devops",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "3",
    text: "Configure Kubernetes deployments & services",
    completed: false,
    priority: "medium",
    category: "devops",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "4",
    text: "Conduct end-to-end testing & API load test",
    completed: false,
    priority: "low",
    category: "testing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const todoModel = {
  getAll: () => todos,
  
  getById: (id) => todos.find(t => t.id === id),
  
  create: ({ text, priority = "medium", category = "general" }) => {
    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      text: text.trim(),
      completed: false,
      priority: priority.toLowerCase(),
      category: category.toLowerCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    todos.unshift(newTodo);
    return newTodo;
  },
  
  update: (id, updates) => {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    todos[index] = {
      ...todos[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return todos[index];
  },
  
  toggle: (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;
    todo.completed = !todo.completed;
    todo.updatedAt = new Date().toISOString();
    return todo;
  },
  
  delete: (id) => {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
  },
  
  clearCompleted: () => {
    const initialCount = todos.length;
    todos = todos.filter(t => !t.completed);
    return initialCount - todos.length;
  }
};

module.exports = todoModel;
