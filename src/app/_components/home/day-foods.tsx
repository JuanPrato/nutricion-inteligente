import React from "react";
import { Section } from "~components/utils/section";
import { DayFood } from "~components/home/day-food";
import { FOODS } from "~utils/const";

function DayFoods() {
  return (
    <Section title="Comidas del día">
      <div className="grid lg:grid-cols-4 gap-4 w-full">
        <DayFood food={FOODS.BREAKFAST} />
        <DayFood food={FOODS.LAUNCH} />
        <DayFood food={FOODS.AFTER_LAUNCH} />
        <DayFood food={FOODS.DINNER} />
      </div>
    </Section>
  );
}

export default DayFoods;