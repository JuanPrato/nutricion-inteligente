import { HydrateClient } from "~/trpc/server";
import { ProfileInformation } from "~components/profile/ProfileInformation";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "~utils/const";
import { ProfileConfiguration } from "~components/profile/ProfileConfiguration";
import { LinkButton } from "~components/utils/button";

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
          <LinkButton
              href="/api/auth/signout"
              full
              outlined
              className="h-full outline-danger text-danger bg-danger-tint"
              textClassName="text-sm font-medium w-full text-center">Cerrar sesión
          </LinkButton>
        </main>
      </HydrateClient>
  );
}