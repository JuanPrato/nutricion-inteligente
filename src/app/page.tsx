import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
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

  return (
    <HydrateClient>
      <main className="flex flex-col gap-4 p-4">
        <DailySummary />
        <DayFoods />
        <CaloricChart />
        {/*<p className="text-center text-2xl text-white">*/}
        {/*  {session && <span>Logged in as {session.user?.name}</span>}*/}
        {/*</p>*/}
        {/*<Link*/}
        {/*  href={session ? "/api/auth/signout" : "/api/auth/signin"}*/}
        {/*  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"*/}
        {/*>*/}
        {/*  {session ? "Sign out" : "Sign in"}*/}
        {/*</Link>*/}
      </main>
    </HydrateClient>
  );
}
