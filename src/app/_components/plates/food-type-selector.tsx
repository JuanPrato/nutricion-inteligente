"use client";

import { ToggleGroup, ToggleGroupItem } from "~components/ui/toggle-group";
import { Input } from "~components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~components/ui/form";
import { FOODS } from "~utils/const";
import type { Control, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  setInputValue?: (values: string[]) => void;
}

export function FoodTypeSelector<T extends FieldValues>(props: Props<T>) {
  const COMMON_BUTTONS_STYLES = "rounded-none! transition-none";

  function onChange(values: string[]) {
    if (props.setInputValue) props.setInputValue(values);
  }

  return (
    <>
      <ToggleGroup
        type="multiple"
        className="four-options grid w-full grid-cols-2"
        onValueChange={onChange}
      >
        <ToggleGroupItem
          value={FOODS.BREAKFAST}
          className={COMMON_BUTTONS_STYLES}
        >
          Desayuno
        </ToggleGroupItem>
        <ToggleGroupItem value={FOODS.LAUNCH} className={COMMON_BUTTONS_STYLES}>
          Almuerzo
        </ToggleGroupItem>
        <ToggleGroupItem
          value={FOODS.AFTER_LAUNCH}
          className={COMMON_BUTTONS_STYLES}
        >
          Merienda
        </ToggleGroupItem>
        <ToggleGroupItem value={FOODS.DINNER} className={COMMON_BUTTONS_STYLES}>
          Cena
        </ToggleGroupItem>
      </ToggleGroup>
      <FormField<T>
        control={props.control}
        name={"types" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
