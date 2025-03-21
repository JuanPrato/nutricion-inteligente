"use client";

import { BiCamera, BiMicrophone } from "react-icons/bi";
import { ICONS } from "~utils/const";
import { AddIngredient } from "~components/plates/add-ingredient";
import { useState } from "react";
import { Button } from "~components/ui/button";
import { LittleCard } from "~components/ui/card";
import { api } from "~/trpc/react";
import  type { Ingredient } from "~/lib/types";

export function IngredientsSelector() {

  const ingredients = api.ingredients.getAll.useQuery();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

  function onNewIngredients(ingredient: Ingredient) {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  }

  function onDeleteIngredient(name: string) {
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
            size={"small"}
          />
        ))}
        <AddIngredient ingredients={ingredients.data ?? []} onNewIngredient={onNewIngredients} />
      </div>
    </div>
  );
}
