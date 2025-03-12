"use client";

import { twJoin, twMerge } from "tailwind-merge";
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
  onClick?: () => void;
}

interface LinkButtonProps extends Omit<ButtonProps, "onClick"> {
  href?: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={twMerge(
        "relative flex cursor-pointer items-center gap-3 rounded-md p-2 overflow-hidden",
        props.selected && "bg-primary-dark",
        props.full ? "w-full" : "w-2/3",
        props.circle && "rounded-full",
        props.outlined && "outline-primary outline",
        props.className,
      )}
      onClick={props.onClick}
      type="button"
    >
      <div className={twJoin("absolute top-0 left-0 h-full w-full bg-white opacity-0", !props.selected && "hover:opacity-25")}></div>
      {props.left}{" "}
      {props.children && (
        <span className={twMerge("text-lg", props.textClassName)}>
          {props.children}
        </span>
      )}
    </button>
  );
}


export function LinkButton(props: LinkButtonProps) {

  const pathname = usePathname();

  return (
    <Link href={props.href ?? ""} className={twMerge(props.full && "w-full")}>
      <Button {...{ ...props, selected: props.href === pathname }} />
    </Link>
  );
}