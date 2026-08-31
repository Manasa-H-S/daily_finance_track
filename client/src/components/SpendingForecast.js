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
                        className={`font-bold ${remainingBudget >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                    >
                        ₹ {Math.round(remainingBudget).toLocaleString()}
                    </span>
                </div>

                {/* <div className="mt-4">

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

                </div> */}

                <div className="mt-5">
                    {remainingBudget < 0 ? (
                        currentExpense > income ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                                <p className="font-semibold">🚨 Alert: Oops! You exceeded your budget this month.</p>
                                <p className="mt-1 text-sm">
                                    Your expenses are higher than your available income. Consider
                                    reviewing your spending to get back on track.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-700">
                                <p className="font-semibold">⚠️ Warning: You may exceed your budget this month.</p>
                                <p className="mt-1 text-sm">
                                    Your remaining budget is currently negative. Keep an eye on your
                                    upcoming expenses.
                                </p>
                            </div>
                        )
                    ) : (
                        (() => {
                            const remainingPercentage = (remainingBudget / income) * 100;

                            if (remainingPercentage >= 12) {
                                return (
                                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
                                        <p className="font-semibold">
                                            🎉 Great! You are likely to stay within your budget.
                                        </p>
                                        <p className="mt-1 text-sm">
                                            You still have {remainingPercentage.toFixed(1)}% of your income
                                            available, so your spending is looking healthy.
                                        </p>
                                    </div>
                                );
                            }

                            if (remainingPercentage >= 1 && remainingPercentage < 20) {
                                return (
                                    <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-700">
                                        <p className="font-semibold">
                                            ⚠️ Warning: Your remaining budget is getting low.
                                        </p>
                                        <p className="mt-1 text-sm">
                                            You have only {remainingPercentage.toFixed(1)}% of your income
                                            remaining. Your expenses are approaching your budget limit.
                                        </p>
                                    </div>
                                );
                            }

                            return (
                                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-700">
                                    <p className="font-semibold">
                                        ⚠️ Keep an eye on your spending.
                                    </p>
                                    <p className="mt-1 text-sm">
                                        Your remaining budget is very low. Consider reducing unnecessary
                                        expenses for the rest of the month.
                                    </p>
                                </div>
                            );
                        })()
                    )}
                </div>

                {/* <div className="mt-5">

                    {remainingBudget >= 12000 ? (

                        <div className="text-green-600 font-semibold">

                            ✅ You are likely to stay within your budget.

                        </div>

                    ) : (

                        <div className="text-red-600 font-semibold">

                            ⚠ You may exceed your budget this month.

                        </div>

                    )}

                </div> */}

            </div>

        </div>
    );
}

export default SpendingForecast;