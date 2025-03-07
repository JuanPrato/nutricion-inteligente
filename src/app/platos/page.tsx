import { HydrateClient } from "~/trpc/server";
import SavedPlates from "~components/plates/SavedPlates";

function PlatesPage() {
  return (
      <HydrateClient>
        <main className="flex flex-col gap-4 p-4">
          <SavedPlates />
        </main>
      </HydrateClient>
  );
}

export default PlatesPage;