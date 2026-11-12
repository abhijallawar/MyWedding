export default function WeddingMusic({ src }: { src: string }) {
  return <audio src={src} autoPlay loop preload="auto" />;
}
