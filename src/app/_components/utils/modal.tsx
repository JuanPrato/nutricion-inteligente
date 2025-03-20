"use client";

import React, { useRef, useEffect } from 'react';
import { Button } from "~components/ui/button";
import { X } from "lucide-react";

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
          className="relative top-1/2 left-1/2 overflow-visible rounded-md bg-primary-light brightness-110 backdrop:backdrop-brightness-75 backdrop:backdrop-blur-md -translate-[50%]"
          onClose={onClose}
          onClick={(e) => onClick(e)}
      >
        <Button
            shape="circle"
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 text-primary"
            onClick={onClose}
        >
          <X />
        </Button>
        <div className="p-6">{children}</div>
      </dialog>
  );
};