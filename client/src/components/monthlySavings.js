import React from "react";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function MonthlySavings({ savings }) {
    return (
        <div className="bg-[#f7fff8] rounded-3xl shadow-sm p-5">

            <h2 className="text-2xl font-semibold text-center mb-5">
                Monthly Savings
            </h2>

            <div className="space-y-2">

                {savings.map((amount, index) => {

                    if (amount === null) return null;

                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center gap-[180px] py-1 border-b border-gray-100"
                        >
                            <span className="font-medium text-gray-600">
                                {months[index]}
                            </span>

                            <span className="font-bold text-green-600">
                                ₹ {amount.toLocaleString()}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MonthlySavings;