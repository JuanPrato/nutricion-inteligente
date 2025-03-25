"use client"

import { useEffect, useRef, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

import {
  Command,
  CommandEmpty, CommandGroup,
  CommandInput, CommandItem,
  CommandList,
} from "~components/ui/command";
import { cn } from "~/lib/utils";
import { Button } from "~components/ui/button";

interface Props {
  items: { value: string, label: string }[];
  searchPlaceholder?: string;
  onChange?: (v: string) => void;
}

export function Combobox(props: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (props.onChange !== undefined) props.onChange(value);
  }, [props, value]);

  return (
    <>
      <div ref={containerRef} className="fixed z-20 w-0"></div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="grow justify-between font-light"
          >
            {value
              ? props.items.find((item) => item.value === value)?.label
              : "Select item..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[300px] p-0 bg-primary-light backdrop-blur-lg"
          container={containerRef.current}
        >
          <Command className="bg-background">
            <CommandInput placeholder={props.searchPlaceholder ?? "Buscar..."} className="h-9 text-primary placeholder:text-primary" />
            <CommandList>
              <CommandEmpty className="text-primary">No se encontraron resultado.</CommandEmpty>
              <CommandGroup>
                {props.items.map((item) => (
                  <CommandItem
                    className="text-primary"
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
