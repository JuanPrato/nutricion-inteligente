"use client";

import {
  type ChartData,
  type ChartOptions,
  type Point,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement, Title, Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

interface Props {
  data: ChartData<"line", (number | Point | null)[], unknown>;
}

function Chart(props: Props) {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: {
        ticks: {
          color: "#fff",
          stepSize: 100,
          font: {
            family: "roboto",
            size: 16,
          },
        },
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            family: "roboto",
            size: 16,
          },
        },
      },
    },
  };

  return <Line data={props.data} options={options} />;
}

export default Chart;
