"use client";

import { Section } from "~components/utils/section";
import { PlateCard } from "~components/plates/plate-card";
import { PlateModal } from "~components/plates/plate-modal";
import { useState } from "react";
import { Button } from "~components/ui/button";

function SavedPlates() {

  const [open, setOpen] = useState(false);

  return (
      <Section
          title="Platos guardados"
          action={<Button
              className="font-normal"
              variant="outline"
              onClick={() => setOpen(true)}
          >Nuevo plato</Button>}
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