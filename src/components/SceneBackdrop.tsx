export default function SceneBackdrop({
  src,
  mobileSrc,
  className = "",
  loading = "lazy",
}: {
  src: string;
  mobileSrc: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <picture className={`scene-backdrop ${className}`} aria-hidden="true">
      <source media="(max-width: 800px)" srcSet={mobileSrc} />
      <img src={src} alt="" loading={loading} decoding="async" />
    </picture>
  );
}
