"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from "~components/utils/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen && !dialog.open) {
        dialog.showModal();
      } else if (!isOpen && dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  function onClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      onClose();
    }
  }

  return (
      <dialog
          ref={dialogRef}
          className="relative top-1/2 left-1/2 rounded-md bg-primary-light brightness-110 backdrop:backdrop-brightness-75 backdrop:backdrop-blur-sm -translate-[50%]"
          onClose={onClose}
          onClick={(e) => onClick(e)}
      >
        <Button
            circle
            className="absolute top-2 right-2 w-auto size-6"
            onClick={onClose}
            textClassName="text-white"
        >
          &times;
        </Button>
        <div className="p-6">{children}</div>
      </dialog>
  );
};