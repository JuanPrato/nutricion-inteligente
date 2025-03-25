"use client";

import { Modal } from "~components/ui/modal";
import { FoodTypeSelector } from "~components/plates/food-type-selector";
import { IngredientsSelector } from "~components/plates/ingredients-selector";
import { Button } from "~components/ui/button";
import { TextInput } from "~components/ui/input";

interface PlateModalProps {
  open: boolean;
  onClose: () => void;
}

export function PlateModal(props: PlateModalProps) {
  return (
    <Modal isOpen={props.open} onClose={props.onClose} title="Crear un nuevo plato">
      <form className="flex w-full flex-col gap-4">
        <TextInput
          label="Nombre del nuevo plato"
          id="name"
          name="name"
          placeholder="Avocado toast"
          autoComplete={"off"}
        />
        <input type="hidden" name="type" id="type" />
        <FoodTypeSelector />
        <IngredientsSelector />
        <Button
          variant="success"
        >
          Guardar
        </Button>
      </form>
    </Modal>
  );
}