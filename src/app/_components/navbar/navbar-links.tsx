import { IoHomeOutline } from "react-icons/io5";
import { PiForkKnife } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";

import { LinkButton } from "~/app/_components/utils/button";
import { ROUTES } from "~/app/utils/const";

function NavbarLinks() {
  return (
      <section className="p-4 flex flex-col gap-2 border-b border-primary-dark grow">
        <LinkButton
          href={ROUTES.HOME}
        >
          <IoHomeOutline className="size-6" /> <span className="text-xl font-normal">Inicio</span>
        </LinkButton>
        <LinkButton
          href={ROUTES.PLATES}
        >
          <PiForkKnife className="size-6" /> <span className="text-xl font-normal">Platos</span>
        </LinkButton>
        <LinkButton
          href={ROUTES.PROFILE}
        >
          <RxAvatar className="size-6" /> <span className="text-xl font-normal">Perfil</span>
        </LinkButton>
    </section>
  );
}

export default NavbarLinks;
