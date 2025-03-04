import React from 'react';

import { LittleCard } from "~components/utils/card";
import { type FOODS, FOODS_COLORS, FOODS_DESCRIPTION, ICONS } from "~utils/const";
import { Button } from "~components/utils/button";
import { twJoin } from "tailwind-merge";

interface Props {
  food: FOODS;
}

export function DayFood(props: Props) {
  return (
      <div className="flex flex-col gap-2 items-center w-full">
        <LittleCard
            principal={FOODS_DESCRIPTION[props.food]}
            icon={ICONS[props.food]}
            iconClassName={twJoin("size-10", FOODS_COLORS[props.food])}
            description="620 kcal"
            action={<Button circle full left={<ICONS.EDIT className="size-6 text-black" />}/>}
        />
        <Button
            className="backdrop-brightness-80 justify-center gap-1"
            left={<ICONS.SNACK />}
            textClassName="text-sm"
        >
          Nuevo snack?
        </Button>
      </div>
  );
}