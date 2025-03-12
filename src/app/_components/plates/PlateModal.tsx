"use client";

import { Modal } from "~components/utils/modal";
import { Button } from "~components/utils/button";
import { twMerge } from "tailwind-merge";
import { BiCamera, BiMicrophone } from "react-icons/bi";

interface PlateModalProps {
  open: boolean;
  onClose: () => void;
}

export function PlateModal(props: PlateModalProps) {

  const COMMON_BUTTONS_STYLES = "rounded-none transition-none";

  return (
      <Modal isOpen={props.open} onClose={props.onClose}>
        <form className="min-w-[300px] flex flex-col gap-4">
          <h2 className="text-center text-2xl text-primary">Crear un nuevo plato</h2>
          <div className="flex flex-col">
            <label className="text-primary" htmlFor="name">
              Nombre del nuevo plato
            </label>
            <input type="text" name="name" id="name" className="outline-none border-b text-primary py-1" />
          </div>
          <input type="hidden" name="type" id="type" />
          <div className="grid grid-cols-2 text-primary">
            <Button full className={twMerge(COMMON_BUTTONS_STYLES, "rounded-tl-md border-2")}>Desayuno</Button>
            <Button full className={twMerge(COMMON_BUTTONS_STYLES, "rounded-tr-md border-t-2 border-r-2 border-b-2")}>Almuerzo</Button>
            <Button full className={twMerge(COMMON_BUTTONS_STYLES, "rounded-bl-md border-l-2 border-r-2 border-b-2")}>Merienda</Button>
            <Button full className={twMerge(COMMON_BUTTONS_STYLES, "rounded-br-md border-b-2 border-r-2")}>Cena</Button>
          </div>
          <div className="">
            <header className="flex w-full">
              <div className="flex flex-col grow text-primary">
                <h4 className="text-2xl">Ingredientes</h4>
                <h5 className="text-sm font-light text-muted">Total: 512 kcal</h5>
              </div>
              <div className="flex gap-2 items-center">
                <Button circle left={<BiMicrophone />} className="icon-container size-12" />
                <Button circle left={<BiCamera />} className="icon-container size-12" />
              </div>
            </header>
          </div>
          <Button full className="bg-success text-primary font-light flex justify-center">Guardar</Button>
        </form>
      </Modal>
  );
}