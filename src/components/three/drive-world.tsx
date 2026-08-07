"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const WORLD_RADIUS = 58;
const BUILDING_RING_RADIUS = 26;
const BUILDING_HIT_RADIUS = 5;

export interface DriveSection {
  id: string;
  label: string;
  node: ReactNode;
}

interface DriveWorldProps {
  sections: DriveSection[];
  hint: string;
  plainLabel: string;
  driveLabel: string;
  closeLabel: string;
  children: ReactNode;
}

interface InputState {
  throttle: boolean;
  brake: boolean;
  left: boolean;
  right: boolean;
}

function cssColor(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value === "" ? fallback : value;
}

export function DriveWorld({
  sections,
  hint,
  plainLabel,
  driveLabel,
  closeLabel,
  children,
}: DriveWorldProps) {
  const [mode, setMode] = useState<"plain" | "drive">("plain");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const inputRef = useRef<InputState>({ throttle: false, brake: false, left: false, right: false });
  const openSectionRef = useRef<string | null>(null);
  const armedRef = useRef(true);

  openSectionRef.current = openSection;

  useEffect(() => {
    setMode("drive");
  }, []);

  useEffect(() => {
    if (mode !== "drive") {
      return;
    }
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

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        62,
        window.innerWidth / window.innerHeight,
        0.1,
        300,
      );

      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const sun = new THREE.DirectionalLight(0xffffff, 1.7);
      sun.position.set(20, 40, 10);
      scene.add(sun);

      const groundMaterial = new THREE.MeshStandardMaterial({ flatShading: true });
      const buildingMaterial = new THREE.MeshStandardMaterial({ flatShading: true });
      const roofMaterial = new THREE.MeshStandardMaterial({ flatShading: true });
      const carMaterial = new THREE.MeshStandardMaterial({ flatShading: true });
      const wheelMaterial = new THREE.MeshStandardMaterial({ flatShading: true });

      const ground = new THREE.Mesh(
        new THREE.CylinderGeometry(WORLD_RADIUS + 6, WORLD_RADIUS + 6, 0.5, 48),
        groundMaterial,
      );
      ground.position.y = -0.25;
      scene.add(ground);

      const grid = new THREE.GridHelper(WORLD_RADIUS * 2, 30);
      grid.position.y = 0.02;
      scene.add(grid);

      const buildingPositions: { x: number; z: number }[] = [];
      sections.forEach((_, index) => {
        const angle = (index / sections.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * BUILDING_RING_RADIUS;
        const z = Math.sin(angle) * BUILDING_RING_RADIUS;
        buildingPositions.push({ x, z });

        const height = 7 + (index % 3) * 3;
        const body = new THREE.Mesh(new THREE.BoxGeometry(6, height, 6), buildingMaterial);
        body.position.set(x, height / 2, z);
        scene.add(body);

        const roof = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.1, 6.6), roofMaterial);
        roof.position.set(x, height + 0.55, z);
        scene.add(roof);
      });

      const car = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.6, 2.8), carMaterial);
      body.position.y = 0.65;
      const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.55, 1.3), roofMaterial);
      cabin.position.set(0, 1.2, -0.15);
      car.add(body, cabin);
      const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 10);
      const wheelOffsets: [number, number][] = [
        [-0.85, 0.95],
        [0.85, 0.95],
        [-0.85, -0.95],
        [0.85, -0.95],
      ];
      for (const [wx, wz] of wheelOffsets) {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.35, wz);
        car.add(wheel);
      }
      car.position.set(0, 0, 6);
      scene.add(car);

      const applyTheme = () => {
        const bg = new THREE.Color(cssColor("--background", "#0a0f0c"));
        const accent = new THREE.Color(cssColor("--accent", "#4ade80"));
        const amber = new THREE.Color(cssColor("--accent-alt", "#fbbf24"));
        const surface = new THREE.Color(cssColor("--surface", "#101812"));
        const edge = new THREE.Color(cssColor("--muted", "#8fae95"));
        renderer.setClearColor(bg);
        scene.fog = new THREE.Fog(bg, 55, 150);
        groundMaterial.color = surface;
        buildingMaterial.color = edge;
        roofMaterial.color = amber;
        carMaterial.color = accent;
        wheelMaterial.color = new THREE.Color("#222222");
        const gridMaterial = grid.material as InstanceType<typeof THREE.LineBasicMaterial>;
        gridMaterial.color = edge;
        gridMaterial.opacity = 0.35;
        gridMaterial.transparent = true;
      };
      applyTheme();
      const themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });

      let heading = Math.PI;
      let speed = 0;

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const projected = new THREE.Vector3();
      let raf = 0;
      let last = performance.now();

      const render = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const input = inputRef.current;
        const paused = openSectionRef.current !== null;

        if (!paused) {
          if (input.throttle) {
            speed += 16 * dt;
          }
          if (input.brake) {
            speed -= 20 * dt;
          }
          speed *= 1 - Math.min(1, 1.4 * dt);
          speed = Math.max(-7, Math.min(17, speed));
          const steer = (input.left ? 1 : 0) - (input.right ? 1 : 0);
          heading += steer * 1.9 * dt * Math.min(1, Math.abs(speed) / 4) * Math.sign(speed || 1);

          car.position.x += Math.sin(heading) * speed * dt;
          car.position.z += Math.cos(heading) * speed * dt;
          car.rotation.y = heading;

          const centerDist = Math.hypot(car.position.x, car.position.z);
          if (centerDist > WORLD_RADIUS) {
            car.position.x *= WORLD_RADIUS / centerDist;
            car.position.z *= WORLD_RADIUS / centerDist;
            speed = 0;
          }

          let nearAny = false;
          buildingPositions.forEach((building, index) => {
            const dist = Math.hypot(car.position.x - building.x, car.position.z - building.z);
            if (dist < BUILDING_HIT_RADIUS) {
              nearAny = true;
              if (armedRef.current) {
                armedRef.current = false;
                speed = 0;
                setOpenSection(sections[index].id);
              }
              const push = BUILDING_HIT_RADIUS / Math.max(0.001, dist);
              car.position.x = building.x + (car.position.x - building.x) * push;
              car.position.z = building.z + (car.position.z - building.z) * push;
            }
          });
          if (!nearAny) {
            armedRef.current = true;
          }
        }

        const camTarget = {
          x: car.position.x - Math.sin(heading) * 11,
          y: 6,
          z: car.position.z - Math.cos(heading) * 11,
        };
        const ease = 1 - Math.exp(-5 * dt);
        camera.position.x += (camTarget.x - camera.position.x) * ease;
        camera.position.y += (camTarget.y - camera.position.y) * ease;
        camera.position.z += (camTarget.z - camera.position.z) * ease;
        camera.lookAt(car.position.x, 1.5, car.position.z);

        buildingPositions.forEach((building, index) => {
          const label = labelRefs.current[index];
          if (!label) {
            return;
          }
          const height = 7 + (index % 3) * 3;
          projected.set(building.x, height + 2.4, building.z).project(camera);
          const visible = projected.z < 1;
          label.style.display = visible ? "block" : "none";
          if (visible) {
            label.style.left = `${((projected.x + 1) / 2) * window.innerWidth}px`;
            label.style.top = `${((1 - projected.y) / 2) * window.innerHeight}px`;
          }
        });

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
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
          }
        });
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [mode, sections]);

  useEffect(() => {
    if (mode !== "drive") {
      return;
    }
    const setKey = (key: string, down: boolean): boolean => {
      const input = inputRef.current;
      switch (key) {
        case "ArrowUp":
        case "w":
        case "W":
          input.throttle = down;
          return true;
        case "ArrowDown":
        case "s":
        case "S":
          input.brake = down;
          return true;
        case "ArrowLeft":
        case "a":
        case "A":
          input.left = down;
          return true;
        case "ArrowRight":
        case "d":
        case "D":
          input.right = down;
          return true;
        default:
          return false;
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenSection(null);
        return;
      }
      if (setKey(event.key, true)) {
        event.preventDefault();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      setKey(event.key, false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [mode]);

  const holdControl = (key: keyof InputState) => ({
    onPointerDown: () => {
      inputRef.current[key] = true;
    },
    onPointerUp: () => {
      inputRef.current[key] = false;
    },
    onPointerLeave: () => {
      inputRef.current[key] = false;
    },
  });

  const openedSection = sections.find((section) => section.id === openSection);

  if (mode === "plain") {
    return (
      <div>
        <PlainModeToggle label={driveLabel} onClick={() => setMode("drive")} />
        {children}
      </div>
    );
  }

  return (
    <div>
      <div className="fixed inset-0 z-0">
        <canvas ref={canvasRef} className="size-full" aria-hidden />
      </div>
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => {
            labelRefs.current[index] = el;
          }}
          className="pointer-events-none fixed z-10 -translate-x-1/2 -translate-y-1/2 border-2 border-edge bg-surface px-2 py-1 font-display text-[10px] uppercase text-accent-alt"
        >
          {section.label}
        </div>
      ))}
      <div className="fixed bottom-4 left-4 z-20 flex max-w-xs flex-col gap-2">
        <p className="pixel-card bg-surface px-3 py-2 text-xs text-muted">{hint}</p>
        <button
          type="button"
          onClick={() => setMode("plain")}
          className="pixel-btn self-start bg-surface px-3 py-2 font-display text-xs font-bold"
        >
          {plainLabel}
        </button>
      </div>
      <TouchControls holdControl={holdControl} />
      <SectionPanel section={openedSection} closeLabel={closeLabel} onClose={() => setOpenSection(null)} />
      <div className="hidden">{children}</div>
    </div>
  );
}

function PlainModeToggle({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        type="button"
        onClick={onClick}
        className="pixel-btn bg-accent px-3 py-2 font-display text-xs font-bold text-background"
      >
        ▶ {label}
      </button>
    </div>
  );
}

interface TouchControlsProps {
  holdControl: (key: keyof InputState) => {
    onPointerDown: () => void;
    onPointerUp: () => void;
    onPointerLeave: () => void;
  };
}

function TouchControls({ holdControl }: TouchControlsProps) {
  return (
    <div className="fixed bottom-4 right-4 z-20 flex items-end gap-6 sm:hidden" aria-hidden>
      <div className="flex gap-2">
        <button type="button" className="pixel-btn flex size-12 items-center justify-center bg-surface" {...holdControl("left")}>
          ◀
        </button>
        <button type="button" className="pixel-btn flex size-12 items-center justify-center bg-surface" {...holdControl("right")}>
          ▶
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <button type="button" className="pixel-btn flex size-12 items-center justify-center bg-surface" {...holdControl("throttle")}>
          ▲
        </button>
        <button type="button" className="pixel-btn flex size-12 items-center justify-center bg-surface" {...holdControl("brake")}>
          ▼
        </button>
      </div>
    </div>
  );
}

interface SectionPanelProps {
  section?: DriveSection;
  closeLabel: string;
  onClose: () => void;
}

function SectionPanel({ section, closeLabel, onClose }: SectionPanelProps) {
  if (!section) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-background/70 p-4">
      <div className="pixel-card max-h-[85vh] w-full max-w-3xl overflow-y-auto bg-background p-4 sm:p-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="pixel-btn bg-surface px-3 py-1.5 font-display text-xs font-bold"
          >
            ✕ {closeLabel}
          </button>
        </div>
        {section.node}
      </div>
    </div>
  );
}
