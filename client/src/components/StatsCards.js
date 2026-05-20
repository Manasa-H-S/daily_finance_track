import React from 'react';

function StatsCards({ income, spent }) {
  return (
    <div className="space-y-3">

      <div className="bg-[#fff0b8] rounded-2xl p-4 shadow-sm">
        <p className="text-sm text-gray-600">
          Monthly Income
        </p>

        <h2 className="text-2xl font-bold mt-1 text-gray-800">
          ₹ {income.toLocaleString()}
        </h2>
      </div>

      <div className="bg-[#ffd6e0] rounded-2xl p-4 shadow-sm">
        <p className="text-sm text-gray-600">
          Monthly Expense
        </p>

        <h2 className="text-2xl font-bold mt-1 text-gray-800">
          ₹ {spent.toLocaleString()}
        </h2>
      </div>
    </div>
  );
}

export default StatsCards;