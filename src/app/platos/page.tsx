import { api, HydrateClient } from "~/trpc/server";
import SavedPlates from "~components/plates/saved-plates";

function PlatesPage() {

  void api.ingredients.getAll.prefetch();

  return (
      <HydrateClient>
        <main className="flex flex-col gap-4 p-4">
          <SavedPlates />
        </main>
      </HydrateClient>
  );
}

export default PlatesPage;