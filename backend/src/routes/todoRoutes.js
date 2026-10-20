const express = require('express');
const router = express.Router();
const {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted
} = require('../controllers/todoController');

router.route('/')
  .get(getTodos)
  .post(createTodo);

router.delete('/completed/clear', clearCompleted);

router.route('/:id')
  .get(getTodoById)
  .put(updateTodo)
  .delete(deleteTodo);

router.patch('/:id/toggle', toggleTodo);

module.exports = router;
