"use client";

import { ICONS } from "~utils/const";
import { useState } from "react";
import { Combobox } from "~components/ui/combobox";
import { Button } from "~components/ui/button";
import type { Ingredient } from "~/lib/types";

interface Props {
  ingredients: Ingredient[];
  onNewIngredient: (ingredient: Ingredient) => void;
}

export function AddIngredient(props: Props) {

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  function handleSubmit() {
    const ing = props.ingredients.find(i => i.name === value);
    if (!ing) return;
    setEditing(false);
    props.onNewIngredient(ing);
  }

  if (editing) {
    return (
      <div className="little-card-small">
        <Button
          shape="circle"
          size="icon"
          variant={"ghost"}
          className="text-black hover:text-black"
          onClick={handleSubmit}
        >
          <ICONS.SAVE />
        </Button>
        <Combobox
          items={props.ingredients.map((i) => ({
            value: `${i.name}`,
            label: `${i.name} ${i.kcal} kcal`,
          }))}
          searchPlaceholder={"Buscar ingredientes..."}
          onChange={setValue}
        />
        <Button
          shape="circle"
          size="icon"
          variant={"ghost"}
          className="text-danger hover:text-danger"
          onClick={() => setEditing(false)}
        >
          <ICONS.CANCEL />
        </Button>
      </div>
    );
  }

  return (
      <Button
          className="text-primary"
          variant="ghost"
          onClick={() => setEditing(true)}
      >
        <ICONS.INGREDIENTS /> <span className="text-sm font-light">Agregar ingrediente</span>
      </Button>
  );
}