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
import { getIncome } from './services/incomeService';
import IncomeModal from './components/IncomeModal';

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
  // const totalIncome = 103000;
  const [income, setIncome] = useState(0);

  const [showIncomeModal, setShowIncomeModal] =
    useState(false);

  const currentDate = new Date();

  const currentMonthName =
    new Date().toLocaleString('default', {
      month: 'long',
    });

  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const logout = () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    );

    if (!confirmed) return;

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.reload();
  };

  // Load expenses from backend
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const expenseData =
          await fetchExpenses();

        setExpenses(expenseData);

        const incomeData =
          await getIncome();

        setIncome(
          incomeData.totalIncome || 0
        );
      } catch (error) {
        console.error(
          'Load data error:',
          error
        );

        if (
          error.message === 'No token provided' ||
          error.message === 'Invalid token'
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.reload();
          return;
        }

        alert('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

  // Total spent
  // const totalSpent = expenses.reduce(
  //   (total, expense) =>
  //     total + Number(expense.amount || 0),
  //   0
  // );

  const totalSpent = currentMonthExpenses.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
  );

  // Daily totals (1-30)
  const dailyTotals = useMemo(() => {
    const totals = Array(31).fill(0);

    currentMonthExpenses.forEach((expense) => {
      const day = new Date(
        expense.date
      ).getDate();

      if (day >= 1 && day <= 31) {
        totals[day - 1] += Number(
          expense.amount || 0
        );
      }
    });

    return totals;
  }, [currentMonthExpenses]);

  // Weekly totals
  const weeklyTotals = useMemo(() => {
    const weeks = [0, 0, 0, 0];

    currentMonthExpenses.forEach((expense) => {
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
  }, [currentMonthExpenses]);

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
          month={currentMonthName}
          income={income}
          spent={totalSpent}
          openModal={() =>
            setOpenModal(true)
          }
          openExpenseList={() =>
            setShowExpenseList(true)
          }
          openIncomeModal={() =>
            setShowIncomeModal(true)
          }
          logout={logout}
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
            expenses={currentMonthExpenses}
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
          expenses={currentMonthExpenses}
          expenseTypes={expenseTypes}
          onClose={() =>
            setShowExpenseList(false)
          }
          onDelete={deleteExpense}
          onUpdate={updateExpense}
        />
      )}
      {showIncomeModal && (
        <IncomeModal
          onClose={() =>
            setShowIncomeModal(false)
          }
          onIncomeUpdated={() => {
            getIncome().then((data) => {
              setIncome(
                data.totalIncome || 0
              );
            });
          }}
        />
      )}
    </div>
  );
}

export default App;