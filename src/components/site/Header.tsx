import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Briefcase, Handshake, House, Mail, Menu, Tag, Wrench, X } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";
import { NAV } from "./site-data";

const icons = {
  house: House,
  tag: Tag,
  wrench: Wrench,
  briefcase: Briefcase,
  mail: Mail,
  handshake: Handshake,
} as const;

function AnimatedLogo() {
  return (
    <a aria-label="Car-World" href="/" className="relative flex items-center">
      <img src={logo.url} alt="Car-World" width={243} height={120} className="h-16 w-auto sm:h-20" />
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-[#1B3A63] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <AnimatedLogo />

        <nav className="hidden md:block">
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-lg transition-colors duration-300 lg:gap-4 lg:px-5 ${
              scrolled ? "border-white/15 bg-white/10" : "border-[#1B3A63]/15 bg-transparent"
            }`}
          >
            {NAV.map((item) => {
              const Icon = icons[item.icon];
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors lg:px-4 ${
                    active
                      ? scrolled
                        ? "bg-white/15 text-[#A9CCEC]"
                        : "bg-[#8FB8E8]/45 text-[#123055]"
                      : scrolled
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-[#1B3A63] hover:bg-[#1B3A63]/8 hover:text-[#0B1626]"
                  }`}
                >
                  {active && (
                    <>
                      {/* Leuchtender Indikator über dem aktiven Punkt */}
                      <span className={`pointer-events-none absolute -top-[13px] left-1/2 h-1 w-8 -translate-x-1/2 rounded-full ${scrolled ? "bg-[#A9CCEC]" : "bg-[#5088C8]"}`} />
                      <span className={`pointer-events-none absolute -top-[13px] left-1/2 h-4 w-12 -translate-x-1/2 rounded-full blur-md ${scrolled ? "bg-[#A9CCEC]/35" : "bg-[#5088C8]/40"}`} />
                    </>
                  )}
                  <Icon className="hidden lg:inline" size={15} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </nav>


        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex size-10 items-center justify-center rounded-lg transition-colors md:hidden ${
            scrolled ? "text-white hover:bg-white/10" : "text-[#1B3A63] hover:bg-[#1B3A63]/10"
          }`}
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
