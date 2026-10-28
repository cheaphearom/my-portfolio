import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import KramaBand from "./KramaBand";

const photoNames = ["profile.jpg", "profile.jpeg", "profile.png", "profile.webp"];

export default function Portrait({ className = "" }: { className?: string }) {
  const photo = photoNames.find((name) =>
    fs.existsSync(path.join(process.cwd(), "public", "images", name)),
  );

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 bg-sand"
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        {photo ? (
          <Image
            src={`/images/${photo}`}
            alt="Portrait of PHEAROM"
            fill
            sizes="(min-width: 768px) 320px, 80vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center pb-6 text-7xl font-bold tracking-tight text-cream">
            PHEAROM
          </div>
        )}

        <KramaBand className="absolute inset-x-0 bottom-0" />
      </div>
    </div>
  );
}