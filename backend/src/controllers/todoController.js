const todoModel = require('../models/todoModel');

// @desc    Get all todos
// @route   GET /api/todos
const getTodos = (req, res) => {
  try {
    const todos = todoModel.getAll();
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
const getTodoById = (req, res) => {
  try {
    const todo = todoModel.getById(req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
const createTodo = (req, res) => {
  try {
    const { text, priority, category } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, error: 'Please provide task description text' });
    }

    const newTodo = todoModel.create({ text, priority, category });
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update todo
// @route   PUT /api/todos/:id
const updateTodo = (req, res) => {
  try {
    const updated = todoModel.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Toggle todo completion status
// @route   PATCH /api/todos/:id/toggle
const toggleTodo = (req, res) => {
  try {
    const toggled = todoModel.toggle(req.params.id);
    if (!toggled) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, data: toggled });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete todo
// @route   DELETE /api/todos/:id
const deleteTodo = (req, res) => {
  try {
    const deleted = todoModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Clear all completed todos
// @route   DELETE /api/todos/completed/clear
const clearCompleted = (req, res) => {
  try {
    const clearedCount = todoModel.clearCompleted();
    res.status(200).json({
      success: true,
      message: `Cleared ${clearedCount} completed tasks`,
      clearedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted
};
