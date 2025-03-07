import React, { type PropsWithChildren } from 'react';
import { twMerge } from "tailwind-merge";

interface Props {
  title?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Section(props: PropsWithChildren<Props>) {
  return (
      <section className={twMerge("w-full flex flex-col items-start gap-2 p-4 bg-primary-darker shadow-lg rounded-lg border", props.className)}>
        <header className="w-full flex items-center">
          {props.title && <h2 className="text-2xl font-bold grow">{props.title}</h2>}
          {props.action}
        </header>
        {props.children}
      </section>
  );
}