import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import type { PropsWithChildren, ReactNode } from "react";

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
          {
            <props.icon
              className={twMerge(
                "aspect-square size-[75%]",
                props.iconClassName,
              )}
            />
          }
        </div>
      )}
      <div className="flex h-full w-full flex-col justify-center leading-none">
        <p className="text-md">{props.top}</p>
        <h3 className="text-xl">{props.principal}</h3>
        <h5 className="text-primary text-sm">{props.description}</h5>
      </div>
      {props.action && <div className="w-[75px]">{props.action}</div>}
    </div>
  );
}

export function Card(_: PropsWithChildren) {
  return <div className="card">{_.children}</div>;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: IconType;
}

export function CardHeader(props: CardHeaderProps) {
  return (
    <header className="card-header">
      <div className="card-top">
        <h2>{props.title}</h2>
        {props.subtitle && <h4>{props.subtitle}</h4>}
      </div>
      {props.icon && (
        <div className="icon-container">
          {
            <props.icon className={twMerge("size-[65%]")} />
          }
        </div>
      )}
    </header>
  );
}

export function CardContent(props: PropsWithChildren) {
  return (
      <div className="card-content">
        {props.children}
      </div>
  );
}

export function CardActions(props: PropsWithChildren) {
  return (
      <div className="card-actions">
        {props.children}
      </div>
  )
}