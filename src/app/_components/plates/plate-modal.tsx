"use client";

import { Modal } from "~components/ui/modal";
import { FoodTypeSelector } from "~components/plates/food-type-selector";
import { IngredientsSelector } from "~components/plates/ingredients-selector";
import { Button } from "~components/ui/button";
import { TextInput } from "~components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "~components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PlateModalProps {
  open: boolean;
  onClose: () => void;
}

const FormSchema = z.object({
  name: z.string().min(5, { message: "Se debe ingresar un nombre al plato" }),
  types: z
    .array(z.string())
    .min(1, { message: "Se debe seleccionar una categoría" }),
  ingredients: z
    .array(z.number())
    .min(1, { message: "Se debe ingresar un ingrediente" }),
});

export function PlateModal(props: PlateModalProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      types: [],
      ingredients: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  function onClose() {
    props.onClose();
    form.reset();
  }

  return (
    <Modal
      isOpen={props.open}
      onClose={onClose}
      title="Crear un nuevo plato"
    >
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <TextInput<z.infer<typeof FormSchema>>
            label="Nombre del nuevo plato"
            name="name"
            placeholder="Avocado toast"
            autoComplete={"off"}
            control={form.control}
          />
          <FoodTypeSelector<z.infer<typeof FormSchema>>
            control={form.control}
            setInputValue={(values: string[]) => form.setValue("types", values)}
          />
          <IngredientsSelector<z.infer<typeof FormSchema>>
            control={form.control}
            setInputValue={(values: number[]) =>
              form.setValue("ingredients", values)
            }
          />
          <Button variant="success" type={"submit"}>
            Guardar
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
