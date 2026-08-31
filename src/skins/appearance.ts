"use client";

import { useSyncExternalStore } from "react";
import { defaultSkin, isSkin, type SkinId } from "@/skins/config";

export type Theme = "dark" | "light";

/* The <html> element is the source of truth. A script in the document head
   applies the stored skin and theme before first paint, so reading back from
   the DOM keeps React in step with what the visitor already sees, with no
   flash and no state to synchronize in an effect. */

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function readSkin(): SkinId {
  const applied = document.documentElement.dataset.skin;
  return applied && isSkin(applied) ? applied : defaultSkin;
}

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage unavailable, the choice just won't survive a reload
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function useSkin(): SkinId {
  return useSyncExternalStore(subscribe, readSkin, () => defaultSkin);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "dark");
}

export function setSkin(next: SkinId) {
  document.documentElement.dataset.skin = next;
  persist("skin", next);
  notify();
}

export function setTheme(next: Theme) {
  applyTheme(next);
  persist("theme", next);
  notify();
}

/* The open tab is persisted the same way, and applied by the same pre-paint
   script, so a refresh or a language switch lands you back where you were. */
export function useActiveTab(fallback: string): string {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.tab ?? fallback,
    () => fallback,
  );
}

export function setActiveTab(next: string) {
  document.documentElement.dataset.tab = next;
  persist("tab", next);
  notify();
}
