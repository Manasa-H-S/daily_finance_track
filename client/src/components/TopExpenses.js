import React from 'react';

function TopExpenses({ expenses }) {
  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="bg-[#eefaf0] rounded-3xl p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5">
        Top 5 Expenses
      </h2>

      <div className="space-y-4">
        {topExpenses.map((expense, index) => (
          <div
            key={expense.id}
            className="bg-white rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {index + 1}. {expense.title}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {expense.category}
              </p>
            </div>

            <p className="font-bold text-[#6c63ff] text-lg">
              ₹ {expense.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopExpenses;