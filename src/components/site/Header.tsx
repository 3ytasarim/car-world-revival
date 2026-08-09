import { useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <a aria-label="Car-World" href="/" className="group relative flex items-center">
      <style>{`
        @keyframes cw-logo-in { 0%{opacity:0;transform:translateY(6px) scale(.94)} 100%{opacity:1;transform:none} }
        @keyframes cw-logo-sheen { 0%{transform:translateX(-140%)} 55%,100%{transform:translateX(240%)} }
        @keyframes cw-car-pass { 0%{left:-18%;opacity:0} 12%{opacity:1} 78%{opacity:1;left:82%} 100%{left:98%;opacity:0} }
      `}</style>

      <span className="pointer-events-none absolute -inset-3 -z-10 rounded-full bg-brand-orange/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <span className="relative overflow-hidden">
        <img
          src={logo.url}
          alt="Car-World"
          width={243}
          height={120}
          className="h-16 w-auto transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-rotate-1 sm:h-20"
          style={ready ? { animation: "cw-logo-in 900ms cubic-bezier(.22,1,.36,1) both" } : { opacity: 0 }}
        />
        {/* Premium-Sheen über dem Logo */}
        <span
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/70 to-transparent"
          style={ready ? { animation: "cw-logo-sheen 5.5s ease-in-out 0.8s infinite" } : undefined}
          aria-hidden="true"
        />
      </span>

      {/* Abschleppwagen, der dezent am Logo vorbeifährt */}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-5 w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 72 26"
          className="absolute top-0 h-5 w-14 text-brand-orange/75"
          style={ready ? { animation: "cw-car-pass 9s cubic-bezier(.5,0,.2,1) 1.6s infinite" } : { opacity: 0 }}
          fill="currentColor"
        >
          {/* Kranarm */}
          <path d="M26 15V9h3v4.2l16-8.2 1.4 2.7L31 15.6V15h-5Z" />
          <path d="M45.6 3.6h7.2v2.6h-7.2z" />
          {/* Haken */}
          <path d="M50 6.2h2v3.4a2.4 2.4 0 1 1-2.6 2.4h2V6.2Z" />
          {/* Ladefläche + Kabine */}
          <path d="M2 18h30v-6H2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" />
          <path d="M32 18h30a2 2 0 0 0 2-2v-2a3 3 0 0 0-2.3-2.9l-5.2-1.3-3.6-3.1A5 5 0 0 0 49.6 5.4H32V18Z" opacity=".92" />
          {/* Räder */}
          <circle cx="14" cy="19.4" r="4" />
          <circle cx="52" cy="19.4" r="4" />
        </svg>
      </span>

    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <AnimatedLogo />

        <nav className="hidden md:block">
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 shadow-lg backdrop-blur-lg lg:gap-4 lg:px-5">
            {NAV.map((item, i) => {
              const Icon = icons[item.icon];
              const active = i === 0;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-gray-950 lg:px-4 ${
                    active ? "text-brand-orange" : "text-gray-700"
                  }`}
                >
                  <Icon className="hidden lg:inline" size={15} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-brand-orange" />
                  )}
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
          className="inline-flex size-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-black/5 hover:text-gray-900 md:hidden"
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
