import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function MonthlyLineChart({ data }) {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data,
        borderColor: '#cdb4db',
        backgroundColor: '#ffc8dd',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div className="bg-[#fff7f0] rounded-3xl p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5">
        Monthly Expenses
      </h2>

      <Line data={chartData} options={options} />
    </div>
  );
}

export default MonthlyLineChart;