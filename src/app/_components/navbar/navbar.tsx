import type { User } from "next-auth";

import Image from "next/image";

import { ROUTES } from "~/app/utils/const";
import Link from "next/link";
import NavbarLinks from "~/app/_components/navbar/navbar-links";

export function Navbar({ user }: { user: User }) {
  return (
    <aside className="bg-primary-darker min-w-[320px] h-screen shadow-lg flex flex-col sticky top-0">
      <section className="py-4 flex flex-col items-center gap-4 border-b border-primary-dark">
        <div className="aspect-square bg-primary-dark rounded-full relative w-1/3 overflow-hidden">
          <Image src={user.image ?? ""} alt="profile picture" fill></Image>
        </div>
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
