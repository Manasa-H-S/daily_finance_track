export const getOverspendingAlerts = (
  expenses
) => {

  const today = new Date();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const expenseTypes = [
    ...new Set(expenses.map((e) => e.title)),
  ];

  const alerts = [];

  expenseTypes.forEach((type) => {

    // Current month total
    const currentTotal = expenses
      .filter((expense) => {

        const date = new Date(expense.date);

        return (
          expense.title === type &&
          date.getFullYear() === currentYear &&
          date.getMonth() === currentMonth
        );

      })
      .reduce(
        (sum, expense) =>
          sum + Number(expense.amount),
        0
      );

    // Previous months totals
    const monthlyTotals = {};

    expenses.forEach((expense) => {

      const date = new Date(expense.date);

      if (
        expense.title === type &&
        date.getFullYear() === currentYear &&
        date.getMonth() < currentMonth
      ) {

        const month = date.getMonth();

        monthlyTotals[month] =
          (monthlyTotals[month] || 0) +
          Number(expense.amount);
      }

    });

    const values = Object.values(
      monthlyTotals
    );

    if (
      values.length === 0 ||
      currentTotal === 0
    ) {
      return;
    }

    const average =
      values.reduce((a, b) => a + b, 0) /
      values.length;

    if (currentTotal > average) {

      alerts.push({

        type,

        current: currentTotal,

        average,

        percentage:
          (
            ((currentTotal - average) /
              average) *
            100
          ).toFixed(1),

      });

    }

  });

  return alerts.sort(
    (a, b) => b.percentage - a.percentage
  );
};