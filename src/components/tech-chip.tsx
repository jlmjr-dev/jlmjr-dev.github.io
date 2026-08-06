interface TechChipProps {
  label: string;
}

export function TechChip({ label }: TechChipProps) {
  return (
    <li className="border border-edge px-2 py-1 text-xs text-muted">
      {label}
    </li>
  );
}
