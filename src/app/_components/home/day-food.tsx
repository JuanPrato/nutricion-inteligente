import React from 'react';

import { LittleCard } from "~components/utils/card";
import { type FOODS, FOODS_COLORS, FOODS_DESCRIPTION, ICONS } from "~utils/const";
import { twJoin } from "tailwind-merge";
import { Button } from "~components/ui/button";

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
            action={<Button variant={"ghost"} shape="circle" size={"icon"}><ICONS.EDIT className="size-6 text-black" /></Button>}
        />
        <Button
            className="text-primary"
            variant="ghost"
        >
          <ICONS.INGREDIENTS /> <span className="text-sm font-light">Nuevo snack?</span>
        </Button>
      </div>
  );
}