"use client";

import { Button } from "~components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

interface LinkButtonProps {
  href?: string;
}

export function LinkButton(props: PropsWithChildren<LinkButtonProps>) {

  const pathname = usePathname();

  return (
    <Button
        className="justify-start"
        variant={props.href === pathname ? "default" : "ghost"}
        asChild
    >
      <Link href={props.href ?? ""}>
        {props.children}
      </Link>
    </Button>
  );
}