import Image from "next/image";

export default function CouplePortrait() {
  return (
    <figure className="couple-portrait" data-portrait>
      <Image
        className="portrait-facing"
        src="/art/abhilash-and-harsha.webp"
        alt="Abhilash on the left and Harsha on the right in traditional wedding attire"
        width={768}
        height={768}
        sizes="(max-width: 600px) 81vw, 368px"
      />
    </figure>
  );
}
