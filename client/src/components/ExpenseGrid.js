import React from 'react';

const weekColors = [
  'bg-[#dbeafe]',
  'bg-[#ffe4e6]',
  'bg-[#dcfce7]',
  'bg-[#fef3c7]',
];

function ExpenseGrid({ expenses }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-[#fcfcff] rounded-3xl p-5 shadow-sm overflow-x-auto">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5">
        Monthly Expense Tracker
      </h2>

      <div className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-15 gap-3 min-w-[900px]">

        {days.map((day) => {
          const expense = expenses.find(
            (item) => new Date(item.date).getDate() === day
          );

          const weekIndex = Math.floor((day - 1) / 7);

          return (
            <div
              key={day}
              className={`${weekColors[weekIndex]} rounded-2xl p-3 min-h-[100px] flex flex-col justify-between shadow-sm`}
            >
              <div className="text-sm font-bold text-gray-700">
                {day}
              </div>

              {expense ? (
                <div>
                  <p className="text-xs font-medium text-gray-700 truncate">
                    {expense.title}
                  </p>

                  <p className="text-sm font-bold text-[#ff5d8f] mt-1">
                    ₹ {expense.amount}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-400">
                  No Expense
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpenseGrid;