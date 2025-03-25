"use client";

import type { Food } from "~/lib/types";
import { type FOODS, FOODS_COLORS, FOODS_DESCRIPTION, ICONS } from "~utils/const";
import { twJoin } from "tailwind-merge";
import { Button } from "~components/ui/button";
import { LittleCard } from "~components/ui/card";
import { FoodModal } from "~components/home/food-modal";
import { useState } from "react";

interface Props {
  foodType: FOODS;
  foods: Food[];
}

export function DayFood(props: Props) {

  const [open, setOpen] = useState(false);
  const [foodEditId, setFoodEditId] = useState<number | null>(null);

  function onClose(v: boolean) {
    setOpen(v);
  }


  return (
    <div className="flex w-full flex-col items-center gap-2">
      {props.foods.length === 0 && (
        <LittleCard
          principal={FOODS_DESCRIPTION[props.foodType]}
          icon={ICONS[props.foodType]}
          iconClassName={twJoin("size-10", FOODS_COLORS[props.foodType])}
          description="Sin elegir"
          action={
            <Button
              variant={"ghost"}
              shape="circle"
              size={"icon"}
              onClick={() => {
                setFoodEditId(null);
                setOpen(true);
              }}
            >
              <ICONS.EDIT className="size-6 text-black" />
            </Button>
          }
        />
      )}
      {props.foods.map((food) => {
        const foodType = food.category!.description as FOODS;

        return (
          <LittleCard
            key={food.id}
            principal={FOODS_DESCRIPTION[foodType]}
            icon={ICONS[foodType]}
            iconClassName={twJoin("size-10", FOODS_COLORS[foodType])}
            description={food.plate?.name}
            action={
              <Button
                variant={"ghost"}
                shape="circle"
                size={"icon"}
                onClick={() => {
                  setFoodEditId(food.id)
                  setOpen(true);
                }}
              >
                <ICONS.EDIT className="size-6 text-black" />
              </Button>
            }
          />
        );
      })}
      <Button className="text-primary" variant="ghost">
        <ICONS.INGREDIENTS />{" "}
        <span className="text-sm font-light">Nuevo snack?</span>
      </Button>
      <FoodModal open={open} onClose={onClose} category={props.foodType} foodId={foodEditId} />
    </div>
  );
}