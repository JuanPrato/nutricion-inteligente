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
}

interface LinkButtonProps extends ButtonProps {
  href?: string;
}

export function Button(props: ButtonProps) {
  return (
      <button className={twMerge(
          "cursor-pointer flex items-center gap-3 p-2 rounded-lg transition-colors",
          props.selected && "bg-primary-dark",
          !props.selected && "hover:bg-primary-darker",
          props.full && "w-full"
      )}>
        {props.left} <span className="text-lg">{props.children}</span>
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