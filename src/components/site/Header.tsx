import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Briefcase, Handshake, House, Mail, Menu, Tag, Wrench, X } from "lucide-react";

import logoWhite from "@/assets/logo-white.png";
import badge10Jahre from "@/assets/badge-10jahre.png";
import supportImg from "@/assets/support-team.jpg";
import { SpinningLogo } from "./SpinningLogo";
import { NAV, PHONE_HREF } from "./site-data";

const icons = {
  house: House,
  tag: Tag,
  wrench: Wrench,
  briefcase: Briefcase,
  mail: Mail,
  handshake: Handshake,
} as const;

// Logo bleibt jetzt fest/statisch (das Wortmarke-Lockup soll immer lesbar
// sein) — nur das "10 Jahre"-Siegel daneben dreht sich weiter, wie zuvor
// der ganze Logo-Block.
function AnimatedLogo() {
  return (
    <a aria-label="Car-World — 10 Jahre Kfz-Meisterbetrieb" href="/" className="relative flex items-center gap-3 sm:gap-4">
      <img src={logoWhite} alt="Car-World Kfz-Meisterbetrieb & Gutachter" className="h-14 w-auto sm:h-20 lg:h-24" />
      <SpinningLogo src={badge10Jahre} alt="10 Jahre Car-World" className="h-12 w-auto sm:h-16 lg:h-20" duration={8} />
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 bg-[#1B3A63] shadow-lg">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-6 px-4 sm:h-24 md:px-10 lg:h-28 lg:px-14">
        <AnimatedLogo />

        {/* Nav + Service-Team-Foto als eine Gruppe rechtsbündig — vorher
            saß die Gruppe irgendwo in der Mitte mit viel Luft vor dem Foto,
            weil jedes Element einzeln im äußeren justify-between-Flex war. */}
        <div className="hidden items-center gap-6 md:ml-auto md:flex md:-mr-6 lg:-mr-[10px]">
          <nav>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-lg lg:gap-4 lg:px-5">
              {NAV.map((item) => {
                const Icon = icons[item.icon];
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors lg:px-4 ${
                      active ? "bg-white/15 text-[#A9CCEC]" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {active && (
                      <>
                        {/* Leuchtender Indikator über dem aktiven Punkt */}
                        <span className="pointer-events-none absolute -top-[13px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#A9CCEC]" />
                        <span className="pointer-events-none absolute -top-[13px] left-1/2 h-4 w-12 -translate-x-1/2 rounded-full bg-[#A9CCEC]/35 blur-md" />
                      </>
                    )}
                    <Icon className="hidden lg:inline" size={15} strokeWidth={2.5} aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Service-Team-Foto direkt neben Kontakt — anklickbar, ruft direkt
              an. Dasselbe Foto wie im Foto-Angebot-Bereich ("Sarah"), hier
              zusätzlich im Header, nicht als Ersatz dafür. */}
          <a
            href={PHONE_HREF}
            aria-label={`Sarah aus dem Serviceteam anrufen: ${PHONE_HREF.replace("tel:", "")}`}
            className="group flex shrink-0 items-center gap-2"
          >
            <span className="relative inline-block">
              <img
                src={supportImg}
                alt=""
                aria-hidden="true"
                width={128}
                height={128}
                className="size-10 rounded-full border-2 border-white/40 object-cover shadow-md transition-transform duration-300 group-hover:scale-105 lg:size-12"
              />
              <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-[#1B3A63] bg-[#25D366]" />
            </span>
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open && (
        <div className="mx-4 rounded-2xl border border-black/10 bg-white p-2 shadow-xl md:hidden">
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Menü schließen"
              onClick={() => setOpen(false)}
              className="inline-flex size-8 items-center justify-center rounded-lg text-gray-700 hover:bg-black/5"
            >
              <X className="size-5" />
            </button>
          </div>
          <nav className="flex flex-col pb-2">
            {NAV.map((item) => {
              const Icon = icons[item.icon];
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-gray-800 hover:bg-black/5"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
