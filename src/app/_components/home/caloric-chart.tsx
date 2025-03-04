"use client";

import React from 'react';
import { Section } from "~components/utils/section";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions, Point } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from 'chart.js';
import dayjs from "dayjs";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
);

function getValues() {

  const today = dayjs();
  let dayIt = today.add( -7, "day");

  const values = [];
  const days = [];

  for (let i = 0; !dayIt.isSame(today, "day"); i++) {
    values.push(Math.floor(Math.random() * 500) + 100);
    days.push(dayIt.format("DD-mm"));
    dayIt = dayIt.add(1, "day");
  }
  return {days, values};
}

function CaloricChart() {

  const {values, days} = getValues();

  const DATA: ChartData<"line", (number | Point | null)[], unknown> = {
    labels: days,
    datasets:
        [
          {
            label: "Calorias",
            data: values,
            borderColor: "#fff"
            // borderColor: "#A6CEE3"
          }
        ]
  };

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
          }
        }
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            family: "roboto",
            size: 16,
          }
        }
      }
    }
  };

  return (
      <Section title={"Estadísticas"} className="h-[400px]">
        <div className="chart-container relative w-full grow">
          <Line data={DATA} options={options} />
        </div>
      </Section>
  );
}

export default CaloricChart;
