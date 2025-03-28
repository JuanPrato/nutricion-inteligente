import { ICONS } from "~utils/const";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../ui/card";
import type { Plate } from "~/lib/types";

interface PlateCardProps {
  plate: Plate;
}

export function PlateCard({ plate }: PlateCardProps) {

  const kcal = plate.ingredientsToPlates
      .reduce((current, acc) => current + (acc.ingredient.kcal ?? 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plate.name}</CardTitle>
        <CardDescription>
          {kcal} kcal / {plate.ingredientsToPlates.length} ingredientes
        </CardDescription>
      </CardHeader>
      <CardIcon>
        {
          plate.platesToCategories.map((category) => {
            const desc = category.category.description as (keyof typeof ICONS);
            const Icon = ICONS[desc];

            return <Icon key={category.categoryId} className="h-full" />
          })
        }
      </CardIcon>
      <CardContent className="grow">
        <h5>Ingredientes:</h5>
        <ul className="text-sm">
          {plate.ingredientsToPlates.map(({ ingredient }) => (
            <li key={ingredient.id}>
              {ingredient.name} {ingredient.kcal ?? 0} kcal
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="warning" className="h-full grow">
          Editar
        </Button>
        <Button variant="destructive" className="h-full grow">
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
}
