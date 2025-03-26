import { FiTarget } from "react-icons/fi";
import { Section } from "~components/utils/section";
import { LittleCard } from "~components/ui/card";
import { api } from "~/trpc/server";
import { makeDateKey } from "~/lib/utils";

const CALORY_TARGET = 2000;

async function DailySummary() {

  const { [makeDateKey()]: calories } = await api.foods.getCalories();

  const percentageC = ((calories ?? 0) * 100) / CALORY_TARGET

  return (
    <Section title="Resumen diario">
      <div className="grid w-full grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-4xl font-bold">{calories} kcal</h2>
            <h4>Consumidas hoy</h4>
            <progress
              value={percentageC}
              max={100}
              className="progress-bar w-full overflow-hidden rounded-lg"
            />
            <h4>{Math.round(percentageC)}% completado</h4>
          </div>
          <h4 className="text-2xl">¡Dale que llegamos!</h4>
        </div>
        <div>
          <LittleCard
            principal={`${CALORY_TARGET} kcal`}
            top="Meta diaria"
            description={`${Math.max(CALORY_TARGET - (calories ?? 0), 0)} kcal restantes`}
            icon={FiTarget}
            iconClassName="text-blue-500"
          />
        </div>
      </div>
    </Section>
  );
}

export default DailySummary;