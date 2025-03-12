"use client";

import { Section } from "~components/utils/section";
import { PlateCard } from "~components/plates/PlateCard";
import { Button } from "~components/utils/button";
import { PlateModal } from "~components/plates/PlateModal";
import { useState } from "react";

function SavedPlates() {

  const [open, setOpen] = useState(false);

  return (
      <Section
          title="Platos guardados"
          action={<Button className="w-auto h-fit" outlined onClick={() => setOpen(true)}>Nuevo plato</Button>}
      >
        <div className="w-full grid grid-cols-3 gap-2">
          <PlateCard />
          <PlateCard />
          <PlateCard />
          <PlateCard />
          <PlateCard />
        </div>
        <PlateModal open={open} onClose={() => setOpen(false)} />
      </Section>
  );
}

export default SavedPlates;