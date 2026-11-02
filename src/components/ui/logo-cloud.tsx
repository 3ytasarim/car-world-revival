// Logo-Wolke nach dem 21st.dev-Muster "Logo Cloud" (efferd/logo-cloud-5) —
// responsives, zentriertes Raster; die Trennlinien entstehen durch gap-px auf
// getöntem Grund, dadurch hat auch die äußere Kontur (inkl. Rundung) eine Linie. Registry-Quelle
// verlangt Login (CLI nicht nutzbar), daher nach der Beschreibung nachgebaut.
// Logos sind zunächst blass/schwarzweiß und werden beim Hover farbig.
export type CloudLogo = { src: string; alt: string };

export function LogoCloud({ logos }: { logos: CloudLogo[] }) {
  return (
    <div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-5">
      {logos.map((l) => (
        <div
          key={l.alt}
          className="group flex h-24 items-center justify-center bg-white px-4 sm:h-28"
        >
          <img
            src={l.src}
            alt={l.alt}
            loading="lazy"
            className="max-h-10 w-auto max-w-full object-contain opacity-50 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-12"
          />
        </div>
      ))}
    </div>
  );
}

export default LogoCloud;
