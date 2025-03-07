import React from 'react';
import Image from "next/image";

interface AvatarProps {
  img?: string | null | undefined;
  alt?: string;
}

export function Avatar(props: AvatarProps) {
  return (
      <div className="aspect-square bg-primary-dark rounded-full relative w-1/3 overflow-hidden">
        <Image src={props.img ?? ""} alt={props.alt ?? ""} fill></Image>
      </div>
  );
}