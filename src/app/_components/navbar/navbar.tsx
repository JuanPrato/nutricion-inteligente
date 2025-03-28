import type { User } from "next-auth";

import { ROUTES } from "~/app/utils/const";
import Link from "next/link";
import NavbarLinks from "~/app/_components/navbar/navbar-links";
import { Avatar } from "~components/utils/avatar";

export function Navbar({ user }: { user: User }) {
  return (
    <aside className="bg-primary-darker hidden md:flex w-[80px] lg:w-[300px] transition-[width] h-screen shrink-0 shadow-lg flex-col sticky top-0">
      <section className="py-4 flex flex-col items-center gap-4 border-b border-primary-dark">
        <Avatar img={user.image} alt="profile picture" />
        <h3 className="font-medium text-xl hidden lg:inline">{user.name}</h3>
      </section>
      <NavbarLinks />
      <section className="h-[75px] flex justify-center items-center">
        <Link href={ROUTES.HOME}>
          <h1 className="text-2xl">
            <span className="hidden lg:inline">Nutrición inteligente</span>
            <span className="lg:hidden">NI</span>
          </h1>
        </Link>
      </section>
    </aside>
  );
}
