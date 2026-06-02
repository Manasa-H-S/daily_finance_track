const db = require('../config/db');

const getIncome = async (req, res) => {
  try {
    const userId = req.user.id;

    const currentDate = new Date();

    const month =
      currentDate.getMonth() + 1;

    const year =
      currentDate.getFullYear();

    const [[user]] = await db.query(
      `SELECT monthly_income
       FROM users
       WHERE id = ?`,
      [userId]
    );

    const [[bonus]] = await db.query(
      `SELECT
       COALESCE(SUM(amount),0) AS total
       FROM incomes
       WHERE user_id = ?
       AND MONTH(date)=?
       AND YEAR(date)=?`,
      [userId, month, year]
    );

    res.json({
      baseIncome:
        Number(user.monthly_income || 0),
      extraIncome:
        Number(bonus.total || 0),
      totalIncome:
        Number(user.monthly_income || 0) +
        Number(bonus.total || 0),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

const updateSalary = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const { amount } = req.body;

    await db.query(
      `UPDATE users
       SET monthly_income = ?
       WHERE id = ?`,
      [amount, userId]
    );

    res.json({
      message:
        'Monthly income updated',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

const addIncome = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const {
      amount,
      details,
      date,
    } = req.body;

    const id = Date.now();

    await db.query(
      `INSERT INTO incomes
      (id,user_id,amount,details,date)
      VALUES(?,?,?,?,?)`,
      [
        id,
        userId,
        amount,
        details,
        date,
      ]
    );

    res.status(201).json({
      message:
        'Income added successfully',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports = {
  getIncome,
  updateSalary,
  addIncome,
};