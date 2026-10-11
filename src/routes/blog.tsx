import { createFileRoute, Outlet } from "@tanstack/react-router";

// Reiner Layout-Route: die Übersicht lebt in blog.index.tsx, einzelne
// Beiträge sind eigene Geschwister-Routen unter blog.$slug.tsx — gleiches
// Muster wie /leistungen (siehe leistungen.tsx für den Hintergrund dazu).
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
