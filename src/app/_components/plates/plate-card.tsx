import { Card, CardActions, CardContent, CardHeader } from "~components/utils/card";
import { ICONS } from "~utils/const";
import { Button } from "../ui/button";

export function PlateCard() {
  return (
      <Card>
        <CardHeader title="Avocado toast" subtitle="689 kcal / 2 ingredientes" icon={ICONS.BREAKFAST} />
        <CardContent>
          <h5>Ingredientes:</h5>
          <ul className="text-sm">
            <li>Pan 100 kcal</li>
            <li>Palta 50 kcal</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button
              variant="warning"
              className="h-full grow">
            Editar
          </Button>
          <Button
              variant="destructive"
              className="h-full grow">
            Eliminar
          </Button>
        </CardActions>
      </Card>
  );
}