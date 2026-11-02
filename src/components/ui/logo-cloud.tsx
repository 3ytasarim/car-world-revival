// Logo-Wolke nach dem 21st.dev-Muster "Logo Cloud" (efferd/logo-cloud-5) —
// responsives, zentriertes Raster; die Trennlinien entstehen durch gap-px auf
// getöntem Grund, dadurch hat auch die äußere Kontur (inkl. Rundung) eine Linie.
// Registry-Quelle verlangt Login (CLI nicht nutzbar), daher nach der
// Beschreibung nachgebaut. Logos sind zunächst blass/schwarzweiß und werden
// beim Hover farbig.
//
// Größen: Breite/Höhe werden aus dem Seitenverhältnis so berechnet, dass jedes
// Logo dieselbe Fläche einnimmt (sonst wirken breite Logos wie ERGO/Allianz
// riesig und quadratische wie AXA/HUK winzig) — mit Obergrenzen für Breite und
// Höhe.
export type CloudLogo = { src: string; alt: string; aspect?: number };

const TARGET_AREA = 7500; // px² — entspricht der Fläche des ERGO-Logos
const MAX_W = 190;
const MAX_H = 96;

function logoSize(aspect: number) {
  let w = Math.sqrt(TARGET_AREA * aspect);
  let h = w / aspect;
  const k = Math.min(1, MAX_W / w, MAX_H / h);
  w *= k;
  h *= k;
  return { width: Math.round(w), height: Math.round(h) };
}

export function LogoCloud({ logos }: { logos: CloudLogo[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-5">
      {logos.map((l) => (
        <div
          key={l.alt}
          className="group flex h-28 items-center justify-center bg-white px-4 sm:h-32"
        >
          <img
            src={l.src}
            alt={l.alt}
            loading="lazy"
            style={l.aspect ? logoSize(l.aspect) : undefined}
            className="max-w-full object-contain opacity-50 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
}

export default LogoCloud;
