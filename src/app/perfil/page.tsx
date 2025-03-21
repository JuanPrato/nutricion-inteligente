import { HydrateClient } from "~/trpc/server";
import { ProfileInformation } from "~components/profile/ProfileInformation";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "~utils/const";
import { ProfileConfiguration } from "~components/profile/ProfileConfiguration";
import { Button } from "~components/ui/button";
import Link from "next/link";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <HydrateClient>
      <main className="flex flex-col gap-4 p-4">
        <ProfileInformation user={session.user} />
        <ProfileConfiguration />
        <Button asChild variant={"destructive"}>
          <Link href="/api/auth/signout">Cerrar sesión</Link>
        </Button>
      </main>
    </HydrateClient>
  );
}
