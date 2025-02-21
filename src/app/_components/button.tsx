"use client";

import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ButtonProps {
  children?: string;
  left?: ReactNode;
  selected?: boolean;
}

interface LinkButtonProps extends ButtonProps {
  href?: string;
}

export function Button(props: ButtonProps) {
  return (
      <button className={twMerge("cursor-pointer w-full flex items-center gap-3 p-2 rounded-lg  transition-colors", props.selected && "bg-primary-dark", !props.selected && "hover:bg-primary-darker")}>
        {props.left} <span className="text-lg">{props.children}</span>
      </button>
  )
}


export function LinkButton(props: LinkButtonProps) {

  const pathname = usePathname();

  return (
    <Link href={props.href ?? ""} className="w-full">
      <Button {...{ ...props, selected: props.href === pathname }} />
    </Link>
  );
}