import React from "react";

function TopFiveExpenses({ expenses }) {
  return (
    <div className="bg-[#fff7f7] rounded-3xl shadow-sm p-5">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Top 5 Expenses
      </h2>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">
          No expenses this month
        </p>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense, index) => (
            <div
              key={expense.title}
              className="grid grid-cols-[50px_1fr_120px] items-center border-b border-gray-200 pb-3"
            >
              {/* Rank */}
              <span className="font-semibold text-gray-600 text-center">
                {index + 1}.
              </span>

              {/* Expense Type */}
              <span className="font-medium text-gray-700">
                {expense.title}
              </span>

              {/* Amount */}
              <span className="font-bold text-red-500 text-right">
                ₹ {expense.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopFiveExpenses;