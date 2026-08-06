interface TechChipProps {
  label: string;
}

export function TechChip({ label }: TechChipProps) {
  return (
    <li className="border-2 border-edge bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      {label}
    </li>
  );
}
