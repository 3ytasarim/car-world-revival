import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getCurrentAdminFn } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const admin = await getCurrentAdminFn();
    if (!admin) throw redirect({ to: "/auth" });
    return { admin };
  },
  component: () => <Outlet />,
});
