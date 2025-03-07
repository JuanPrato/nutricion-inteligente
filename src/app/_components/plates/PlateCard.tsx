import { Card, CardActions, CardContent, CardHeader } from "~components/utils/card";
import { ICONS } from "~utils/const";
import { Button } from "~components/utils/button";

function PlateCard() {
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
              outlined
              className="h-full outline-warning text-warning bg-warning-tint"
              textClassName="text-sm font-medium w-full text-center">Editar
          </Button>
          <Button
              outlined
              className="h-full outline-danger text-danger bg-danger-tint"
              textClassName="text-sm font-medium w-full text-center">Eliminar
          </Button>
        </CardActions>
      </Card>
  );
}

export default PlateCard;