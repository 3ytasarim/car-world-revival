import { useState } from "react";
import {
  Briefcase,
  Handshake,
  House,
  Mail,
  Menu,
  Phone,
  Star,
  Tag,
  Wrench,
  X,
} from "lucide-react";

import logo from "@/assets/logo.png.asset.json";
import { NAV, PHONE_DISPLAY, PHONE_HREF } from "./site-data";

const icons = {
  house: House,
  tag: Tag,
  wrench: Wrench,
  star: Star,
  briefcase: Briefcase,
  mail: Mail,
  handshake: Handshake,
} as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6">
        <a aria-label="Car-World" className="justify-self-start" href="/">
          <img src={logo.url} alt="Car-World" width={243} height={120} className="h-11 w-auto" />
        </a>

        <nav className="hidden justify-self-center md:block">
          <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/60 px-1 py-1 shadow-lg backdrop-blur-lg">
            {NAV.map((item, i) => {
              const Icon = icons[item.icon];
              const active = i === 0;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-gray-950 ${
                    active ? "text-brand-orange" : "text-gray-700"
                  }`}
                >
                  <Icon className="hidden lg:inline" size={15} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item.label}</span>
                  {active && (
                    <div className="absolute inset-0 -z-10 rounded-full">
                      <div className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-brand-orange">
                        <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-brand-orange/30 blur-md" />
                        <div className="absolute -top-1 h-6 w-8 rounded-full bg-brand-orange/30 blur-md" />
                        <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-brand-orange/30 blur-sm" />
                      </div>
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        <div className="hidden items-center gap-2 justify-self-end md:flex">
          <a
            href={PHONE_HREF}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:bg-black/5 hover:text-gray-900"
          >
            <Phone className="size-4" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="/termin"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand-orange px-2.5 text-sm font-medium whitespace-nowrap text-brand-orange-foreground transition-colors hover:bg-brand-orange/90"
          >
            Termin buchen
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex size-8 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-black/5 hover:text-gray-900 md:hidden"
        >
          {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
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
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-black/5"
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
