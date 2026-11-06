import type { ImgHTMLAttributes } from "react";
import { RESPONSIVE_IMAGE_WIDTHS } from "@/config/images";
export function imageVariant(source: string, width = 512) {
  return source.replace(/\.jpg$/, `-${width}.webp`);
}
export default function ProductImage({
  src = "",
  sizes = "(max-width: 767px) 92vw, 50vw",
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={(RESPONSIVE_IMAGE_WIDTHS[src] ?? [320, 512])
          .map((width) => `${imageVariant(src, width)} ${width}w`)
          .join(", ")}
        sizes={sizes}
      />
      <img src={src} width={512} height={382} decoding="async" {...props} />
    </picture>
  );
}
