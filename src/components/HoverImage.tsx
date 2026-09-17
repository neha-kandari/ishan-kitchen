import Image, { type ImageProps } from "next/image";

type HoverImageProps = Omit<ImageProps, "fill" | "className"> & {
  imageClassName?: string;
};

/**
 * Fills its (relative, overflow-hidden, `group`) parent and zooms in
 * gently on hover — used where the design calls for hover-triggered zoom
 * rather than the scroll-driven zoom of ZoomImage.
 */
export default function HoverImage({
  imageClassName,
  alt,
  ...props
}: HoverImageProps) {
  return (
    <Image
      alt={alt}
      fill
      {...props}
      className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${imageClassName ?? ""}`}
    />
  );
}
