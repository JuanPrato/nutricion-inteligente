import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface LittleCardProps {
  principal: string;
  description?: string;
  top?: string;
  icon?: IconType;
  iconClassName?: string;
}

export function LittleCard(props: LittleCardProps) {
  return (
    <div className="little-card">
      {props.icon && (
        <div className="bg-primary-dark flex aspect-square h-full min-h-[75px] items-center justify-center rounded-full">
          {<props.icon className={twMerge("aspect-square size-[75%]", props.iconClassName)} />}
        </div>
      )}
      <div className="grow flex flex-col">
        <p className="text-lg">{props.top}</p>
        <h3 className="text-2xl">{props.principal}</h3>
        <h5 className="text-sm text-gray-200">{props.description}</h5>
      </div>
    </div>
  );
}