// Ported from 21st.dev (rahil1202/scanner-card-stream) — kept the real
// mechanic (Three.js particle field + 2D-canvas scanner particles + an
// ASCII-scramble "scan" reveal on each card as it crosses the center line),
// not a simplified stand-in. Two things had to change to embed it inside a
// bounded page section instead of the original full-viewport demo:
//   1. All sizing/camera math now reads the wrapper's own width via a ref
//      + ResizeObserver instead of `window.innerWidth` — otherwise the
//      canvases and scan line would be framed against the full browser
//      viewport and only partially visible inside a contained section.
//   2. The registry snippet elided the actual drag handlers and the effect
//      cleanup (shown as "no changes here" placeholders, gated in the paid
//      tier) even though the drag state fields (isDragging, lastMouseX,
//      velocity, friction) were fully declared — so those two pieces are a
//      completed implementation of what the component's own state machine
//      already called for, not a design deviation.
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";

const defaultCardImages: string[] = [];

const ASCII_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";
const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

type ScannerCardStreamProps = {
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: "clip" | "scramble";
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
};

const ScannerCardStream = ({
  initialSpeed = 150,
  direction = -1,
  cardImages = defaultCardImages,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = "scramble",
  cardWidth = 400,
  cardHeight = 250,
  className = "",
}: ScannerCardStreamProps) => {
  const [isScanning, setIsScanning] = useState(false);

  const cards = useMemo(() => {
    const totalCards = cardImages.length * repeat;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: cardImages[i % cardImages.length],
      ascii: generateCode(Math.floor(cardWidth / 6.5), Math.floor(cardHeight / 13)),
    }));
  }, [cardImages, repeat, cardWidth, cardHeight]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction,
    isDragging: false,
    lastMouseX: 0,
    lastTime: performance.now(),
    cardLineWidth: (cardWidth + cardGap) * cards.length,
    friction,
    minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });

  useEffect(() => {
    cardStreamState.current.cardLineWidth = (cardWidth + cardGap) * cards.length;
  }, [cards.length, cardWidth, cardGap]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;
    if (!wrapper || !cardLine || !particleCanvas || !scannerCanvas) return;

    cards.forEach((card) => originalAscii.current.set(card.id, card.ascii));
    let animationFrameId: number;
    let containerWidth = wrapper.offsetWidth || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-containerWidth / 2, containerWidth / 2, 125, -125, 1, 1000);
    camera.position.z = 100;
    const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
    renderer.setSize(containerWidth, 250);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 300;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, "hsl(217, 61%, 33%)");
    gradient.addColorStop(0.25, "hsl(217, 64%, 6%)");
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();
    const texture = new THREE.CanvasTexture(texCanvas);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * containerWidth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `attribute float alpha; varying float vAlpha; void main() { vAlpha = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = 15.0; gl_Position = projectionMatrix * mvPosition; }`,
      fragmentShader: `uniform sampler2D pointTexture; varying float vAlpha; void main() { gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord); }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const ctx = scannerCanvas.getContext("2d")!;
    scannerCanvas.width = containerWidth;
    scannerCanvas.height = 300;
    let scannerParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;
      decay: number;
    }> = [];
    const baseMaxParticles = 500;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 1600;
    const createScannerParticle = () => ({
      x: containerWidth / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * 300,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.005,
    });
    for (let i = 0; i < baseMaxParticles; i++) scannerParticles.push(createScannerParticle());

    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
      if (element.dataset["scrambling"] === "true") return;
      element.dataset["scrambling"] = "true";
      const originalText = originalAscii.current.get(cardId) || "";
      let scrambleCount = 0;
      const maxScrambles = 10;
      const interval = setInterval(() => {
        element.textContent = generateCode(Math.floor(cardWidth / 6.5), Math.floor(cardHeight / 13));
        scrambleCount++;
        if (scrambleCount >= maxScrambles) {
          clearInterval(interval);
          element.textContent = originalText;
          delete element.dataset["scrambling"];
        }
      }, 30);
    };

    const updateCardEffects = () => {
      const scannerX = containerWidth / 2;
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyCardIsScanning = false;
      const wrapperRect = wrapper.getBoundingClientRect();
      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((cardWrapper, index) => {
        const rect = cardWrapper.getBoundingClientRect();
        const left = rect.left - wrapperRect.left;
        const right = rect.right - wrapperRect.left;
        const normalCard = cardWrapper.querySelector<HTMLElement>(".card-normal")!;
        const asciiCard = cardWrapper.querySelector<HTMLElement>(".card-ascii")!;
        const asciiContent = asciiCard.querySelector<HTMLElement>("pre")!;
        if (left < scannerRight && right > scannerLeft) {
          anyCardIsScanning = true;
          if (scanEffect === "scramble" && cardWrapper.dataset["scanned"] !== "true") {
            runScrambleEffect(asciiContent, index);
          }
          cardWrapper.dataset["scanned"] = "true";
          const intersectLeft = Math.max(scannerLeft - left, 0);
          const intersectRight = Math.min(scannerRight - left, right - left);
          normalCard.style.setProperty("--clip-right", `${(intersectLeft / (right - left)) * 100}%`);
          asciiCard.style.setProperty("--clip-left", `${(intersectRight / (right - left)) * 100}%`);
        } else {
          delete cardWrapper.dataset["scanned"];
          if (right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });
      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };

    const getClientX = (e: MouseEvent | TouchEvent) => ("touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX);

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      cardStreamState.current.isDragging = true;
      cardStreamState.current.lastMouseX = getClientX(e);
      cardStreamState.current.lastTime = performance.now();
      cardLine.style.cursor = "grabbing";
    };
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!cardStreamState.current.isDragging) return;
      const x = getClientX(e);
      const now = performance.now();
      const dt = Math.max((now - cardStreamState.current.lastTime) / 1000, 1 / 120);
      const delta = x - cardStreamState.current.lastMouseX;
      cardStreamState.current.position += delta;
      cardStreamState.current.velocity = Math.abs(delta / dt);
      cardStreamState.current.direction = delta >= 0 ? 1 : -1;
      cardStreamState.current.lastMouseX = x;
      cardStreamState.current.lastTime = now;
    };
    const handleMouseUp = () => {
      cardStreamState.current.isDragging = false;
      cardLine.style.cursor = "grab";
    };
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cardStreamState.current.position -= e.deltaY;
      cardStreamState.current.velocity = Math.max(Math.abs(e.deltaY) * 4, cardStreamState.current.minVelocity);
      cardStreamState.current.direction = e.deltaY >= 0 ? -1 : 1;
    };

    cardLine.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;
      if (!cardStreamState.current.isDragging) {
        if (cardStreamState.current.velocity > cardStreamState.current.minVelocity) {
          cardStreamState.current.velocity *= cardStreamState.current.friction;
        }
        cardStreamState.current.position += cardStreamState.current.velocity * cardStreamState.current.direction * Math.min(deltaTime, 0.05);
      }
      const { position, cardLineWidth } = cardStreamState.current;
      if (position < -cardLineWidth) cardStreamState.current.position = containerWidth;
      else if (position > containerWidth) cardStreamState.current.position = -cardLineWidth;
      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();

      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3]! += velocities[i]! * 0.016;
        if (positions[i * 3]! > containerWidth / 2 + 100) positions[i * 3] = -containerWidth / 2 - 100;
        positions[i * 3 + 1]! += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(0.1, Math.min(1, alphas[i]! + (Math.random() - 0.5) * 0.05));
      }
      geometry.attributes["position"]!.needsUpdate = true;
      geometry.attributes["alpha"]!.needsUpdate = true;
      renderer.render(scene, camera);

      ctx.clearRect(0, 0, containerWidth, 300);
      const targetCount = scannerState.current.isScanning ? scanTargetMaxParticles : baseMaxParticles;
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;
      while (scannerParticles.length < currentMaxParticles) scannerParticles.push(createScannerParticle());
      while (scannerParticles.length > currentMaxParticles) scannerParticles.pop();
      scannerParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0 || p.x > containerWidth) Object.assign(p, createScannerParticle());
        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      containerWidth = entry.contentRect.width || containerWidth;
      camera.left = -containerWidth / 2;
      camera.right = containerWidth / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(containerWidth, 250);
      scannerCanvas.width = containerWidth;
    });
    resizeObserver.observe(wrapper);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      cardLine.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cardLine.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      cardLine.removeEventListener("wheel", handleWheel);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, cardGap, friction, scanEffect, cardWidth, cardHeight]);

  return (
    <div ref={wrapperRef} className={`relative w-full overflow-hidden ${className}`}>
      <style>{`
        @keyframes scanner-card-glitch { 0%, 16%, 50%, 100% { opacity: 1; } 15%, 99% { opacity: 0.9; } 49% { opacity: 0.8; } }
        .scanner-card-glitch { animation: scanner-card-glitch 0.1s infinite linear alternate-reverse; }
        @keyframes scanner-card-scan-pulse { 0% { opacity: 0.75; transform: scaleY(1); } 100% { opacity: 1; transform: scaleY(1.03); } }
        .scanner-card-scan-pulse { animation: scanner-card-scan-pulse 1.5s infinite alternate ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .scanner-card-glitch, .scanner-card-scan-pulse { animation: none; }
        }
      `}</style>

      <canvas ref={particleCanvasRef} className="pointer-events-none absolute top-1/2 left-0 h-[250px] w-full -translate-y-1/2 z-0" />
      <canvas ref={scannerCanvasRef} className="pointer-events-none absolute top-1/2 left-0 h-[300px] w-full -translate-y-1/2 z-10" />

      <div
        className={`scanner-card-scan-pulse pointer-events-none absolute top-1/2 left-1/2 z-20 h-[220px] w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#5088C8] to-transparent transition-opacity duration-300 ${isScanning ? "opacity-100" : "opacity-0"}`}
        style={{ boxShadow: "0 0 10px #8FB8E8, 0 0 20px #8FB8E8, 0 0 30px #5088C8, 0 0 50px #2F6FB5" }}
      />

      <div className="relative flex h-[250px] items-center">
        <div
          ref={cardLineRef}
          className="flex cursor-grab items-center whitespace-nowrap select-none will-change-transform"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="card-wrapper relative shrink-0"
              style={{ width: cardWidth, height: cardHeight }}
            >
              <div
                className="card-normal card absolute top-0 left-0 z-[2] h-full w-full overflow-hidden rounded-[15px] bg-transparent shadow-[0_15px_40px_rgba(0,0,0,0.4)] [clip-path:inset(0_0_0_var(--clip-right,0%))]"
              >
                <img src={card.image} alt="Car-World Mitgliedskarte" className="h-full w-full rounded-[15px] object-cover" />
              </div>
              <div
                className="card-ascii card absolute top-0 left-0 z-[1] h-full w-full overflow-hidden rounded-[15px] bg-transparent [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]"
              >
                <pre className="scanner-card-glitch absolute top-0 left-0 m-0 box-border h-full w-full overflow-hidden p-0 text-left align-top font-mono text-[11px] leading-[13px] whitespace-pre text-[rgba(220,210,255,0.6)] [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)]">
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ScannerCardStream };
export default ScannerCardStream;
