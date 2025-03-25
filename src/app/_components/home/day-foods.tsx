import { Section } from "~components/utils/section";
import { DayFood } from "~components/home/day-food";
import { FOODS } from "~utils/const";
import { api } from "~/trpc/server";

async function DayFoods() {

  const foods = await api.foods.getTodayFoods();

  return (
    <Section title="Comidas del día">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <DayFood foodType={FOODS.BREAKFAST} foods={foods[FOODS.BREAKFAST]}  />
        <DayFood foodType={FOODS.LAUNCH} foods={foods[FOODS.LAUNCH]} />
        <DayFood foodType={FOODS.AFTER_LAUNCH} foods={foods[FOODS.AFTER_LAUNCH]} />
        <DayFood foodType={FOODS.DINNER} foods={foods[FOODS.DINNER]} />
      </div>
    </Section>
  );
}

export default DayFoods;