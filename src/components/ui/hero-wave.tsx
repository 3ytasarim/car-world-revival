import * as React from "react";

type Props = {
  className?: string;
  /** Höhe des Wellen-Bereichs am unteren Rand */
  height?: number;
};

/**
 * Animierte Wellen-Balken (WebGL) – nur am unteren Rand, in Markenfarben.
 * three/gsap werden erst im Browser geladen (SSR-sicher).
 */
export function HeroWave({ className, height = 260 }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    (async () => {
      const [THREE, gsapMod] = await Promise.all([
        import("three"),
        import("gsap"),
      ]);
      const gsap = gsapMod.default ?? (gsapMod as any).gsap;
      const host = ref.current;
      if (!host || cancelled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      while (host.firstChild) host.removeChild(host.firstChild);

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      host.appendChild(renderer.domElement);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";

      const scene = new THREE.Scene();
      let w = host.clientWidth || 1;
      let h = host.clientHeight || 1;
      const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -1000, 1000);
      camera.position.z = 10;

      const BAR_W = 14;
      const BAR_GAP = 10;

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uColorA: { value: new THREE.Color("#5088c8") },
          uColorB: { value: new THREE.Color("#131f35") },
          uAccent: { value: new THREE.Color("#f08a24") },
          uGain: { value: 120 },
          uPhase: { value: 0 },
          uLen: { value: 1.6 },
          uBaseY: { value: -h / 2 },
          uMouseX: { value: 0 },
          uHalfW: { value: w / 2 },
        },
        vertexShader: `
          attribute float aXPos;
          attribute float aPosNorm;
          uniform float uGain, uPhase, uLen, uBaseY, uMouseX, uHalfW;
          varying float vT, vProx, vHeight;
          varying vec2 vUv;
          void main(){
            vUv = uv;
            vT = aPosNorm;
            float wave = sin(uPhase + aPosNorm * 6.2831 * uLen) * 0.5 + 0.55;
            float wave2 = sin(uPhase * 0.7 + aPosNorm * 12.0) * 0.25 + 0.25;
            vHeight = max(14.0, (wave + wave2) * uGain);
            float d = abs(aXPos - uMouseX) / max(uHalfW, 1.0);
            vProx = clamp(1.0 - d * 1.6, 0.0, 1.0);
            vHeight += vProx * uGain * 0.45;
            vec3 pos = position;
            pos.x += aXPos;
            pos.y = uBaseY + vHeight * uv.y;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          precision mediump float;
          uniform vec3 uColorA, uColorB, uAccent;
          varying float vT, vProx, vHeight;
          varying vec2 vUv;
          void main(){
            float px = fwidth(vUv.x);
            float xFromCenter = abs(vUv.x - 0.5) * 2.0;
            float tip = clamp(10.0 / vHeight, 0.0, 0.9);
            float transitionY = 1.0 - tip;
            float allowed = vUv.y >= transitionY
              ? 1.0 - pow((vUv.y - transitionY) / tip, 0.9)
              : pow(vUv.y / transitionY, 0.35);
            float alpha = smoothstep(-px, px, allowed - xFromCenter);
            if (alpha < 0.01) discard;
            vec3 col = mix(uColorB, uColorA, vT);
            col = mix(col, uAccent, vProx * 0.65);
            col += vUv.y * 0.25;
            float fade = mix(0.55, 0.95, vUv.y);
            gl_FragColor = vec4(col, alpha * fade * 0.75);
          }
        `,
        transparent: true,
        depthWrite: false,
      });

      const U = material.uniforms as Record<string, { value: any }>;
      let mesh: any = null;
      let count = 0;

      const build = () => {
        if (mesh) {
          scene.remove(mesh);
          mesh.geometry.dispose();
          mesh = null;
        }
        count = Math.max(1, Math.floor((w + BAR_GAP) / (BAR_W + BAR_GAP)));
        const gap = count > 1 ? (w - count * BAR_W) / (count - 1) : 0;
        const aXPos = new Float32Array(count);
        const aPosNorm = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          aXPos[i] = -w / 2 + BAR_W / 2 + i * (BAR_W + gap);
          aPosNorm[i] = count > 1 ? i / (count - 1) : 0;
        }
        const geo = new THREE.PlaneGeometry(BAR_W, 1, 1, 1);
        geo.translate(0, 0.5, 0);
        geo.setAttribute("aXPos", new THREE.InstancedBufferAttribute(aXPos, 1));
        geo.setAttribute("aPosNorm", new THREE.InstancedBufferAttribute(aPosNorm, 1));
        mesh = new THREE.InstancedMesh(geo, material, count);
        mesh.frustumCulled = false;
        scene.add(mesh);
      };

      const resize = () => {
        w = host.clientWidth || 1;
        h = host.clientHeight || 1;
        camera.left = -w / 2;
        camera.right = w / 2;
        camera.top = h / 2;
        camera.bottom = -h / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
        U['uBaseY']!.value = -h / 2;
        U['uHalfW']!.value = w / 2;
        U['uGain']!.value = Math.max(90, h * 0.62);
        build();
      };
      resize();

      const ro = new ResizeObserver(resize);
      ro.observe(host);

      let mouseX = 0;
      let targetMouse = 0;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        targetMouse = e.clientX - r.left - w / 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let phase = 0;
      const tick = () => {
        const dt = gsap.ticker.deltaRatio() * (1 / 60);
        phase += dt * 0.9;
        mouseX += (targetMouse - mouseX) * Math.min(1, dt * 6);
        U['uPhase']!.value = phase;
        U['uMouseX']!.value = mouseX;
        U['uLen']!.value = 1.4 + Math.sin(phase * 0.15) * 0.8;
        renderer.render(scene, camera);
      };
      gsap.ticker.add(tick);

      dispose = () => {
        gsap.ticker.remove(tick);
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        mesh?.geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
      };
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-0 ${className ?? ""}`}
      style={{ height }}
    />
  );
}

export default HeroWave;
