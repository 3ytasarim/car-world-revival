import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button3D } from "@/components/ui/button-3d";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import { getCurrentAdminFn, loginFn } from "@/lib/auth.functions";
import logoWhite from "@/assets/logo-white.png";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Anmelden — Car-World Verwaltung" },
      { name: "description", content: "Interner Login zur Verwaltung von Angeboten, Stellen und SEO bei Car-World." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Anmelden — Car-World Verwaltung" },
      { property: "og:description", content: "Interner Zugang zum Car-World Adminbereich." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

// Kein Selbst-Registrieren mehr — Admin-Konten werden direkt in Neon
// angelegt, nicht über eine öffentliche Sign-up-Seite (anders als vorher
// mit Supabase Auth, wo sich jeder registrieren konnte).
function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentAdminFn().then((admin) => {
      if (admin) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await loginFn({ data: { email, password } });
      navigate({ to: "/admin", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-navy px-4">
      <ClientOnly fallback={null}>
        <DotGridBackground color="#DCEDFA" />
      </ClientOnly>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,11,20,0.55)_100%)]" />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/10 bg-[#0E1D33]/90 p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
        <div className="flex flex-col items-center text-center">
          <img src={logoWhite} alt="Car-World" className="h-14 w-auto" />
          <h1 className="mt-4 text-xl font-bold text-white">Car-World Verwaltung</h1>
          <p className="mt-1 text-sm text-white/60">Melden Sie sich an.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-white/80">
              Benutzername
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-[#8FB8E8] focus-visible:ring-[#8FB8E8]/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-white/80">
              Passwort
            </Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-white/15 bg-white/5 text-white placeholder:text-white/30 focus-visible:border-[#8FB8E8] focus-visible:ring-[#8FB8E8]/30"
            />
          </div>
          <Button3D as="button" type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? "Bitte warten…" : "Login"}
          </Button3D>
        </form>
      </div>
    </main>
  );
}
