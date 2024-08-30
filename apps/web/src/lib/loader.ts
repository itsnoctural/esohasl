export default function ImageLoader({
  src,
  width,
  quality,
}: { src: string; width: number; quality: number }) {
  return `${process.env.NEXT_PUBLIC_CDN}${src}?format=auto&width=${width}&quality=${quality || 70}`;
}
