import Image from "next/image";
import { Sparkle } from "lucide-react";

export default function CouplePortrait({ monogram }: { monogram: string }) {
  return (
    <figure className="couple-portrait" data-portrait>
      <div className="couple-arch">
        <div className="couple-halo" aria-hidden="true" />
        <Sparkle className="portrait-sparkle portrait-sparkle-left" aria-hidden="true" />
        <Sparkle className="portrait-sparkle portrait-sparkle-right" aria-hidden="true" />
        <span className="portrait-petal portrait-petal-left" aria-hidden="true" />
        <span className="portrait-petal portrait-petal-right" aria-hidden="true" />
        <div className="couple-illustration">
          <Image
            className="portrait-facing"
            src="/art/abhilash-and-harsha.webp"
            alt="Abhilash on the left and Harsha on the right in traditional wedding attire"
            width={768}
            height={768}
            sizes="(max-width: 600px) 78vw, 350px"
          />
        </div>
      </div>
      <span className="portrait-monogram" aria-hidden="true">{monogram}</span>
    </figure>
  );
}
