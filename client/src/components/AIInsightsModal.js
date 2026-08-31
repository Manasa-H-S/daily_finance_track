// import React from "react";
// import { FaTimes } from "react-icons/fa";

// import SpendingForecast from "./SpendingForecast";
// import { getAIAdvice } from "../utils/aiAdvisor";
// import { getOverspendingAlerts } from "../utils/overspendingAlerts";

// function AIInsightsModal({
//     expenses,
//     income,
//     onClose,
// }) {

//     const today = new Date();

//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();

//     const previousMonth =
//         currentMonth === 0
//             ? 11
//             : currentMonth - 1;

//     const previousYear =
//         currentMonth === 0
//             ? currentYear - 1
//             : currentYear;

//     const currentExpenses = expenses.filter((expense) => {
//         const date = new Date(expense.date);
//         return (
//             date.getMonth() === currentMonth &&
//             date.getFullYear() === currentYear
//         );
//     });

//     const previousExpenses = expenses.filter((expense) => {

//         const date = new Date(expense.date);

//         return (
//             date.getMonth() === previousMonth &&
//             date.getFullYear() === previousYear
//         );
//     });

//     const currentTotal =
//         currentExpenses.reduce(
//             (acc, item) => acc + Number(item.amount),
//             0
//         );

//     const previousTotal =
//         previousExpenses.reduce(
//             (acc, item) => acc + Number(item.amount),
//             0
//         );

//     const saving = income - currentTotal;

//     //const today = new Date();

//     const currentDay = today.getDate();

//     const daysInMonth = new Date(
//         currentYear,
//         currentMonth + 1,
//         0
//     ).getDate();

//     const averagePerDay =
//         currentDay > 0
//             ? currentTotal / currentDay
//             : 0;

//     const predictedExpense =
//         averagePerDay * daysInMonth;

//     let percentage = 0;

//     if (previousTotal > 0) {
//         percentage = ((currentTotal - previousTotal) / previousTotal) * 100;
//     }

//     let score = 0;

//     if (income > 0) {
//         score = Math.round((saving / income) * 100);
//     }

//     // Prevent values outside 0-100
//     score = Math.max(0, Math.min(score, 100));

//     const categoryTotals = {};

//     currentExpenses.forEach((expense) => {
//         categoryTotals[expense.title] =
//             (categoryTotals[expense.title] || 0)
//             +
//             Number(expense.amount);
//     });

//     const highestCategory =
//         Object.entries(categoryTotals)
//             .sort((a, b) => b[1] - a[1])[0];

//     const aiAdvice = getAIAdvice(
//         highestCategory,
//         saving,
//         income
//     );

//     const alerts =
//         getOverspendingAlerts(expenses);

//     // let advisor = "Excellent financial management.";
//     // if (spentPercentage > 80) {
//     //     advisor = "Your spending is very high this month. Try reducing unnecessary expenses.";
//     // }
//     // else if (spentPercentage > 60) {
//     //     advisor = "Your expenses are moderate. You can improve your savings.";
//     // }
//     // else {
//     //     advisor = "Great! Your savings are healthy this month.";
//     // }

//     return (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-3xl w-[95%] max-w-7xl h-[90vh] flex flex-col">

//                 {/* Header */}
//                 <div className="flex justify-between items-center p-4 border-b">
//                     <h1 className="text-2xl font-bold">
//                         🤖 AI Insights
//                     </h1>

//                     <button onClick={onClose}>
//                         <FaTimes size={25} />
//                     </button>
//                 </div>
//                 <div className="flex-1 overflow-y-auto p-6">
//                     <div className="grid grid-cols-3 gap-6">
//                         <div className="rounded-3xl bg-blue-50 p-5">
//                             <h2 className="font-bold text-xl">
//                                 Spending Comparison
//                             </h2>
//                             <p className="mt-4">
//                                 Current
//                                 ₹{currentTotal}
//                             </p>
//                             <p>
//                                 Previous
//                                 ₹{previousTotal}
//                             </p>
//                             <p className="font-bold mt-4">
//                                 {percentage > 0 ? "+" : "-"}
//                                 {Math.abs(percentage).toFixed(1)}%
//                             </p>
//                         </div>
//                         <div className="rounded-3xl bg-green-50 p-5">
//                             <h2 className="font-bold text-xl">
//                                 Spending Pattern
//                             </h2>
//                             <p className="mt-4">
//                                 Highest Category
//                             </p>
//                             <h3 className="text-2xl font-bold">
//                                 {highestCategory?.[0] || "-"}
//                             </h3>
//                             <p>
//                                 ₹{highestCategory?.[1] || 0}
//                             </p>
//                         </div>
//                         <div className="rounded-3xl bg-yellow-50 p-5">
//                             <h2 className="font-bold text-xl">
//                                 Health Score
//                             </h2>
//                             <h1 className="text-6xl mt-4 font-bold text-green-600">
//                                 {score}/100
//                             </h1>
//                             <p className="mt-3 text-gray-500">
//                                 This is your score based on your savings this month!
//                             </p>
//                         </div>
//                         <SpendingForecast
//                             currentExpense={currentTotal}
//                             predictedExpense={predictedExpense}
//                             income={income}
//                         />
//                         <div className="rounded-3xl bg-purple-50 p-5">
//                             <h2 className="font-bold text-xl mb-4">
//                                 AI Financial Advisor
//                             </h2>
//                             <ul className="space-y-3">
//                                 {aiAdvice.map((item, index) => (
//                                     <li
//                                         key={index}
//                                         className="flex gap-3"
//                                     >
//                                         <span>💡</span>
//                                         <span>{item}</span>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div className="rounded-3xl bg-red-50 p-5">
//                             <h2 className="font-bold text-xl mb-4">
//                                 🚨 Overspending Alerts
//                             </h2>
//                             {alerts.length === 0 ? (
//                                 <p className="text-green-600">
//                                     ✅ No unusual spending detected this month.
//                                 </p>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {alerts.map((alert) => (
//                                         <div
//                                             key={alert.type}
//                                             className="border-b pb-2"
//                                         >
//                                             <p className="font-semibold text-red-600">
//                                                 {alert.type}
//                                             </p>
//                                             <p className="text-sm text-gray-600">
//                                                 Average :
//                                                 {" "}
//                                                 ₹{alert.average.toFixed(0)}
//                                             </p>
//                                             <p className="text-sm text-gray-600">
//                                                 Current :
//                                                 {" "}
//                                                 ₹{alert.current}
//                                             </p>
//                                             <p className="text-red-500 font-medium">
//                                                 {alert.percentage}% above your average
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default AIInsightsModal;

import React from "react";
import { FaTimes } from "react-icons/fa";

import SpendingForecast from "./SpendingForecast";
import { getAIAdvice } from "../utils/aiAdvisor";
import { getOverspendingAlerts } from "../utils/overspendingAlerts";

function AIInsightsModal({
    expenses = [],
    income = 0,
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

    // ==============================
    // CURRENT MONTH EXPENSES
    // ==============================

    const currentExpenses = expenses.filter((expense) => {
        const date = new Date(expense.date);

        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );
    });

    // ==============================
    // PREVIOUS MONTH EXPENSES
    // ==============================

    const previousExpenses = expenses.filter((expense) => {
        const date = new Date(expense.date);

        return (
            date.getMonth() === previousMonth &&
            date.getFullYear() === previousYear
        );
    });

    // ==============================
    // CURRENT TOTAL
    // ==============================

    const currentTotal = currentExpenses.reduce(
        (acc, item) =>
            acc + Number(item.amount || 0),
        0
    );

    // ==============================
    // PREVIOUS TOTAL
    // ==============================

    const previousTotal = previousExpenses.reduce(
        (acc, item) =>
            acc + Number(item.amount || 0),
        0
    );

    // ==============================
    // SAVINGS
    // ==============================

    const saving = Number(income || 0) - currentTotal;

    // ==============================
    // SPENDING COMPARISON
    // ==============================

    let percentage = 0;

    if (previousTotal > 0) {
        percentage =
            ((currentTotal - previousTotal) /
                previousTotal) *
            100;
    }

    // ==============================
    // SPENDING FORECAST
    // ==============================

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

    // ==============================
    // HEALTH SCORE
    // ==============================

    let score = 0;

    if (income > 0) {
        score = Math.round(
            (saving / income) * 100
        );
    }

    // Keep score between 0 and 100
    score = Math.max(
        0,
        Math.min(score, 100)
    );

    // ==============================
    // CATEGORY TOTALS
    // ==============================

    const categoryTotals = {};

    currentExpenses.forEach((expense) => {
        const title = expense.title;

        categoryTotals[title] =
            (categoryTotals[title] || 0) +
            Number(expense.amount || 0);
    });

    // ==============================
    // HIGHEST CATEGORY
    // ==============================

    const highestCategory =
        Object.entries(categoryTotals)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )[0];

    // ==============================
    // AI ADVICE
    // ==============================

    const aiAdvice = getAIAdvice(
        highestCategory,
        saving,
        income
    );

    // ==============================
    // OVERSPENDING ALERTS
    // ==============================

    const alerts =
        getOverspendingAlerts(expenses);

    return (
        <div
            className="
                fixed inset-0
                bg-black/40
                z-50
                flex
                items-center
                justify-center
                p-2
                sm:p-4
            "
        >

            {/* MODAL */}
            <div
                className="
                    bg-white
                    rounded-2xl
                    sm:rounded-3xl
                    w-full
                    max-w-7xl
                    h-[96vh]
                    sm:h-[92vh]
                    flex
                    flex-col
                    overflow-hidden
                "
            >

                {/* ==============================
                    HEADER
                ============================== */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        p-4
                        sm:p-5
                        border-b
                        flex-shrink-0
                    "
                >

                    <div className="min-w-0">
                        <h1
                            className="
                                text-xl
                                sm:text-2xl
                                md:text-3xl
                                font-bold
                                truncate
                            "
                        >
                            🤖 AI Insights
                        </h1>

                        <p
                            className="
                                text-xs
                                sm:text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Your monthly financial analysis
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            flex-shrink-0
                            w-9
                            h-9
                            sm:w-10
                            sm:h-10
                            rounded-full
                            flex
                            items-center
                            justify-center
                            hover:bg-gray-100
                            transition
                        "
                    >
                        <FaTimes
                            size={20}
                            className="sm:hidden"
                        />

                        <FaTimes
                            size={24}
                            className="hidden sm:block"
                        />
                    </button>

                </div>

                {/* ==============================
                    SCROLLABLE CONTENT
                ============================== */}

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        overflow-x-hidden
                        p-3
                        sm:p-5
                        md:p-6
                    "
                >

                    {/* IMPORTANT:
                        Mobile   -> 1 column
                        Tablet   -> 2 columns
                        Desktop  -> 3 columns
                    */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            gap-3
                            sm:gap-4
                            md:gap-6
                        "
                    >

                        {/* ==============================
                            1. SPENDING COMPARISON
                        ============================== */}

                        <div
                            className="
                                rounded-2xl
                                sm:rounded-3xl
                                bg-blue-50
                                p-4
                                sm:p-5
                                min-w-0
                            "
                        >

                            <h2
                                className="
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                "
                            >
                                Spending Comparison
                            </h2>

                            <div
                                className="
                                    mt-4
                                    space-y-2
                                    text-sm
                                    sm:text-base
                                "
                            >

                                <p>
                                    <span className="text-gray-500">
                                        Current:
                                    </span>{" "}
                                    <span className="font-semibold">
                                        ₹
                                        {currentTotal.toLocaleString()}
                                    </span>
                                </p>

                                <p>
                                    <span className="text-gray-500">
                                        Previous:
                                    </span>{" "}
                                    <span className="font-semibold">
                                        ₹
                                        {previousTotal.toLocaleString()}
                                    </span>
                                </p>

                            </div>

                            <p
                                className={`
                                    font-bold
                                    text-xl
                                    sm:text-2xl
                                    mt-4
                                    ${
                                        percentage > 0
                                            ? "text-red-500"
                                            : "text-green-600"
                                    }
                                `}
                            >
                                {percentage > 0
                                    ? "+"
                                    : ""}
                                {percentage.toFixed(1)}%
                            </p>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                compared with previous month
                            </p>

                        </div>

                        {/* ==============================
                            2. SPENDING PATTERN
                        ============================== */}

                        <div
                            className="
                                rounded-2xl
                                sm:rounded-3xl
                                bg-green-50
                                p-4
                                sm:p-5
                                min-w-0
                            "
                        >

                            <h2
                                className="
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                "
                            >
                                Spending Pattern
                            </h2>

                            <p className="mt-4 text-sm sm:text-base">
                                Highest Category
                            </p>

                            <h3
                                className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    break-words
                                "
                            >
                                {highestCategory?.[0] || "-"}
                            </h3>

                            <p className="text-sm sm:text-base mt-1">
                                ₹
                                {Number(
                                    highestCategory?.[1] || 0
                                ).toLocaleString()}
                            </p>

                        </div>

                        {/* ==============================
                            3. HEALTH SCORE
                        ============================== */}

                        <div
                            className="
                                rounded-2xl
                                sm:rounded-3xl
                                bg-yellow-50
                                p-4
                                sm:p-5
                                min-w-0
                            "
                        >

                            <h2
                                className="
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                "
                            >
                                Health Score
                            </h2>

                            <h1
                                className="
                                    text-5xl
                                    sm:text-6xl
                                    mt-4
                                    font-bold
                                    text-green-600
                                "
                            >
                                {score}/100
                            </h1>

                            <p
                                className="
                                    mt-3
                                    text-xs
                                    sm:text-sm
                                    text-gray-500
                                "
                            >
                                Based on your savings
                                this month.
                            </p>

                        </div>

                        {/* ==============================
                            4. SPENDING FORECAST
                        ============================== */}

                        <SpendingForecast
                            currentExpense={currentTotal}
                            predictedExpense={predictedExpense}
                            income={income}
                        />

                        {/* ==============================
                            5. AI FINANCIAL ADVISOR
                        ============================== */}

                        <div
                            className="
                                rounded-2xl
                                sm:rounded-3xl
                                bg-purple-50
                                p-4
                                sm:p-5
                                min-w-0
                            "
                        >

                            <h2
                                className="
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                    mb-4
                                "
                            >
                                AI Financial Advisor
                            </h2>

                            {aiAdvice.length === 0 ? (

                                <p className="text-gray-500">
                                    No advice available.
                                </p>

                            ) : (

                                <ul className="space-y-3">

                                    {aiAdvice.map(
                                        (item, index) => (

                                            <li
                                                key={index}
                                                className="
                                                    flex
                                                    gap-3
                                                    text-sm
                                                    sm:text-base
                                                "
                                            >

                                                <span className="flex-shrink-0">
                                                    💡
                                                </span>

                                                <span className="break-words">
                                                    {item}
                                                </span>

                                            </li>

                                        )
                                    )}

                                </ul>

                            )}

                        </div>

                        {/* ==============================
                            6. OVERSPENDING ALERTS
                        ============================== */}

                        <div
                            className="
                                rounded-2xl
                                sm:rounded-3xl
                                bg-red-50
                                p-4
                                sm:p-5
                                min-w-0
                            "
                        >

                            <h2
                                className="
                                    font-bold
                                    text-lg
                                    sm:text-xl
                                    mb-4
                                "
                            >
                                🚨 Overspending Alerts
                            </h2>

                            {alerts.length === 0 ? (

                                <p
                                    className="
                                        text-green-600
                                        text-sm
                                        sm:text-base
                                    "
                                >
                                    ✅ No unusual spending
                                    detected this month.
                                </p>

                            ) : (

                                <div className="space-y-3">

                                    {alerts.map(
                                        (alert) => (

                                            <div
                                                key={alert.type}
                                                className="
                                                    border-b
                                                    border-red-100
                                                    pb-3
                                                "
                                            >

                                                <p
                                                    className="
                                                        font-semibold
                                                        text-red-600
                                                        break-words
                                                    "
                                                >
                                                    {alert.type}
                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        sm:text-sm
                                                        text-gray-600
                                                        mt-1
                                                    "
                                                >
                                                    Average:
                                                    {" "}
                                                    ₹
                                                    {alert.average.toFixed(
                                                        0
                                                    )}
                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        sm:text-sm
                                                        text-gray-600
                                                    "
                                                >
                                                    Current:
                                                    {" "}
                                                    ₹
                                                    {alert.current}
                                                </p>
                                                <p
                                                    className="
                                                        text-red-500
                                                        text-xs
                                                        sm:text-sm
                                                        font-medium
                                                        mt-1
                                                    "
                                                >
                                                    {alert.percentage}%
                                                    {" "}
                                                    above your average
                                                </p>
                                            </div>
                                        )
                                    )}
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