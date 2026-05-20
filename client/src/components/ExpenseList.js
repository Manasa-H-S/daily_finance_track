import React from 'react';

function ExpenseList({ expenses }) {
  return (
    <div className="bg-[#f2fbff] rounded-3xl p-5 shadow-sm h-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5">
        Daily Expense List
      </h2>

      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">
                {expense.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {expense.date}
              </p>
            </div>

            <div className="text-xl font-bold text-[#ff6b9d]">
              ₹ {expense.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ExpenseList;