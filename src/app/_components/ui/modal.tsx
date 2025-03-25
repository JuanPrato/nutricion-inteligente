"use client";

import type { PropsWithChildren, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "./dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  children: ReactNode;
  title: string;
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  return (
      <Dialog onOpenChange={props.onClose} open={props.isOpen} modal>
        <DialogContent className="text-primary bg-primary-light brightness-110 backdrop-blur-md max-w-[400px]! p-3">
          <DialogTitle className="text-primary text-center text-2xl">{props.title}</DialogTitle>
          <div className="px-3">{props.children}</div>
        </DialogContent>
      </Dialog>
  )
}