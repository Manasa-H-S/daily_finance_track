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
    <div className="w-full">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

          <div className="min-w-0 sm:min-w-[180px]">
            <h1 className="text-4xl md:text-5xl font-bold italic leading-none text-gray-800">
              {month}
            </h1>

            <p className="text-gray-500 text-base md:text-lg mt-1">
              Finance Tracker
            </p>
          </div>

          {/* Income + Expense */}
          <div className="grid grid-cols-2 gap-3">

            {/* Income */}
            <div
              onClick={openIncomeModal}
              className="
                bg-[#fff0b8]
                w-full
                sm:w-[150px]
                md:w-[160px]
                px-4
                py-3
                rounded-2xl
                shadow-sm
                cursor-pointer
                hover:shadow-md
                transition
              "
            >
              <p className="text-xs md:text-sm text-gray-500">
                Income
              </p>

              <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-1 whitespace-nowrap">
                ₹ {Number(income || 0).toLocaleString()}
              </h2>
            </div>

            {/* Expense */}
            <div
              className="
                bg-[#ffd6e0]
                w-full
                sm:w-[150px]
                md:w-[160px]
                px-4
                py-3
                rounded-2xl
                shadow-sm
              "
            >
              <p className="text-xs md:text-sm text-gray-500">
                Expense
              </p>

              <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-1 whitespace-nowrap">
                ₹ {Number(spent || 0).toLocaleString()}
              </h2>
            </div>

          </div>
        </div>

        {/* ================= RIGHT BUTTONS ================= */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-4
            xl:flex
            xl:items-center
            gap-2
            w-full
            xl:w-auto
          "
        >

          {/* Expense List */}
          <button
            onClick={openExpenseList}
            className="
              h-10
              px-3
              bg-[#c7d2fe]
              hover:bg-[#b6c4fb]
              rounded-xl
              shadow-md
              text-gray-700
              text-xs
              sm:text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-1.5
              whitespace-nowrap
              transition
            "
          >
            <FaEye className="text-xs sm:text-sm" />
            <span>Expense List</span>
          </button>

          {/* Add Expense */}
          <button
            onClick={openModal}
            className="
              h-10
              px-3
              bg-pink-400
              hover:bg-pink-500
              rounded-xl
              shadow-md
              text-white
              text-xs
              sm:text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-1.5
              whitespace-nowrap
              transition
            "
          >
            <FaPlus className="text-xs sm:text-sm" />
            <span>Add Expense</span>
          </button>

          {/* AI Insights */}
          <button
            onClick={openAIInsights}
            className="
              h-10
              px-3
              bg-gradient-to-r
              from-purple-500
              to-indigo-600
              hover:from-purple-600
              hover:to-indigo-700
              rounded-xl
              shadow-md
              text-white
              text-xs
              sm:text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-1.5
              whitespace-nowrap
              transition
            "
          >
            <FaRobot className="text-xs sm:text-sm" />
            <span>AI Insights</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              h-10
              px-3
              bg-red-500
              hover:bg-red-600
              rounded-xl
              shadow-md
              text-white
              text-xs
              sm:text-sm
              font-medium
              flex
              items-center
              justify-center
              gap-1.5
              whitespace-nowrap
              transition
            "
          >
            <FaSignOutAlt className="text-xs sm:text-sm" />
            <span>Logout</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default Header;