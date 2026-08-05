import React from "react";

function SpendingForecast({
    currentExpense,
    predictedExpense,
    income,
}) {

    const remainingBudget =
        income - predictedExpense;

    const percentage =
        income > 0
            ? ((predictedExpense / income) * 100).toFixed(1)
            : 0;

    return (
        <div className="bg-[#eef8ff] rounded-3xl shadow-sm p-5">

            <h2 className="text-2xl font-semibold text-center mb-5">
                Spending Forecast
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">
                    <span>Current Expense</span>

                    <span className="font-bold">
                        ₹ {currentExpense.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Predicted Expense</span>

                    <span className="font-bold text-red-500">
                        ₹ {Math.round(predictedExpense).toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Remaining Budget</span>

                    <span
                        className={`font-bold ${
                            remainingBudget >= 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        ₹ {Math.round(remainingBudget).toLocaleString()}
                    </span>
                </div>

                <div className="mt-4">

                    <div className="flex justify-between mb-1">

                        <span>Budget Used</span>

                        <span>{percentage}%</span>

                    </div>

                    <div className="w-full h-4 rounded-full bg-gray-200">

                        <div
                            className={`h-4 rounded-full ${
                                percentage > 90
                                    ? "bg-red-500"
                                    : percentage > 70
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            }`}
                            style={{
                                width: `${Math.min(
                                    percentage,
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                </div>

                <div className="mt-5">

                    {remainingBudget >= 0 ? (

                        <div className="text-green-600 font-semibold">

                            ✅ You are likely to stay within your budget.

                        </div>

                    ) : (

                        <div className="text-red-600 font-semibold">

                            ⚠ You may exceed your budget this month.

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default SpendingForecast;