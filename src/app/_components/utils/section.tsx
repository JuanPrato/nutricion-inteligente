import React, { PropsWithChildren } from 'react';

interface Props {
  title?: string;
}

export function Section(props: PropsWithChildren<Props>) {
  return (
      <section className="w-full flex flex-col gap-2 p-4 bg-primary-darker shadow-lg rounded-lg border">
        {props.title && <h2 className="text-2xl font-bold">{props.title}</h2>}
        {props.children}
      </section>
  );
}