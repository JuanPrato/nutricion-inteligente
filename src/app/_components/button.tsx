import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface ButtonProps {
  children?: string;
  left?: IconType;
  selected?: boolean;
}

interface LinkButtonProps extends ButtonProps {
  href?: string;
}

export function Button(props: ButtonProps) {
  return (
      <button className={twMerge("w-full flex items-center gap-3 p-2 rounded-lg  transition-colors", props.selected && "bg-primary-dark", !props.selected && "hover:bg-primary-darker")}>
        {props.left && <props.left className="size-6" />} <span className="text-lg">{props.children}</span>
      </button>
  )
}


export function LinkButton(props: LinkButtonProps) {
  return <Link href={props.href ?? ""} className="w-full"><Button {...props} /></Link>
}