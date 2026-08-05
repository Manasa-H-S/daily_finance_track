import React from "react";
import { FaTimes } from "react-icons/fa";

import SpendingForecast from "./SpendingForecast";
import { getAIAdvice } from "../utils/aiAdvisor";
import { getOverspendingAlerts } from "../utils/overspendingAlerts";

function AIInsightsModal({
    expenses,
    income,
    onClose,
}) {

    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const previousMonth =
        currentMonth === 0
            ? 11
            : currentMonth - 1;

    const previousYear =
        currentMonth === 0
            ? currentYear - 1
            : currentYear;

    const currentExpenses = expenses.filter((expense) => {
        const date = new Date(expense.date);
        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
    });

    const previousExpenses = expenses.filter((expense) => {

        const date = new Date(expense.date);

        return (
            date.getMonth() === previousMonth &&
            date.getFullYear() === previousYear
        );
    });

    const currentTotal =
        currentExpenses.reduce(
            (acc, item) => acc + Number(item.amount),
            0
        );

    const previousTotal =
        previousExpenses.reduce(
            (acc, item) => acc + Number(item.amount),
            0
        );

    const saving = income - currentTotal;

    //const today = new Date();

    const currentDay = today.getDate();

    const daysInMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    const averagePerDay =
        currentDay > 0
            ? currentTotal / currentDay
            : 0;

    const predictedExpense =
        averagePerDay * daysInMonth;

    let percentage = 0;

    if (previousTotal > 0) {
        percentage = ((currentTotal - previousTotal) / previousTotal) * 100;
    }

    let score = 100;

    const spentPercentage = (currentTotal / income) * 100;

    if (spentPercentage > 90) {
        score = 20;
    }
    else if (spentPercentage > 80) {
        score = 40;
    }
    else if (spentPercentage > 70) {
        score = 60;
    }
    else if (spentPercentage > 50) {
        score = 80;
    }

    const categoryTotals = {};

    currentExpenses.forEach((expense) => {
        categoryTotals[expense.title] =
            (categoryTotals[expense.title] || 0)
            +
            Number(expense.amount);
    });

    const highestCategory =
        Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])[0];

    const aiAdvice = getAIAdvice(
        highestCategory,
        saving,
        income
    );

    const alerts =
        getOverspendingAlerts(expenses);

    let advisor = "Excellent financial management.";
    if (spentPercentage > 80) {
        advisor = "Your spending is very high this month. Try reducing unnecessary expenses.";
    }
    else if (spentPercentage > 60) {
        advisor = "Your expenses are moderate. You can improve your savings.";
    }
    else {
        advisor = "Great! Your savings are healthy this month.";
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-[95%] max-w-7xl h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-2xl font-bold">
                        🤖 AI Insights
                    </h1>

                    <button onClick={onClose}>
                        <FaTimes size={25} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="rounded-3xl bg-blue-50 p-5">
                            <h2 className="font-bold text-xl">
                                Spending Comparison
                            </h2>
                            <p className="mt-4">
                                Current
                                ₹{currentTotal}
                            </p>
                            <p>
                                Previous
                                ₹{previousTotal}
                            </p>
                            <p className="font-bold mt-4">
                                {percentage > 0 ? "+" : "-"}
                                {Math.abs(percentage).toFixed(1)}%
                            </p>
                        </div>
                        <div className="rounded-3xl bg-green-50 p-5">
                            <h2 className="font-bold text-xl">
                                Spending Pattern
                            </h2>
                            <p className="mt-4">
                                Highest Category
                            </p>
                            <h3 className="text-2xl font-bold">
                                {highestCategory?.[0] || "-"}
                            </h3>
                            <p>
                                ₹{highestCategory?.[1] || 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-yellow-50 p-5">
                            <h2 className="font-bold text-xl">
                                Health Score
                            </h2>
                            <h1 className="text-6xl mt-8 font-bold text-green-600">
                                {score}/100
                            </h1>
                        </div>
                        <SpendingForecast
                            currentExpense={currentTotal}
                            predictedExpense={predictedExpense}
                            income={income}
                        />
                        <div className="rounded-3xl bg-purple-50 p-5">
                            <h2 className="font-bold text-xl mb-4">
                                AI Financial Advisor
                            </h2>
                            <ul className="space-y-3">
                                {aiAdvice.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex gap-3"
                                    >
                                        <span>💡</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-3xl bg-red-50 p-5">
                            <h2 className="font-bold text-xl mb-4">
                                🚨 Overspending Alerts
                            </h2>
                            {alerts.length === 0 ? (
                                <p className="text-green-600">
                                    ✅ No unusual spending detected this month.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {alerts.map((alert) => (
                                        <div
                                            key={alert.type}
                                            className="border-b pb-2"
                                        >
                                            <p className="font-semibold text-red-600">
                                                {alert.type}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Average :
                                                {" "}
                                                ₹{alert.average.toFixed(0)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Current :
                                                {" "}
                                                ₹{alert.current}
                                            </p>
                                            <p className="text-red-500 font-medium">
                                                {alert.percentage}% above your average
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AIInsightsModal;