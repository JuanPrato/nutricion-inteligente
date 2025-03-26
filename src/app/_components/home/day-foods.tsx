import { Section } from "~components/utils/section";
import { DayFood } from "~components/home/day-food";
import { FOODS } from "~utils/const";
import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";

async function DayFoods() {

  const foods = await api.foods.getTodayFoods();

  async function revalidate() {
    "use server";

    revalidatePath("");
  }

  return (
    <Section title="Comidas del día">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <DayFood foodType={FOODS.BREAKFAST} foods={foods[FOODS.BREAKFAST]} revalidate={revalidate} />
        <DayFood foodType={FOODS.LAUNCH} foods={foods[FOODS.LAUNCH]} revalidate={revalidate} />
        <DayFood foodType={FOODS.AFTER_LAUNCH} foods={foods[FOODS.AFTER_LAUNCH]} revalidate={revalidate} />
        <DayFood foodType={FOODS.DINNER} foods={foods[FOODS.DINNER]} revalidate={revalidate} />
      </div>
    </Section>
  );
}

export default DayFoods;