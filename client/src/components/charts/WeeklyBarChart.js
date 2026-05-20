import React from 'react';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function WeeklyBarChart({ data }) {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data,
        backgroundColor: [
          '#a0c4ff',
          '#ffc6ff',
          '#caffbf',
          '#ffd6a5',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-[#f6f0ff] rounded-3xl p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-5 text-center">
        Weekly Expenses
      </h2>

      <div className="w-[280px] mx-auto">
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default WeeklyBarChart;