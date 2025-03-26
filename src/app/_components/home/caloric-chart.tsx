import { Section } from "~components/utils/section";
import type { ChartData, Point } from "chart.js";

import dayjs from "dayjs";
import { api } from "~/trpc/server";
import { makeDateKey } from "~/lib/utils";
import Chart from "~components/home/chart";



async function getValues() {

  const today = dayjs();
  let dayIt = today.add( -7, "day");

  const values = [];
  const days = [];
  const daysToFetch = [];

  for (let i = 0; !dayIt.isSame(today, "day"); i++) {
    daysToFetch.push(dayIt.toDate());
    dayIt = dayIt.add(1, "day");
  }

  const caloryList = await api.foods.getCalories({ days: daysToFetch });

  for (const day of daysToFetch) {
    days.push(dayjs(day).format("DD-MM"));
    values.push(caloryList[makeDateKey(day)] ?? 0)
  }

  return {days, values};
}

async function CaloricChart() {

  const data = await getValues();

  const DATA: ChartData<"line", (number | Point | null)[], unknown> = {
    labels: data.days,
    datasets:
        [
          {
            label: "Calorias",
            data: data.values,
            borderColor: "#fff"
            // borderColor: "#A6CEE3"
          }
        ]
  };

  return (
      <Section title={"Estadísticas"} className="h-[400px]">
        <div className="chart-container relative w-full grow">
          <Chart data={DATA} />
        </div>
      </Section>
  );
}

export default CaloricChart;
