// src/components/Header.js

import React from 'react';
import { FaPlus, FaEye } from 'react-icons/fa';

function Header({
  month,
  income,
  spent,
  openModal,
  openExpenseList,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      {/* Left Section */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-1">
        {/* Month + Title */}
        <div className="min-w-[160px]">
          <h1 className="text-4xl md:text-5xl font-bold italic leading-none text-gray-800">
            {month}
          </h1>

          <p className="text-gray-500 text-lg mt-1 leading-tight">
            Finance Tracker
          </p>
        </div>

        {/* Income + Expense Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
          {/* Income Card */}
          <div className="bg-[#fff0b8] px-5 py-3 rounded-2xl shadow-sm min-w-[180px]">
            <p className="text-sm text-gray-500">
              Income
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              ₹ {income.toLocaleString()}
            </h2>
          </div>

          {/* Expense Card */}
          <div className="bg-[#ffd6e0] px-5 py-3 rounded-2xl shadow-sm min-w-[180px]">
            <p className="text-sm text-gray-500">
              Expense
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
              ₹ {spent.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* Right Section - Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto lg:min-w-fit">
        {/* Expense List Button */}
        <button
          onClick={openExpenseList}
          className="bg-[#c7d2fe] hover:bg-[#b6c4fb] text-gray-700 px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 font-medium transition"
        >
          <FaEye className="text-sm" />
          Expense List
        </button>

        {/* Add Expense Button */}
        <button
          onClick={openModal}
          className="bg-[#f8b4c5] hover:bg-[#f59ab2] text-white px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 font-medium transition"
        >
          <FaPlus className="text-sm" />
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default Header;