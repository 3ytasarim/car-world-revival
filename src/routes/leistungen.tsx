import { createFileRoute, Outlet } from "@tanstack/react-router";

// Reiner Layout-Route: die eigentliche /leistungen-Seite lebt in
// leistungen.index.tsx, Unterseiten (z.B. /leistungen/unfallservice) sind
// eigene Geschwister-Routen unter leistungen.<slug>.tsx.
export const Route = createFileRoute("/leistungen")({
  component: () => <Outlet />,
});
