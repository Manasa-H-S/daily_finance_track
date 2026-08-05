// src/components/Header.js

import React from "react";
import {
  FaPlus,
  FaEye,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

function Header({
  month,
  income,
  spent,
  openModal,
  openExpenseList,
  openIncomeModal,
  openAIInsights,
  logout,
}) {
  return (
    <div className="flex items-center justify-between gap-6">

      {/* Left Side */}
      <div className="flex items-center gap-6">

        {/* Month */}
        <div className="w-[220px]">
          <h1 className="text-6xl font-bold italic leading-none text-gray-800">
            {month}
          </h1>

          <p className="text-gray-500 text-xl mt-2">
            Finance Tracker
          </p>
        </div>

        {/* Income */}
        <div
          onClick={openIncomeModal}
          className="bg-[#fff0b8] w-[170px] px-5 py-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">
            Income
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            ₹ {income.toLocaleString()}
          </h2>
        </div>

        {/* Expense */}
        <div className="bg-[#ffd6e0] w-[170px] px-5 py-4 rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">
            Expense
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            ₹ {spent.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Expense List */}
        <button
          onClick={openExpenseList}
          className="h-11 px-4 bg-[#c7d2fe] hover:bg-[#b6c4fb]
          rounded-xl shadow-md text-gray-700
          text-sm font-medium flex items-center gap-2 transition"
        >
          <FaEye />
          Expense List
        </button>

        {/* Add Expense */}
        <button
          onClick={openModal}
          className="h-11 px-4 bg-pink-400 hover:bg-pink-500
          rounded-xl shadow-md text-white
          text-sm font-medium flex items-center gap-2 transition"
        >
          <FaPlus />
          Add Expense
        </button>

        {/* AI */}
        <button
          onClick={openAIInsights}
          className="h-11 px-4 bg-gradient-to-r
          from-purple-500 to-indigo-600
          hover:from-purple-600 hover:to-indigo-700
          rounded-xl shadow-md text-white
          text-sm font-medium flex items-center gap-2 transition"
        >
          <FaRobot />
          AI Insights
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="h-11 px-4 bg-red-500 hover:bg-red-600
          rounded-xl shadow-md text-white
          text-sm font-medium flex items-center gap-2 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Header;