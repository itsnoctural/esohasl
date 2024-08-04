export default function BunnyLoader({
  src,
  width,
  quality,
}: { src: string; width: number; quality: number }) {
  return `${process.env.NEXT_PUBLIC_CDN}${src}?optimizer=image&width=${width}&quality=${quality || 75}`;
}
