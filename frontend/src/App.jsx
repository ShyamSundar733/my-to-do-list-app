import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import TodoInput from './components/TodoInput';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [loading, setLoading] = useState(true);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('taskflow_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      localStorage.setItem('taskflow_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Fetch todos from Express Backend API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE_URL);
      if (!res.ok) throw new Error('API Response not ok');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTodos(data.data);
        setIsOnline(true);
      }
    } catch (err) {
      console.warn('Backend API connection failed, switching to local state mode:', err);
      setIsOnline(false);
      // Fallback sample data if API server is not started yet
      if (todos.length === 0) {
        setTodos([
          { id: '1', text: 'Set up Docker containers for Frontend and Backend', completed: true, priority: 'high', category: 'devops' },
          { id: '2', text: 'Create CI/CD Pipeline with GitHub Actions or Jenkins', completed: false, priority: 'high', category: 'devops' },
          { id: '3', text: 'Configure Kubernetes deployments & services', completed: false, priority: 'medium', category: 'devops' }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async (newTodo) => {
    try {
      const res = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      if (res.ok) {
        const data = await res.json();
        setTodos(prev => [data.data, ...prev]);
        setIsOnline(true);
        return;
      }
    } catch (err) {
      console.warn('API Offline - Adding locally');
      setIsOnline(false);
    }

    // Local fallback
    const localItem = {
      id: Date.now().toString(),
      ...newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [localItem, ...prev]);
  };

  // Toggle todo status
  const handleToggle = async (id) => {
    // Optimistic UI update
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

    try {
      const res = await fetch(`${API_BASE_URL}/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) setIsOnline(true);
    } catch (err) {
      setIsOnline(false);
    }
  };

  // Update todo
  const handleUpdate = async (id, updates) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) setIsOnline(true);
    } catch (err) {
      setIsOnline(false);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));

    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) setIsOnline(true);
    } catch (err) {
      setIsOnline(false);
    }
  };

  // Clear all completed
  const handleClearCompleted = async () => {
    setTodos(prev => prev.filter(t => !t.completed));

    try {
      const res = await fetch(`${API_BASE_URL}/completed/clear`, { method: 'DELETE' });
      if (res.ok) setIsOnline(true);
    } catch (err) {
      setIsOnline(false);
    }
  };

  // Filter & Search logic
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilter = 
        filter === 'all' ? true :
        filter === 'active' ? !todo.completed :
        filter === 'completed' ? todo.completed : true;

      const matchesSearch = 
        todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchQuery]);

  const hasCompleted = todos.some(t => t.completed);

  return (
    <div className="app-container">
      <Header isDark={isDark} onToggleTheme={toggleTheme} isOnline={isOnline} />
      <Stats todos={todos} />
      <TodoInput onAdd={handleAdd} />
      
      <main className="glass-card">
        <TodoFilter 
          filter={filter}
          setFilter={setFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hasCompleted={hasCompleted}
          onClearCompleted={handleClearCompleted}
        />

        {loading ? (
          <div className="empty-state">
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </main>
    </div>
  );
}
