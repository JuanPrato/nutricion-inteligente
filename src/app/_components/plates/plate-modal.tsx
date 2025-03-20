"use client";

import { Modal } from "~components/utils/modal";
import { FoodTypeSelector } from "~components/plates/food-type-selector";
import { IngredientsSelector } from "~components/plates/ingredients-selector";
import { Button } from "~components/ui/button";

interface PlateModalProps {
  open: boolean;
  onClose: () => void;
}

export function PlateModal(props: PlateModalProps) {
  return (
    <Modal isOpen={props.open} onClose={props.onClose}>
      <form className="flex min-w-[300px] flex-col gap-4">
        <h2 className="text-primary text-center text-2xl">
          Crear un nuevo plato
        </h2>
        <div className="flex flex-col">
          <label className="text-primary" htmlFor="name">
            Nombre del nuevo plato
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Avocado toast"
            className="text-primary border-b py-1 outline-none"
          />
        </div>
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