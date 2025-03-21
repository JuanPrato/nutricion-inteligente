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
import { twMerge } from "tailwind-merge";

export function PlateCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avocado toast</CardTitle>
        <CardDescription>689 kcal / 2 ingredientes</CardDescription>
      </CardHeader>
      <CardIcon>
        <ICONS.BREAKFAST className={twMerge("h-full")} />
      </CardIcon>
      <CardContent>
        <h5>Ingredientes:</h5>
        <ul className="text-sm">
          <li>Pan 100 kcal</li>
          <li>Palta 50 kcal</li>
        </ul>
      </CardContent>
      <CardFooter className="gap-2 grid grid-cols-2">
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
