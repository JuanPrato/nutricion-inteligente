import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import type { ReactNode } from "react";

interface LittleCardProps {
  principal: string;
  description?: string;
  top?: string;
  icon?: IconType;
  iconClassName?: string;
  action?: ReactNode;
  small?: boolean;
}

export function LittleCard(props: LittleCardProps) {
  return (
    <div className="little-card">
      {props.icon && (
        <div className="bg-primary-dark flex aspect-square h-full items-center justify-center rounded-full">
          {<props.icon className={twMerge("aspect-square size-[75%]", props.iconClassName)} />}
        </div>
      )}
      <div className="w-full h-full flex flex-col justify-center leading-none">
        <p className="text-md">{props.top}</p>
        <h3 className="text-xl">{props.principal}</h3>
        <h5 className="text-sm text-primary">{props.description}</h5>
      </div>
      {
        props.action && (
            <div className="w-[75px]">
              {props.action}
            </div>
          )
      }
    </div>
  );
}