const lines = [
  { item: "Order flow", detail: "MySQL" },
  { item: "Payment checkout", detail: "ABA PayWay" },
  { item: "Loyalty", detail: "PHP" },
  { item: "POS integration", detail: "SQL Server" },
  { item: "Finance sync", detail: "Business Central" },
  { item: "School attendance", detail: "Spring Boot" },
];

export default function Receipt() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-sm lg:ml-auto lg:mr-0">
      {/* printer slot */}
      <div className="relative z-10 mx-[-0.5rem] h-3 rounded-full bg-ink" />

      <div className="receipt-feed">
        <div className="receipt bg-receipt px-7 pt-8 font-mono text-[0.8rem] leading-6 text-ink">
          <p className="text-center text-base font-bold tracking-tight">
            BRN.DEV
          </p>
          <p className="text-center text-ink/70">Backend development</p>

          <div className="my-4 border-t border-dashed border-ink/50" />

          <ul className="space-y-0.5">
            {lines.map((line) => (
              <li key={line.item} className="flex items-baseline gap-2">
                <span>{line.item}</span>
                <span className="flex-1 -translate-y-1 border-b border-dotted border-ink/40" />
                <span className="text-ink/70">{line.detail}</span>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t border-dashed border-ink/50" />

          <p className="flex justify-between font-bold">
            <span>Total</span>
            <span>Real production use</span>
          </p>

          <div className="barcode mt-6" />
          <p className="mt-2 text-center text-ink/70">Thank you for visiting</p>
        </div>
      </div>
    </div>
  );
}
