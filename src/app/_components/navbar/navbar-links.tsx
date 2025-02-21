"use client";

import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { PiForkKnife } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";

import { LinkButton } from "~/app/_components/button";
import { ROUTES } from "~/app/utils/const";

function NavbarLinks() {

  const pathname = usePathname();

  return (
    <>
      <LinkButton left={IoHomeOutline} selected={ROUTES.HOME === pathname} href={ROUTES.HOME}>
        Inicio
      </LinkButton>
      <LinkButton left={PiForkKnife} selected={ROUTES.PLATES === pathname} href={ROUTES.PLATES}>
        Platos
      </LinkButton>
      <LinkButton left={RxAvatar} selected={ROUTES.PROFILE === pathname} href={ROUTES.PROFILE}>
        Perfil
      </LinkButton>
    </>
  );
}

export default NavbarLinks;
