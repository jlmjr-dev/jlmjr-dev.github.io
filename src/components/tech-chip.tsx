interface TechChipProps {
  label: string;
}

export function TechChip({ label }: TechChipProps) {
  return (
    <li className="rounded-md border border-edge bg-surface px-2 py-1 font-mono text-xs text-muted">
      {label}
    </li>
  );
}
