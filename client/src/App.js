// src/App.js

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getExpenses as fetchExpenses,
  addExpense as createExpense,
  updateExpense as updateExpenseApi,
  deleteExpense as deleteExpenseApi,
} from './services/expenseService';

import Header from './components/Header';
import DailyBarChart from './components/charts/DailyBarChart';
import WeeklyBarChart from './components/charts/WeeklyBarChart';
import MonthlyLineChart from './components/charts/MonthlyLineChart';
import ExpenseTable from './components/ExpenseTable';
import ExpenseForm from './components/ExpenseForm';
import ExpenseListModal from './components/ExpenseListModal';
import LoginPage from './pages/loginPage';

export const expenseTypes = [
  'Groceries',
  'Petrol',
  'Rent',
  'Current Bill',
  'Chats',
  'Hotel',
  'Gift',
  'Accessories',
  'Dress',
  'Drink',
  'Transport',
  'Veg & Fruits',
  'Parlour',
  'Home Decores',
  'Others',
];

function App() {
  // Read token (not a hook)
  const token = localStorage.getItem('token');

  // State hooks
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(
    !!token
  );
  const [openModal, setOpenModal] =
    useState(false);
  const [showExpenseList, setShowExpenseList] =
    useState(false);

  // Static data
  const totalIncome = 50000;

  const currentMonth =
    new Date().toLocaleString('default', {
      month: 'long',
    });

  // Load expenses from backend
  useEffect(() => {
    // If user is not logged in, no need to load
    if (!token) {
      setLoading(false);
      return;
    }

    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        console.error(
          'Load expenses error:',
          error
        );

        // If token is invalid, logout
        if (
          error.message === 'No token provided' ||
          error.message === 'Invalid token'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.reload();
          return;
        }

        alert('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, [token]);

  // Total spent
  const totalSpent = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  // Daily totals (1-30)
  const dailyTotals = useMemo(() => {
    const totals = Array(30).fill(0);

    expenses.forEach((expense) => {
      const day = new Date(
        expense.date
      ).getDate();

      if (day >= 1 && day <= 30) {
        totals[day - 1] += Number(
          expense.amount || 0
        );
      }
    });

    return totals;
  }, [expenses]);

  // Weekly totals
  const weeklyTotals = useMemo(() => {
    const weeks = [0, 0, 0, 0];

    expenses.forEach((expense) => {
      const day = new Date(
        expense.date
      ).getDate();

      const amount = Number(
        expense.amount || 0
      );

      if (day >= 1 && day <= 7) {
        weeks[0] += amount;
      } else if (day <= 14) {
        weeks[1] += amount;
      } else if (day <= 21) {
        weeks[2] += amount;
      } else {
        weeks[3] += amount;
      }
    });

    return weeks;
  }, [expenses]);

  // Monthly chart data
  const monthlyData = [
    10000,
    12000,
    18000,
    16000,
    22000,
    totalSpent,
  ];

  // Add expense
  const addExpense = async (expense) => {
    try {
      const savedExpense =
        await createExpense(expense);

      setExpenses((prev) => [
        ...prev,
        savedExpense,
      ]);
    } catch (error) {
      console.error(
        'Add expense error:',
        error
      );
      alert(
        error.message ||
          'Failed to add expense'
      );
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this expense?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteExpenseApi(id);

      setExpenses((prev) =>
        prev.filter(
          (expense) => expense.id !== id
        )
      );
    } catch (error) {
      console.error(
        'Delete expense error:',
        error
      );
      alert(
        error.message ||
          'Failed to delete expense'
      );
    }
  };

  // Update expense
  const updateExpense = async (
    updatedExpense
  ) => {
    try {
      await updateExpenseApi(updatedExpense);

      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === updatedExpense.id
            ? updatedExpense
            : expense
        )
      );
    } catch (error) {
      console.error(
        'Update expense error:',
        error
      );
      alert(
        error.message ||
          'Failed to update expense'
      );
    }
  };

  // Show login page if no token
  if (!token) {
    return <LoginPage />;
  }

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5ff] flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading...
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-[#f7f5ff] p-4">
      <div className="bg-[#fffdfd] rounded-[35px] p-6 shadow-lg">
        <Header
          month={currentMonth}
          income={totalIncome}
          spent={totalSpent}
          openModal={() =>
            setOpenModal(true)
          }
          openExpenseList={() =>
            setShowExpenseList(true)
          }
        />

        <div className="mt-6">
          <DailyBarChart
            data={dailyTotals}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          <WeeklyBarChart
            data={weeklyTotals}
          />
          <MonthlyLineChart
            data={monthlyData}
          />
        </div>

        <div className="mt-6">
          <ExpenseTable
            expenses={expenses}
            expenseTypes={expenseTypes}
          />
        </div>
      </div>

      {openModal && (
        <ExpenseForm
          onClose={() =>
            setOpenModal(false)
          }
          onAdd={addExpense}
          expenseTypes={expenseTypes}
        />
      )}

      {showExpenseList && (
        <ExpenseListModal
          expenses={expenses}
          expenseTypes={expenseTypes}
          onClose={() =>
            setShowExpenseList(false)
          }
          onDelete={deleteExpense}
          onUpdate={updateExpense}
        />
      )}
    </div>
  );
}

export default App;