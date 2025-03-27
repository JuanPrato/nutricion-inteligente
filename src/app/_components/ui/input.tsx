import * as React from "react"

import { cn } from "~/lib/utils"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~components/ui/form";
import type { Control, FieldValues, Path } from "react-hook-form";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

type TextInputProps<T extends FieldValues> = Omit<React.ComponentProps<"input">, "name"> & {
  label?: string;
  control?: Control<T>;
  name: Path<T>;
}

function TextInput<T extends FieldValues>(props: TextInputProps<T>) {

  const control = props.control;
  const name = props.name ?? "";

  const propsRest = { ...props, control: undefined, name: undefined };

  return (
      <FormField<T>
          control={control}
          name={name ?? ""}
          render={({ field }) => (
            <FormItem className="grid w-full max-w-sm items-center gap-1.5">
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <Input type="text" {...propsRest} {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
    />
  )
}

export { Input, TextInput }
