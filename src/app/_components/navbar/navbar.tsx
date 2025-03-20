import type { User } from "next-auth";

import { ROUTES } from "~/app/utils/const";
import Link from "next/link";
import NavbarLinks from "~/app/_components/navbar/navbar-links";
import { Avatar } from "~components/utils/avatar";

export function Navbar({ user }: { user: User }) {
  return (
    <aside className="bg-primary-darker min-w-[150px] w-1/4 h-screen shadow-lg flex-col sticky top-0 hidden md:flex">
      <section className="py-4 flex flex-col items-center gap-4 border-b border-primary-dark">
        <Avatar img={user.image} alt="profile picture" />
        <h3 className="font-medium text-xl">{user.name}</h3>
      </section>
      <NavbarLinks />
      <section className="h-[75px] flex justify-center items-center">
        <Link href={ROUTES.HOME}>
          <h1 className="text-2xl">Nutrición inteligente</h1>
        </Link>
      </section>
    </aside>
  );
}
