import { FiCoffee } from "react-icons/fi";
import { PiForkKnife } from "react-icons/pi";
import { LuCakeSlice, LuCandy, LuMoon } from "react-icons/lu";
import { HiOutlinePencil } from "react-icons/hi";

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
  EDIT: HiOutlinePencil
}