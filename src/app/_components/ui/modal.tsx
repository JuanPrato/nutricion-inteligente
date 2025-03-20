"use client";

import type { PropsWithChildren, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "./dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  return (
      <Dialog onOpenChange={props.onClose} open={props.isOpen} modal>
        <DialogContent className="text-primary bg-primary-light brightness-110 backdrop-blur-md p-2 max-w-[400px]!">
          <DialogTitle className="text-primary text-center text-2xl">{props.title}</DialogTitle>
          <div className="p-6">{props.children}</div>
        </DialogContent>
      </Dialog>
  )
}