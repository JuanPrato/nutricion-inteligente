import { Section } from "~components/utils/section";

export function ProfileConfiguration() {
  return (
      <Section title="Configuración">
        <div className="w-full flex justify-between mb-2">
          <label htmlFor="nigth">Modo oscuro</label>
          <input type="checkbox" name="nigth" id="nigth" className="size-6 rounded-md" />
        </div>
        <div className="w-full flex justify-between">
          <label htmlFor="kcal">Objetivo diario de kcal</label>
          <div className="flex gap-1 text-gray-200">
            <input type="number" name="kcal" id="kcal" placeholder="1000" className="border-b text-right"></input>
            <p>kcal</p>
          </div>
        </div>
      </Section>
  );
}
