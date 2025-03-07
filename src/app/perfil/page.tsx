import { HydrateClient } from "~/trpc/server";
import { ProfileInformation } from "~components/profile/ProfileInformation";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "~utils/const";

export default async function Profile() {
  const session = await auth();

  if (!session) {
    redirect(ROUTES.LOGIN);
  }

  return (
      <HydrateClient>
        <main className="flex flex-col gap-4 p-4">
          <ProfileInformation user={session.user} />
        </main>
      </HydrateClient>
  );
}