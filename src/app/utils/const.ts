import { FiCoffee } from "react-icons/fi";
import { PiForkKnife } from "react-icons/pi";
import { LuCakeSlice, LuCandy, LuMoon, LuSave } from "react-icons/lu";
import { HiOutlinePencil, HiTrash } from "react-icons/hi";

export const ROUTES = {
  HOME: "/",
  PLATES: "/platos",
  PROFILE: "/perfil",
  LOGIN: "/login",
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

export const ICONS = {
  BREAKFAST: FiCoffee,
  LAUNCH: PiForkKnife,
  AFTER_LAUNCH: LuCakeSlice,
  DINNER: LuMoon,
  SNACK: LuCandy,
  INGREDIENTS: LuCandy,
  EDIT: HiOutlinePencil,
  DELETE: HiTrash,
  SAVE: LuSave
} as const;

export const FOODS_DESCRIPTION = {
  BREAKFAST: "Desayuno",
  LAUNCH: "Almuerzo",
  AFTER_LAUNCH: "Merienda",
  DINNER: "Cena",
  SNACK: "Snack",
} as const;

export const FOODS_COLORS = {
  BREAKFAST: "text-breakfast",
  LAUNCH: "text-launch",
  AFTER_LAUNCH: "text-after-launch",
  DINNER: "text-dinner",
  SNACK: "text-black",
} as const;

export enum FOODS {
  BREAKFAST = "BREAKFAST",
  LAUNCH = "LAUNCH",
  AFTER_LAUNCH = "AFTER_LAUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK"
}