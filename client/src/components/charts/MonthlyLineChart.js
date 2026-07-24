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

  const currentMonth = new Date().getMonth();

  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ].slice(0, currentMonth + 1);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Expenses',
        data: data.slice(0, currentMonth + 1),
        borderColor: '#cdb4db',
        backgroundColor: '#ffc8dd',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-[#fff7f0] rounded-3xl p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-5">
        Monthly Expenses
      </h2>

      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
}

export default MonthlyLineChart;