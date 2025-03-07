import { Section } from "~components/utils/section";
import PlateCard from "~components/plates/PlateCard";
import { Button } from "~components/utils/button";

function SavedPlates() {
  return (
      <Section title="Platos guardados" action={<Button className="w-auto h-fit" textClassName="text-" outlined>Nuevo plato</Button>}>
        <div className="w-full grid grid-cols-3 gap-2">
          <PlateCard />
          <PlateCard />
          <PlateCard />
          <PlateCard />
          <PlateCard />
        </div>
      </Section>
  );
}

export default SavedPlates;