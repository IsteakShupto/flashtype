type result = {
  matched: number;
  totalTyped: number;
};

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import type { TooltipItem } from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

type finalResultType = {
  finalResult: result[];
  createdAt?: string;
};

const Details = ({ finalResult, createdAt }: finalResultType) => {
  console.log(createdAt);
  const labels: number[] = finalResult.slice(-60).map((obj) => obj.matched);
  const dataPoints: number[] = finalResult
    .slice(-60)
    .map((obj) => obj.totalTyped);
  const wpms: number[] = finalResult
    .slice(-60)
    .map((obj) => Math.ceil(obj.matched / 5));

  const errors: number[] = finalResult
    .slice(-60)
    .map((obj) =>
      Math.ceil(((obj.totalTyped - obj.matched) / obj.totalTyped) * 100)
    );

  const data = {
    labels,
    datasets: [
      {
        label: "Speed typing test data",
        data: wpms,
        borderColor: "#fff",
        backgroundColor: "#fff",
        fill: true,
        tension: 0.7,
        borderWidth: 1,
      },
      {
        label: "Errors",
        data: errors,
        borderColor: "#f87171",
        backgroundColor: "#f87171",
        fill: false,
        tension: 0.7,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#fff",
          font: {
            size: 14,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 20,
        bodyFont: {
          size: 16,
        },
        titleFont: {
          size: 18,
        },
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const matched = labels[context.dataIndex];
            const totalTyped = dataPoints[context.dataIndex];
            const wpm = matched / 5;
            const error = totalTyped - matched;
            return `WPM: ${Math.ceil(wpm)}, Errors: ${error}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { display: true, color: "#fff" },
        grid: {
          color: "",
        },
        border: {
          color: "#000",
          width: 1,
        },
      },
      y: {
        ticks: { display: true, color: "#fff" },
        grid: {
          color: "",
        },
        border: {
          color: "#000",
          width: 1,
        },
      },
    },
  };

  return (
    <div>
      <div className="w-[1200px] h-[500px] mx-auto p-10">
        <Line data={data} options={options} />
      </div>
      <div className="w-[1000px] mx-auto grid grid-cols-4 text-center text-white">
        <div>
          <p className="text-3xl font-semibold">Date of test</p>
          <p className="mt-2.5 text-2xl text-neutral-400">
            {createdAt && new Date(createdAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-3xl font-semibold">Wpm</p>
          <p className="mt-2.5 text-2xl text-neutral-400">
            {Math.ceil(finalResult[finalResult.length - 1].matched / 5)}
          </p>
        </div>
        <div>
          <p className="text-3xl font-semibold">Raw wpm</p>
          <p className="mt-2.5 text-2xl text-neutral-400">
            {Math.ceil(finalResult[finalResult.length - 1].totalTyped / 5)}
          </p>
        </div>
        <div>
          <p className="text-3xl font-semibold">Error (%)</p>
          <p className="mt-2.5 text-2xl text-neutral-400">
            {Math.ceil(
              ((finalResult[finalResult.length - 1].totalTyped -
                finalResult[finalResult.length - 1].matched) /
                finalResult[finalResult.length - 1].totalTyped) *
                100
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
