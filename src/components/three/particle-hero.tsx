"use client";

import { useEffect, useRef } from "react";

const WORDS = ["JOSÉ LUIZ", "MONTEIRO JR", "REACT", "10 YEARS"];
const PARTICLE_COUNT = 7000;
const WORD_INTERVAL_MS = 3600;
const REPULSION_RADIUS = 85;

function cssColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value === "" ? fallback : value;
}

function sampleWord(word: string, width: number, height: number): Float32Array {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new Float32Array(0);
  }
  let fontSize = Math.min(190, height * 0.62);
  ctx.font = `bold ${fontSize}px Inter, sans-serif`;
  const measured = ctx.measureText(word).width;
  if (measured > width * 0.92) {
    fontSize = (fontSize * (width * 0.92)) / measured;
    ctx.font = `bold ${fontSize}px Inter, sans-serif`;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  ctx.fillText(word, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const points: number[] = [];
  const stepPx = 3;
  for (let y = 0; y < height; y += stepPx) {
    for (let x = 0; x < width; x += stepPx) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 128) {
        points.push(x - width / 2, height / 2 - y);
      }
    }
  }
  const pointCount = points.length / 2;
  const targets = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const source = i % pointCount;
    targets[i * 3] = points[source * 2] + (Math.random() - 0.5) * 1.5;
    targets[i * 3 + 1] = points[source * 2 + 1] + (Math.random() - 0.5) * 1.5;
    targets[i * 3 + 2] = 0;
  }
  return targets;
}

export function ParticleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }
    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed) {
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        height / 2,
        -height / 2,
        0.1,
        10,
      );
      camera.position.z = 5;

      const wordTargets = WORDS.map((word) => sampleWord(word, width, height));

      const positions = new Float32Array(PARTICLE_COUNT * 3);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * width;
        positions[i * 3 + 1] = (Math.random() - 0.5) * height;
        positions[i * 3 + 2] = 0;
      }
      const geometry = new THREE.BufferGeometry();
      const positionAttribute = new THREE.BufferAttribute(positions, 3);
      geometry.setAttribute("position", positionAttribute);

      const material = new THREE.PointsMaterial({
        size: 2.4,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.9,
      });
      const applyTheme = () => {
        material.color = new THREE.Color(cssColor("--accent", "#60a5fa"));
      };
      applyTheme();
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      scene.add(new THREE.Points(geometry, material));

      let wordIndex = 0;
      const wordTimer = reducedMotion
        ? 0
        : window.setInterval(() => {
            wordIndex = (wordIndex + 1) % wordTargets.length;
          }, WORD_INTERVAL_MS);

      const pointer = { x: 0, y: 0, active: false };
      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        pointer.x = event.clientX - rect.left - width / 2;
        pointer.y = height / 2 - (event.clientY - rect.top);
        pointer.active = true;
      };
      const onPointerLeave = () => {
        pointer.active = false;
      };
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);

      let raf = 0;
      const render = () => {
        const targets = wordTargets[wordIndex];
        const speed = reducedMotion ? 1 : 0.07;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ix = i * 3;
          let px = positions[ix];
          let py = positions[ix + 1];
          px += (targets[ix] - px) * speed;
          py += (targets[ix + 1] - py) * speed;
          if (pointer.active && !reducedMotion) {
            const dx = px - pointer.x;
            const dy = py - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < REPULSION_RADIUS && dist > 0.01) {
              const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * 14;
              px += (dx / dist) * force;
              py += (dy / dist) * force;
            }
          }
          positions[ix] = px;
          positions[ix + 1] = py;
        }
        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);

      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) {
          raf = requestAnimationFrame(render);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.clearInterval(wordTimer);
        themeObserver.disconnect();
        container.removeEventListener("pointermove", onPointerMove);
        container.removeEventListener("pointerleave", onPointerLeave);
        document.removeEventListener("visibilitychange", onVisibility);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[260px] w-full sm:h-[380px]">
      <canvas ref={canvasRef} className="size-full" aria-hidden />
    </div>
  );
}
