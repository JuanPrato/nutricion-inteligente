import * as React from "react"

import { cn } from "~/lib/utils"
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { IconType } from "react-icons";
import type { ReactNode } from "react";

const littleCardVariants = cva(
    "flex-row h-[75px] px-4 py-1 gap-1 m-0 w-full overflow-hidden",
    {
      variants: {
        size: {
          default: "[&_.little-card-content]:flex-col [&_.little-card-content]:items-start [&_.little-card-content]:max-w-1/2",
          small:
              "h-[50px] items-center [&_.card-description]:text-muted [&_.card-description]:ml-1 [&_.little-card-content]:h-fit [&_.little-card-content]:flex-row [&_.little-card-content]:justify-start [&_.little-card-content]:items-baseline"
        }
      },
      defaultVariants: {
        size: "default"
      }
    }
);

interface LittleCardProps {
  principal: string;
  description?: string;
  top?: string;
  icon?: IconType;
  iconClassName?: string;
  action?: ReactNode;
}

export function LittleCard(props: LittleCardProps & VariantProps<typeof littleCardVariants>) {

  const classes = cn(littleCardVariants({ size: props.size }));
  
  return (
    <Card className={classes}>
      {props.icon && (
        <div className="center h-full w-1/4">
          {
            <props.icon
              className={twMerge(
                "bg-primary-dark aspect-square h-[60px] w-[60px] overflow-visible rounded-full p-2",
                props.iconClassName,
              )}
            />
          }
        </div>
      )}
      <div className="little-card-content flex h-full grow flex-col justify-center leading-none">
        <p className="text-md">{props.top}</p>
        <h3 className={twMerge("text-xl", props.size === "small" && "text-lg")}>{props.principal}</h3>
        <h5 className="text-primary card-description block overflow-hidden text-sm overflow-ellipsis whitespace-nowrap">
          {props.description}
        </h5>
      </div>
      {props.action && <div className="center w-1/4">{props.action}</div>}
    </Card>
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-2 rounded-xl py-6 relative",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
      <div
        data-slot="card-icon"
        className={cn("center gap-1 px-1 bg-primary-dark aspect-square rounded-full size-[40px] absolute top-6 right-6", className)}
        {...props}
      />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardIcon,
  CardAction,
  CardDescription,
  CardContent,
}
