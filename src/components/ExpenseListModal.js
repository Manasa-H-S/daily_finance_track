import React, { useMemo, useState } from 'react';
import {
    FaEdit,
    FaTrash,
    FaTimes,
} from 'react-icons/fa';

function ExpenseListModal({
    expenses,
    expenseTypes,
    onClose,
    onDelete,
    onUpdate,
}) {
    const today = new Date();

    const [selectedMonth, setSelectedMonth] = useState(
        today.getMonth()
    );

    const [selectedYear, setSelectedYear] = useState(
        today.getFullYear()
    );

    const [editingId, setEditingId] = useState(null);

    const [editData, setEditData] = useState({
        title: '',
        amount: '',
        details: '',
    });

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const years = [];
    for (
        let year = today.getFullYear() - 5;
        year <= today.getFullYear() + 5;
        year++
    ) {
        years.push(year);
    }

    const filteredExpenses = useMemo(() => {
        return expenses
            .filter((expense) => {
                const date = new Date(expense.date);

                return (
                    date.getMonth() === Number(selectedMonth) &&
                    date.getFullYear() === Number(selectedYear)
                );
            })
            .sort(
                (a, b) =>
                    new Date(b.date) - new Date(a.date)
            );
    }, [expenses, selectedMonth, selectedYear]);

    const startEdit = (expense) => {
        setEditingId(expense.id);
        setEditData({
            title: expense.title,
            amount: expense.amount,
            details: expense.details || '',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const saveEdit = (expense) => {
        if (!editData.title || !editData.amount) {
            alert('Please fill all required fields.');
            return;
        }

        onUpdate({
            ...expense,
            title: editData.title,
            amount: Number(editData.amount),
            details: editData.details,
        });

        setEditingId(null);
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#fffdfd] w-full max-w-7xl rounded-[32px] shadow-2xl border border-white/60 p-6 max-h-[92vh] overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Expense List
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            View, edit and delete your expenses
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-[#ffe4e6] text-gray-600 hover:bg-[#fecdd3] flex items-center justify-center transition"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-5">
                    <select
                        value={selectedMonth}
                        onChange={(e) =>
                            setSelectedMonth(e.target.value)
                        }
                        className="bg-[#fef3c7] border-0 rounded-2xl px-4 py-2.5 text-gray-700 shadow-sm outline-none"
                    >
                        {months.map((month, index) => (
                            <option
                                key={month}
                                value={index}
                            >
                                {month}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedYear}
                        onChange={(e) =>
                            setSelectedYear(e.target.value)
                        }
                        className="bg-[#dbeafe] border-0 rounded-2xl px-4 py-2.5 text-gray-700 shadow-sm outline-none"
                    >
                        {years.map((year) => (
                            <option
                                key={year}
                                value={year}
                            >
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-auto max-h-[70vh] rounded-3xl border border-gray-100 shadow-inner">
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-[#f8fafc]">
                                <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                                    Details
                                </th>
                                <th className="px-4 py-3 text-right text-gray-600 font-semibold">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-center text-gray-600 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredExpenses.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-12 text-gray-400"
                                    >
                                        No expenses found for this month.
                                    </td>
                                </tr>
                            ) : (
                                filteredExpenses.map(
                                    (expense, index) => (
                                        <tr
                                            key={expense.id}
                                            className={`border-t border-white ${index % 2 === 0
                                                    ? 'bg-[#eff6ff]' // pastel blue - lighter
                                                    : 'bg-[#dbeafe]' // pastel blue - slightly darker
                                                }`}
                                        >
                                            {/* Date */}
                                            <td className="px-4 py-3 text-gray-700">
                                                {expense.date}
                                            </td>

                                            {/* Type */}
                                            <td className="px-4 py-3">
                                                {editingId ===
                                                    expense.id ? (
                                                    <select
                                                        value={
                                                            editData.title
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setEditData({
                                                                ...editData,
                                                                title:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full rounded-xl px-3 py-2 border border-gray-200"
                                                    >
                                                        {expenseTypes.map(
                                                            (
                                                                type
                                                            ) => (
                                                                <option
                                                                    key={
                                                                        type
                                                                    }
                                                                    value={
                                                                        type
                                                                    }
                                                                >
                                                                    {
                                                                        type
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                ) : (
                                                    <span className="inline-block bg-white/80 px-3 py-1 rounded-full font-medium text-gray-700">
                                                        {
                                                            expense.title
                                                        }
                                                    </span>
                                                )}
                                            </td>

                                            {/* Details */}
                                            <td className="px-4 py-3 text-gray-700">
                                                {editingId ===
                                                    expense.id ? (
                                                    <input
                                                        type="text"
                                                        value={
                                                            editData.details
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setEditData({
                                                                ...editData,
                                                                details:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full rounded-xl px-3 py-2 border border-gray-200"
                                                    />
                                                ) : (
                                                    expense.details ||
                                                    '-'
                                                )}
                                            </td>

                                            {/* Amount */}
                                            <td className="px-4 py-3 text-right">
                                                {editingId ===
                                                    expense.id ? (
                                                    <input
                                                        type="number"
                                                        value={
                                                            editData.amount
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setEditData({
                                                                ...editData,
                                                                amount:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-28 rounded-xl px-3 py-2 border border-gray-200 text-right"
                                                    />
                                                ) : (
                                                    <span className="font-bold text-gray-800">
                                                        ₹{' '}
                                                        {Number(
                                                            expense.amount
                                                        ).toLocaleString()}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3">
                                                {editingId ===
                                                    expense.id ? (
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                saveEdit(
                                                                    expense
                                                                )
                                                            }
                                                            className="px-3 py-1.5 bg-[#bbf7d0] text-green-800 rounded-xl font-medium hover:bg-[#86efac]"
                                                        >
                                                            Save
                                                        </button>

                                                        <button
                                                            onClick={
                                                                cancelEdit
                                                            }
                                                            className="px-3 py-1.5 bg-[#e5e7eb] text-gray-700 rounded-xl font-medium hover:bg-gray-300"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                startEdit(
                                                                    expense
                                                                )
                                                            }
                                                            className="w-9 h-9 rounded-full bg-[#dbeafe] text-blue-600 hover:bg-[#bfdbfe] flex items-center justify-center"
                                                        >
                                                            <FaEdit />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                onDelete(
                                                                    expense.id
                                                                )
                                                            }
                                                            className="w-9 h-9 rounded-full bg-[#ffe4e6] text-red-500 hover:bg-[#fecdd3] flex items-center justify-center"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ExpenseListModal;