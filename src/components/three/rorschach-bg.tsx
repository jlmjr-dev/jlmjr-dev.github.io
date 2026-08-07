"use client";

import { useEffect, useRef } from "react";

// A liquid Rorschach inkblot behind the page, drawn as a full-screen noise
// field rather than particles. The horizontal axis is mirrored inside the
// shader, so the blot (and the cursor's dent in it) is always bilaterally
// symmetric. Scroll shifts the noise domain, slowly re-forming the figure.

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uMouseActive;
  uniform vec3 uColor;
  uniform float uAlpha;
  uniform float uAspect;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0) * 2.0;
    vec2 q = vec2(abs(p.x), p.y);

    float t = uTime * 0.045;
    float drift = uScroll * 2.4;

    vec2 warp = vec2(
      fbm(q * 1.5 + vec2(t, drift)),
      fbm(q * 1.5 + vec2(drift * 0.7, -t))
    );
    vec2 d = q + (warp - 0.5) * 0.65;

    float field = fbm(d * 1.7 + vec2(0.0, drift));
    float radial = length(q * vec2(1.05, 0.8));
    field -= radial * 0.42;

    vec2 m = vec2(abs(uMouse.x), uMouse.y);
    float dent = exp(-pow(length(q - m) * 3.6, 2.0));
    field -= dent * 0.28 * uMouseActive;

    float ink = smoothstep(0.30, 0.46, field);
    float density = 0.72 + 0.28 * fbm(d * 3.4 + drift);
    gl_FragColor = vec4(uColor, ink * density * uAlpha);
  }
`;

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function cssValue(name: string, fallback: string): string {
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseActive: { value: 0 },
        uColor: { value: new THREE.Color("#6c8aa6") },
        uAlpha: { value: 0.14 },
        uAspect: { value: width / height },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
        depthWrite: false,
      });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(quad);

      const applyTheme = () => {
        uniforms.uColor.value = new THREE.Color(cssValue("--blot", "#6c8aa6"));
        uniforms.uAlpha.value = parseFloat(cssValue("--blot-alpha", "0.14"));
      };
      applyTheme();
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      let targetScroll = 0;
      const readScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        targetScroll = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      };
      readScroll();
      window.addEventListener("scroll", readScroll, { passive: true });

      const targetMouse = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        targetMouse.x = ((event.clientX - width / 2) / height) * 2;
        targetMouse.y = ((height / 2 - event.clientY) / height) * 2;
        uniforms.uMouseActive.value = reducedMotion ? 0 : 1;
      };
      const onPointerLeave = () => {
        uniforms.uMouseActive.value = 0;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerout", onPointerLeave);

      const onResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        uniforms.uAspect.value = width / height;
        readScroll();
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      const render = (now: number) => {
        uniforms.uTime.value = reducedMotion ? 0 : now * 0.001;
        uniforms.uScroll.value += (targetScroll - uniforms.uScroll.value) * 0.04;
        const mouse = uniforms.uMouse.value;
        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;
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
        quad.geometry.dispose();
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
