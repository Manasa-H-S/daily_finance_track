function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="text-gray-500 text-center">No expenses yet</p>;
  }

  return (
    <ul className="space-y-2">
      {expenses.map((expense) => (
        <li
          key={expense.id}
          className="flex justify-between items-center bg-gray-50 p-3 rounded"
        >
          <div>
            <p className="font-semibold">{expense.title}</p>
            <p className="text-sm text-gray-500">₹{expense.amount}</p>
          </div>

          <button
            onClick={() => onDelete(expense.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;