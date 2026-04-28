import { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    onAdd({
      title,
      amount: parseFloat(amount),
    });

    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      <input
        type="text"
        placeholder="Expense name"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full p-2 border rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600">
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;