"use client";

import { Modal } from "~components/ui/modal";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~components/ui/command";
import { api } from "~/trpc/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import type { Plate } from "~/lib/types";
import { Button } from "~components/ui/button";
import { type FOODS, ICONS } from "~utils/const";

interface FoodModalProps {
  open: boolean;
  onClose: (v: boolean) => void;
  category: FOODS;
  foodId?: number | null;
  onPlateChange: () => void;
}

export function FoodModal(props: FoodModalProps) {

  const plates = api.plates.getAll.useQuery();

  const { mutate } = api.foods.saveFood.useMutation({
    async onSuccess(){
      props.onPlateChange();
    }
  });

  const [value, setValue] = useState<Plate | null>(null);

  async function handleSave() {
    if (!value) return;

    mutate({
      foodId: props.foodId ?? undefined,
      plateId: value.id,
      category: props.category,
      snack: false,
    });

    props.onClose(false);
  }

  return (
    <Modal isOpen={props.open} onClose={props.onClose} title={"Cargar comida"}>
      <form className="flex flex-col gap-2">
        <Command className="bg-background w-full">
          <CommandInput
            placeholder="Arroz con pollo"
            className="text-primary placeholder:text-primary h-9"
          />
          <CommandList>
            <CommandEmpty className="text-primary">
              No se encontraron resultado.
            </CommandEmpty>
            <CommandGroup>
              {plates.data?.map((plate: Plate) => (
                <CommandItem
                  className="text-primary"
                  key={plate.id}
                  value={plate.name}
                  onSelect={() => {
                    setValue(plate.id === value?.id ? null : plate);
                  }}
                >
                  {plate.platesToCategories.map((category) => {
                    const desc = category.category
                      .description as keyof typeof ICONS;
                    const Icon = ICONS[desc];

                    return (
                      <Icon key={category.categoryId} className="h-full" />
                    );
                  })}
                  {plate.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value?.id === plate.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Button variant="success" onClick={handleSave}>
          Guardar
        </Button>
      </form>
    </Modal>
  );
}
