import React, { useState } from 'react';
import {
  updateSalary,
  addIncome,
} from '../services/incomeService';

function IncomeModal({
  onClose,
  onIncomeUpdated,
}) {
  const [salary, setSalary] =
    useState('');

  const [amount, setAmount] =
    useState('');

  const [details, setDetails] =
    useState('');

  const [date, setDate] = useState(
    new Date()
      .toISOString()
      .split('T')[0]
  );

  const handleSaveSalary =
    async () => {
      try {
        await updateSalary(
          Number(salary)
        );

        alert(
          'Monthly income updated successfully'
        );

        onIncomeUpdated();
      } catch (error) {
        alert(
          'Failed to update salary'
        );
      }
    };

  const handleAddIncome =
    async () => {
      try {
        await addIncome({
          amount: Number(amount),
          details,
          date,
        });

        alert(
          'Income added successfully'
        );

        setAmount('');
        setDetails('');

        onIncomeUpdated();
      } catch (error) {
        alert(
          'Failed to add income'
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          Manage Income
        </h2>

        {/* Monthly Salary */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">
            Set Monthly Income
          </h3>

          <input
            type="number"
            value={salary}
            onChange={(e) =>
              setSalary(
                e.target.value
              )
            }
            placeholder="Enter monthly income"
            className="w-full border p-2 rounded-lg"
          />

          <button
            onClick={
              handleSaveSalary
            }
            className="mt-3 bg-pink-400 text-white px-4 py-2 rounded-lg"
          >
            Save Income
          </button>
        </div>

        {/* Extra Income */}
        <div>
          <h3 className="font-semibold mb-2">
            Add Extra Income
          </h3>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            placeholder="Amount"
            className="w-full border p-2 rounded-lg mb-2"
          />

          <input
            type="text"
            value={details}
            onChange={(e) =>
              setDetails(
                e.target.value
              )
            }
            placeholder="Details"
            className="w-full border p-2 rounded-lg mb-2"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="w-full border p-2 rounded-lg mb-2"
          />

          <button
            onClick={
              handleAddIncome
            }
            className="bg-blue-400 text-white px-4 py-2 rounded-lg"
          >
            Add Income
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default IncomeModal;