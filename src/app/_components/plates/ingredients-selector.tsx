"use client";

import { BiCamera, BiMicrophone } from "react-icons/bi";
import { LittleCard } from "~components/utils/card";
import { ICONS } from "~utils/const";
import { AddIngredient } from "~components/plates/add-ingredient";
import { useState } from "react";
import { Button } from "~components/ui/button";

const INGREDIENTS = [
  {
    name: "Pan",
    kcal: 250
  },
  {
    name: "Palta",
    kcal: 125
  }
]

const SELECTED_INGREDIENTS = [
  {
    name: "Pan",
    kcal: 250
  }
]

export function IngredientsSelector() {

  const [selectedIngredients, setSelectedIngredients] = useState(SELECTED_INGREDIENTS);

  function onNewIngredients(ingredient: { name: string, kcal: number }) {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  }

  function onDeleteIngredient(name: string) {
    console.log("hola")
    setSelectedIngredients(selectedIngredients.filter((i) => i.name !== name));
  }

  return (
    <div>
      <header className="mb-3 flex w-full">
        <div className="text-primary flex grow flex-col">
          <h4 className="text-2xl">Ingredientes</h4>
          <h5 className="text-muted text-sm font-light">Total: 512 kcal</h5>
        </div>
        <div className="flex items-center gap-2">
          <Button
            shape="circle"
            // left={}
            className="size-12 text-black"
          ><BiMicrophone /></Button>
          <Button
            shape="circle"
            className="size-12 text-black"
          ><BiCamera />
          </Button>
        </div>
      </header>
      <div className="text-primary flex flex-col items-center gap-2">
        {selectedIngredients.map(({ name, kcal }) => (
          <LittleCard
            key={name}
            principal={name}
            description={`${kcal} kcal`}
            action={
              <Button
                shape="circle"
                className="size-10"
                variant="ghost"
                onClick={() => onDeleteIngredient(name)}
              >
                <ICONS.DELETE className="text-danger"/>
              </Button>
            }
            small
          />
        ))}
        <AddIngredient ingredients={INGREDIENTS} onNewIngredient={onNewIngredients} />
      </div>
    </div>
  );
}
