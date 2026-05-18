const db = require('../config/db');

// GET all expenses
const getExpenses = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await db.query(
            `SELECT id, title, amount, details, date
       FROM expenses
       WHERE user_id = ?
       ORDER BY date DESC`,
            [userId]
        );

        const expenses = rows.map((row) => ({
            ...row,
            amount: Number(row.amount),
        }));

        res.json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// POST new expense
const addExpense = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            title,
            amount,
            details,
            date,
        } = req.body;

        if (!title || !amount || !date) {
            return res.status(400).json({
                message:
                    'Title, amount and date are required',
            });
        }

        const id = Date.now();

        await db.query(
            `INSERT INTO expenses
       (id, user_id, title, amount, details, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [
                id,
                userId,
                title,
                amount,
                details || '',
                date,
            ]
        );

        res.status(201).json({
            id,
            title,
            amount: Number(amount),
            details: details || '',
            date,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// PUT update expense
const updateExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const {
            title,
            amount,
            details,
        } = req.body;

        await db.query(
            `UPDATE expenses
       SET title = ?, amount = ?, details = ?
       WHERE id = ? AND user_id = ?`,
            [
                title,
                amount,
                details || '',
                id,
                userId,
            ]
        );

        res.json({
            message:
                'Expense updated successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
};

// DELETE expense
const deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        await db.query(
            'DELETE FROM expenses WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        res.json({
            message:
                'Expense deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
};

module.exports = {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
};