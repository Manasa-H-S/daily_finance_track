// src/components/charts/DailyBarChart.js

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const pastelColors = [
  '#a5d8ff',
  '#ffc8dd',
  '#caffbf',
  '#ffd6a5',
  '#bdb2ff',
];

function DailyBarChart({ data }) {
  const labels = data.map((_, index) => index + 1);

  const maxValue = Math.max(...data, 0);
  const roundedMax =
    maxValue === 0
      ? 1000
      : Math.ceil(maxValue / 1000) * 1000;

  const step = roundedMax / 10;

  // Y-axis labels from top to bottom
  const yLabels = Array.from(
    { length: 11 },
    (_, i) => roundedMax - i * step
  );

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map(
          (_, index) =>
            pastelColors[
              index % pastelColors.length
            ]
        ),
        borderRadius: 8,
        barThickness: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `₹ ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0,0,0,0.04)',
        },
      },
      y: {
        beginAtZero: true,
        max: roundedMax,
        ticks: {
          display: false, // Hide Chart.js Y-axis labels
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-[#eef6ff] rounded-3xl p-4 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        Daily Expenses
      </h2>

      <div className="h-[320px] flex">
        {/* Sticky Custom Y-Axis */}
        <div className="w-20 shrink-0 flex flex-col justify-between pr-2 text-right text-sm text-gray-500">
          {yLabels.map((value, index) => (
            <div key={index}>
              ₹{Math.round(value).toLocaleString()}
            </div>
          ))}
        </div>

        {/* Scrollable Chart */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="min-w-[1000px] h-full">
            <Bar
              data={chartData}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyBarChart;