import React from 'react';
import { FiTarget } from "react-icons/fi";
import { Section } from "~components/utils/section";
import { LittleCard } from "~components/utils/card";

function DailySummary() {
  return (
      <Section title="Resumen diario">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-4xl font-bold">150 kcal</h2>
              <h4>Consumidas hoy</h4>
              <progress value={.5} className="w-full rounded-lg overflow-hidden progress-bar" />
              <h4>50% completado</h4>
            </div>
            <h4 className="text-2xl">¡Dale que llegamos!</h4>
          </div>
          <div>
            <LittleCard principal="2000 kcal" top="Meta diaria" description="100 kcal restantes" icon={FiTarget} iconClassName="text-blue-500" />
          </div>
        </div>
      </Section>
  );
}

export default DailySummary;