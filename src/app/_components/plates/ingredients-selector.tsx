"use client";

import { BiCamera, BiMicrophone } from "react-icons/bi";
import { ICONS } from "~utils/const";
import { AddIngredient } from "~components/plates/add-ingredient";
import { useEffect, useState } from "react";
import { Button } from "~components/ui/button";
import { LittleCard } from "~components/ui/card";
import { api } from "~/trpc/react";
import  type { Ingredient } from "~/lib/types";
import { FormControl, FormField, FormItem, FormMessage } from "~components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "~components/ui/input";

interface Props<T extends FieldValues> {
  control: Control<T>
  setInputValue: (values: number[]) => void;
}

export function IngredientsSelector<T extends FieldValues>(props: Props<T>) {
  const ingredients = api.ingredients.getAll.useQuery();
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );

  function onNewIngredients(ingredient: Ingredient) {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  }

  function onDeleteIngredient(name: string) {
    setSelectedIngredients(selectedIngredients.filter((i) => i.name !== name));
  }

  const kcal = selectedIngredients.reduce((acc, i) => acc + (i.kcal ?? 0), 0);

  useEffect(() => {
    props.setInputValue(selectedIngredients.map(i => i.id));
  }, [props, selectedIngredients]);

  return (
    <div>
      <header className="mb-3 flex w-full">
        <div className="text-primary flex grow flex-col">
          <h4 className="text-2xl">Ingredientes</h4>
          <h5 className="text-muted text-sm font-light">Total: {kcal} kcal</h5>
        </div>
        <div className="flex items-center gap-2">
          <Button
            shape="circle"
            // left={}
            className="size-12 text-black"
          >
            <BiMicrophone />
          </Button>
          <Button shape="circle" className="size-12 text-black">
            <BiCamera />
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
                <ICONS.DELETE className="text-danger" />
              </Button>
            }
            size={"small"}
          />
        ))}
        <FormField<T>
          control={props.control}
          name={"ingredients" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AddIngredient
          ingredients={ingredients.data ?? []}
          onNewIngredient={onNewIngredients}
        />
      </div>
    </div>
  );
}
