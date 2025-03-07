import { HydrateClient } from "~/trpc/server";
import { ProfileInformation } from "~components/profile/ProfileInformation";

export default async function Profile() {
  return (
      <HydrateClient>
        <main className="flex flex-col gap-4 p-4">
          <ProfileInformation />
        </main>
      </HydrateClient>
  );
}