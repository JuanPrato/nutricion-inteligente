import React from 'react';
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  img?: string | null | undefined;
  alt?: string;
  className?: string;
}

export function Avatar(props: AvatarProps) {
  return (
      <div className={twMerge("aspect-square bg-primary-dark rounded-full relative w-1/3 overflow-hidden", props.className)}>
        <Image src={props.img ?? ""} alt={props.alt ?? ""} fill></Image>
      </div>
  );
}