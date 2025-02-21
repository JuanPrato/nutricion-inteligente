export const ROUTES = {
  HOME: "/",
  PLATES: "/platos",
  PROFILE: "/perfil",
  LOGIN: "/login",
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];