import React, { useState } from 'react';

function ExpenseForm({ onClose, onAdd, expenseTypes }) {
  const [title, setTitle] = useState(expenseTypes[0]);
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!title || !amount || !date) {
      alert('Please fill all required fields');
      return;
    }

    onAdd({
      title,
      amount: Number(amount),
      details,
      date,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      {/* Reduced modal height and padding */}
      <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Smaller heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add Expense
        </h2>

        {/* Reduced spacing between fields */}
        <div className="space-y-4">
          {/* Expense Type */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium text-sm">
              Expense Type
            </label>

            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-2.5 outline-none focus:border-pink-300 text-sm"
            >
              {expenseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium text-sm">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-2.5 outline-none focus:border-pink-300 text-sm"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium text-sm">
              Details
            </label>

            <textarea
              rows="2"
              placeholder="Optional details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-2.5 outline-none resize-none focus:border-pink-300 text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-600 mb-1 font-medium text-sm">
              Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-2.5 outline-none focus:border-pink-300 text-sm"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-gray-200 hover:bg-gray-300 transition-all text-sm font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-2xl bg-pink-400 text-white hover:bg-pink-500 transition-all text-sm font-medium"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;