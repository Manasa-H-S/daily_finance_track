const express = require('express');

const router = express.Router();

const authMiddleware =
  require('../middleware/authMiddleware');

const {
  getIncome,
  updateSalary,
  addIncome,
} = require('../controllers/incomeController');

router.use(authMiddleware);

router.get('/', getIncome);

router.put('/salary', updateSalary);

router.post('/', addIncome);

module.exports = router;