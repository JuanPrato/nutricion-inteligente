import { Button } from "../ui/button";

export function FoodTypeSelector() {

  const COMMON_BUTTONS_STYLES = "rounded-none transition-none";

  return (
      <div className="text-primary four-options grid grid-cols-2">
        <Button
          className={COMMON_BUTTONS_STYLES}
        >
          Desayuno
        </Button>
        <Button
          className={COMMON_BUTTONS_STYLES}
        >
          Almuerzo
        </Button>
        <Button
          className={COMMON_BUTTONS_STYLES}
        >
          Merienda
        </Button>
        <Button
          className={COMMON_BUTTONS_STYLES}
        >
          Cena
        </Button>
      </div>
  );
}