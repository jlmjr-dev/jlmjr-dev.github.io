"use client";

import { skinIds, type SkinId } from "@/skins/config";
import { setSkin, useSkin } from "@/skins/appearance";

interface SkinToggleProps {
  label: string;
  names: Record<SkinId, string>;
}

export function SkinToggle({ label, names }: SkinToggleProps) {
  const skin = useSkin();

  return (
    <div>
      <p id="skin-group-label" className="label">
        {label}
      </p>
      <div role="group" aria-labelledby="skin-group-label" className="skin-options mt-2">
        {skinIds.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSkin(id)}
            aria-pressed={skin === id}
            data-skin-option={id}
            className="btn !px-2 !py-1 !text-xs"
          >
            {names[id]}
          </button>
        ))}
      </div>
      {/* Switching skin also shows or hides the theme toggle, so say what applied. */}
      <p aria-live="polite" className="sr-only">
        {names[skin]}
      </p>
    </div>
  );
}
