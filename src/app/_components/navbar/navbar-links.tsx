import { IoHomeOutline } from "react-icons/io5";
import { PiForkKnife } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";

import { LinkButton } from "~/app/_components/utils/button";
import { ROUTES } from "~/app/utils/const";

function NavbarLinks() {

  return (
      <section className="p-4 flex flex-col gap-2 border-b border-primary-dark grow">
        <LinkButton left={<IoHomeOutline className="size-6" />} href={ROUTES.HOME} full>
          Inicio
        </LinkButton>
        <LinkButton left={<PiForkKnife className="size-6" />} href={ROUTES.PLATES} full>
          Platos
        </LinkButton>
        <LinkButton left={<RxAvatar className="size-6" />} href={ROUTES.PROFILE} full>
          Perfil
        </LinkButton>
    </section>
  );
}

export default NavbarLinks;
