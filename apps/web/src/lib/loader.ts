export default function ImageLoader({
  src,
  width,
  quality,
}: { src: string; width: number; quality: number }) {
  // return `${process.env.NEXT_PUBLIC_CDN}${src}?optimizer=image&width=${width}&quality=${quality || 75}`;
  return `${process.env.NEXT_PUBLIC_CDN_EXP}${src}?format=auto&width=${width}&quality=${quality || 75}`;
}
