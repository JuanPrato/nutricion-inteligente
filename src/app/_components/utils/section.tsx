import type { PropsWithChildren } from 'react';

export function Section(props: PropsWithChildren) {
  return (
      <section className="w-full flex flex-col gap-2 p-4 bg-primary-darker shadow-lg rounded-lg border">
        {props.children}
      </section>
  );
}