import React from "react";

function TopFiveExpenses({ expenses }) {

  return (

    <div className="bg-[#fff7f7] rounded-3xl shadow-sm p-5">

      <h2 className="text-2xl font-semibold text-center mb-5">
        Top 5 Expenses
      </h2>

      <div className="space-y-3">

        {expenses.length === 0 ? (

          <p>No expenses.</p>

        ) : (

          expenses.map((expense, index) => (

            <div
              key={expense.id}
              className="flex items-center justify-center gap-[180px] py-1 border-b border-gray-100"
            >

              <span>
                {index + 1}. {expense.title}
              </span>

              <span className="font-bold text-red-500">
                ₹ {expense.amount}
              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default TopFiveExpenses;