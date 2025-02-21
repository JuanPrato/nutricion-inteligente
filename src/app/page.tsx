import Link from "next/link";

import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import { ROUTES } from "~/app/utils/const";
import { Section } from "~/app/_components/utils/section";
import { LittleCard } from "~/app/_components/utils/card";
import { FiTarget } from "react-icons/fi";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <HydrateClient>
      <main className="p-4">
            <Section>
              <h2 className="text-2xl font-bold">Resumen diario</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-4xl font-bold">150 kcal</h2>
                    <h4>Consumidas hoy</h4>
                    <progress value={.5} className="w-full rounded-lg overflow-hidden progress-bar" />
                    <h4>50% completado</h4>
                  </div>
                  <h4 className="text-2xl">¡Dale que llegamos!</h4>
                </div>
                <div>
                  <LittleCard principal="2000 kcal" top="Meta diaria" description="100 kcal restantes" icon={FiTarget} iconClassName="text-blue-500" />
                </div>
              </div>
            </Section>
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
      </main>
    </HydrateClient>
  );
}
