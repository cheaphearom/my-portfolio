// Checkered strip inspired by the Cambodian krama scarf.
export default function KramaBand({
  a = "var(--color-cream)",
  b = "var(--color-ink)",
  className = "",
}: {
  a?: string;
  b?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`h-6 ${className}`}
      style={{
        background: `conic-gradient(${a} 25%, ${b} 0 50%, ${a} 0 75%, ${b} 0) 0 0 / 24px 24px`,
      }}
    />
  );
}
