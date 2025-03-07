"use client";

import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ButtonProps {
  children?: string;
  left?: ReactNode;
  selected?: boolean;
  full?: boolean;
  circle?: boolean;
  outlined?: boolean;
  className?: string;
  textClassName?: string;
}

interface LinkButtonProps extends ButtonProps {
  href?: string;
}

export function Button(props: ButtonProps) {
  return (
      <button className={twMerge(
          "cursor-pointer flex items-center gap-3 p-2 rounded-md transition-[backdrop-filter]",
          props.selected && "bg-primary-dark",
          !props.selected && "hover:backdrop-brightness-90",
          props.full ? "w-full" : "w-2/3",
          props.circle && "rounded-full",
          props.outlined && "outline outline-primary",
          props.className
      )}>
        {props.left} {props.children && <span className={twMerge("text-lg", props.textClassName)}>{props.children}</span>}
      </button>
  )
}


export function LinkButton(props: LinkButtonProps) {

  const pathname = usePathname();

  return (
    <Link href={props.href ?? ""} className={twMerge(props.full && "w-full")}>
      <Button {...{ ...props, selected: props.href === pathname }} />
    </Link>
  );
}