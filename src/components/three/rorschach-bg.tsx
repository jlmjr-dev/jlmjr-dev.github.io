"use client";

import { useEffect, useRef } from "react";

// A bilaterally symmetric particle inkblot behind the page. Half the
// particles are simulated; the other half mirrors them across the vertical
// axis, so any disturbance (including the cursor) happens on both sides at
// once, which is what makes it read as a Rorschach card. Scrolling morphs
// the blot through a sequence of shapes.

const SHAPE_COUNT = 5;
const HALF_COUNT = 2600;

function lcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function buildShape(seed: number, radius: number): Float32Array {
  const rnd = lcg(seed);
  const harmonics = Array.from({ length: 4 }, () => ({
    amp: 0.1 + rnd() * 0.24,
    freq: 2 + Math.floor(rnd() * 5),
    phase: rnd() * Math.PI * 2,
  }));
  const stretchY = 0.9 + rnd() * 0.5;
  const offsetY = (rnd() - 0.5) * radius * 0.4;

  const targets = new Float32Array(HALF_COUNT * 2);
  for (let i = 0; i < HALF_COUNT; i++) {
    const theta = rnd() * Math.PI * 2;
    let boundary = 0.55;
    for (const h of harmonics) {
      boundary += h.amp * Math.sin(h.freq * theta + h.phase);
    }
    const r = radius * Math.max(0.12, boundary) * Math.sqrt(rnd());
    const x = -Math.abs(Math.cos(theta) * r);
    const y = Math.sin(theta) * r * stretchY + offsetY;
    targets[i * 2] = x;
    targets[i * 2 + 1] = y;
  }
  return targets;
}

function cssColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value === "" ? fallback : value;
}

export function RorschachBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
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
      let width = window.innerWidth;
      let height = window.innerHeight;

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

      let radius = Math.min(width, height) * 0.34;
      let shapes = Array.from({ length: SHAPE_COUNT }, (_, index) =>
        buildShape(97 + index * 131, radius),
      );

      const positions = new Float32Array(HALF_COUNT * 2 * 3);
      for (let i = 0; i < HALF_COUNT; i++) {
        positions[i * 3] = shapes[0][i * 2];
        positions[i * 3 + 1] = shapes[0][i * 2 + 1];
      }
      const geometry = new THREE.BufferGeometry();
      const positionAttribute = new THREE.BufferAttribute(positions, 3);
      geometry.setAttribute("position", positionAttribute);

      const material = new THREE.PointsMaterial({
        size: 2.6,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      const applyTheme = () => {
        material.color = new THREE.Color(cssColor("--blot", "#24435e"));
      };
      applyTheme();
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      scene.add(new THREE.Points(geometry, material));

      let scrollProgress = 0;
      const readScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      };
      readScroll();
      window.addEventListener("scroll", readScroll, { passive: true });

      const pointer = { x: 0, y: 0, active: false };
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = event.clientX - width / 2;
        pointer.y = height / 2 - event.clientY;
        pointer.active = true;
      };
      const onPointerLeave = () => {
        pointer.active = false;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave);

      const onResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.left = -width / 2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = -height / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        radius = Math.min(width, height) * 0.34;
        shapes = Array.from({ length: SHAPE_COUNT }, (_, index) =>
          buildShape(97 + index * 131, radius),
        );
        readScroll();
      };
      window.addEventListener("resize", onResize);

      const REPULSE_RADIUS = 120;
      let raf = 0;
      const render = (now: number) => {
        const t = now * 0.001;
        const stage = scrollProgress * (SHAPE_COUNT - 1);
        const k = Math.min(SHAPE_COUNT - 2, Math.floor(stage));
        const f = stage - k;
        const shapeA = shapes[k];
        const shapeB = shapes[k + 1];
        const ease = reducedMotion ? 1 : 0.05;

        for (let i = 0; i < HALF_COUNT; i++) {
          const targetX = shapeA[i * 2] * (1 - f) + shapeB[i * 2] * f;
          const targetY = shapeA[i * 2 + 1] * (1 - f) + shapeB[i * 2 + 1] * f;
          const wiggleX = reducedMotion ? 0 : Math.sin(t * 0.8 + i * 1.7) * 2.2;
          const wiggleY = reducedMotion ? 0 : Math.cos(t * 0.6 + i * 2.3) * 2.2;

          let px = positions[i * 3];
          let py = positions[i * 3 + 1];
          px += (targetX + wiggleX - px) * ease;
          py += (targetY + wiggleY - py) * ease;

          if (pointer.active && !reducedMotion) {
            const mirroredMx = -Math.abs(pointer.x);
            const dx = px - mirroredMx;
            const dy = py - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < REPULSE_RADIUS && dist > 0.01) {
              const force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * 10;
              px += (dx / dist) * force;
              py += (dy / dist) * force;
            }
          }

          positions[i * 3] = px;
          positions[i * 3 + 1] = py;
          const j = (HALF_COUNT + i) * 3;
          positions[j] = -px;
          positions[j + 1] = py;
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
        themeObserver.disconnect();
        window.removeEventListener("scroll", readScroll);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerout", onPointerLeave);
        window.removeEventListener("resize", onResize);
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
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    />
  );
}
