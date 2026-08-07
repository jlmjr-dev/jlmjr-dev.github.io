"use client";

import { useEffect, useRef } from "react";

// One landmark per section, placed along the flight path
const STATION_FRACTIONS = [0.14, 0.36, 0.58, 0.76, 0.93];
const PATH_LENGTH = 420;

function cssColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value === "" ? fallback : value;
}

export function JourneyScene() {
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
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        200,
      );

      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      const sun = new THREE.DirectionalLight(0xffffff, 1.6);
      sun.position.set(4, 10, 6);
      scene.add(ambient, sun);

      const accentMaterial = new THREE.MeshStandardMaterial({ flatShading: true });
      const edgeMaterial = new THREE.MeshStandardMaterial({ flatShading: true });
      const dustMaterial = new THREE.PointsMaterial({ size: 0.35, sizeAttenuation: true });

      const landmarkGeometries = [
        new THREE.IcosahedronGeometry(2.4, 0),
        new THREE.TorusGeometry(2.2, 0.7, 8, 14),
        new THREE.OctahedronGeometry(2.6, 0),
        new THREE.DodecahedronGeometry(2.3, 0),
        new THREE.ConeGeometry(2.2, 4.4, 6),
      ];

      const spinners: { mesh: InstanceType<typeof THREE.Mesh>; speed: number }[] = [];
      landmarkGeometries.forEach((geometry, index) => {
        const z = -STATION_FRACTIONS[index] * PATH_LENGTH - 14;
        const side = index % 2 === 0 ? 1 : -1;
        const mesh = new THREE.Mesh(geometry, accentMaterial);
        mesh.position.set(side * 9, 3.2, z);
        scene.add(mesh);
        spinners.push({ mesh, speed: 0.24 + index * 0.05 });

        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 6, 6), edgeMaterial);
        pillar.position.set(side * 9, -1.6, z);
        scene.add(pillar);

        const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.9, 1, 8), edgeMaterial);
        platform.position.set(side * 9, -5, z);
        scene.add(platform);
      });

      const breadcrumbGeometry = new THREE.BoxGeometry(0.5, 0.12, 0.5);
      const breadcrumbCount = Math.floor(PATH_LENGTH / 4);
      const breadcrumbs = new THREE.InstancedMesh(breadcrumbGeometry, edgeMaterial, breadcrumbCount);
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < breadcrumbCount; i++) {
        const z = -i * 4;
        matrix.setPosition(Math.sin(z * 0.02) * 3, -2.4, z);
        breadcrumbs.setMatrixAt(i, matrix);
      }
      scene.add(breadcrumbs);

      const dustCount = 350;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 70;
        dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        dustPositions[i * 3 + 2] = -Math.random() * PATH_LENGTH;
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
      const dust = new THREE.Points(dustGeometry, dustMaterial);
      scene.add(dust);

      const applyTheme = () => {
        const bg = new THREE.Color(cssColor("--background", "#101216"));
        const accent = new THREE.Color(cssColor("--accent", "#60a5fa"));
        const edge = new THREE.Color(cssColor("--muted", "#9aa2ad"));
        renderer.setClearColor(bg);
        scene.fog = new THREE.Fog(bg, 30, 110);
        accentMaterial.color = accent;
        edgeMaterial.color = edge;
        dustMaterial.color = edge;
      };
      applyTheme();

      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      let progress = 0;
      let targetProgress = 0;
      const readScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        targetProgress = max > 0 ? window.scrollY / max : 0;
      };
      readScroll();
      window.addEventListener("scroll", readScroll, { passive: true });

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        readScroll();
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      let last = performance.now();
      const render = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        progress = reducedMotion
          ? targetProgress
          : progress + (targetProgress - progress) * Math.min(1, dt * 5);

        const z = -progress * PATH_LENGTH;
        const sway = reducedMotion ? 0 : Math.sin(progress * Math.PI * 3) * 4;
        camera.position.set(sway, 2, z + 10);
        camera.lookAt(sway * 0.4, 1.2, z - 14);

        for (const spinner of spinners) {
          spinner.mesh.rotation.y += dt * spinner.speed;
          spinner.mesh.rotation.x += dt * spinner.speed * 0.6;
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };
      raf = requestAnimationFrame(render);

      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(render);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanup = () => {
        cancelAnimationFrame(raf);
        themeObserver.disconnect();
        window.removeEventListener("scroll", readScroll);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        landmarkGeometries.forEach((geometry) => geometry.dispose());
        breadcrumbGeometry.dispose();
        dustGeometry.dispose();
        accentMaterial.dispose();
        edgeMaterial.dispose();
        dustMaterial.dispose();
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
