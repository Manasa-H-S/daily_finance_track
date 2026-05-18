const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// Protect all expense routes
router.use(authMiddleware);

// GET /api/expenses
router.get('/', getExpenses);

// POST /api/expenses
router.post('/', addExpense);

// PUT /api/expenses/:id
router.put('/:id', updateExpense);

// DELETE /api/expenses/:id
router.delete('/:id', deleteExpense);

module.exports = router;