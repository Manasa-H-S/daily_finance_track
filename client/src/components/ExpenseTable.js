import React from 'react';

const weekColors = [
  'bg-[#dbeafe]',
  'bg-[#ffe4e6]',
  'bg-[#dcfce7]',
  'bg-[#fef3c7]',
  'bg-[#ede9fe]',
];

function ExpenseTable({ expenses, expenseTypes }) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const getExpense = (type, day) => {
    const expense = expenses.find(
      (item) =>
        item.title === type &&
        new Date(item.date).getDate() === day
    );

    return expense ? `₹${expense.amount}` : '-';
  };

  return (
    <div className="bg-[#fffdfd] rounded-3xl p-4 shadow-sm">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-700 mb-3">
        Monthly Expense Table
      </h2>

      {/* Fixed height container so it fits in one screen */}
      <div className="h-[540px] overflow-auto rounded-2xl border border-gray-100">
        <table className="border-collapse min-w-[1200px] w-full text-center text-xs">
          {/* Header */}
          <thead className="sticky top-0 z-20">
            <tr>
              <th className="sticky left-0 z-30 bg-[#c7d2fe] px-3 py-2 text-gray-700 min-w-[170px] text-left font-semibold">
                Expense Type
              </th>

              {days.map((day) => {
                const weekIndex = Math.floor((day - 1) / 7);

                return (
                  <th
                    key={day}
                    className={`${weekColors[weekIndex]} px-2 py-2 text-gray-700 font-medium min-w-[55px]`}
                  >
                    {day}
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {expenseTypes.map((type) => (
              <tr
                key={type}
                className="border-b border-gray-100"
              >
                {/* Sticky first column */}
                <td className="sticky left-0 z-10 bg-[#fef9c3] text-left px-3 py-2 font-medium text-gray-700">
                  {type}
                </td>

                {days.map((day) => {
                  const weekIndex = Math.floor((day - 1) / 7);

                  return (
                    <td
                      key={day}
                      className={`${weekColors[weekIndex]} px-2 py-2 text-gray-700`}
                    >
                      {getExpense(type, day)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;