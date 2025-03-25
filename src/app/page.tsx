import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import DayFoods from "~components/home/day-foods";
import DailySummary from "~components/home/daily-summary";
import { ROUTES } from "~utils/const";
import CaloricChart from "~components/home/caloric-chart";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  void api.foods.getTodayFoods.prefetch();

  return (
    <HydrateClient>
      <main className="flex flex-col gap-4 p-4">
        <DailySummary />
        <DayFoods />
        <CaloricChart />
      </main>
    </HydrateClient>
  );
}
