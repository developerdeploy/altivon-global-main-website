const brandPath = `${import.meta.env.BASE_URL}brand/`;

/** Display the original artwork so the custom A/G lettering stays exact. */
export default function BrandLogo() {
  return (
    <span
      className="brand-lockup"
      role="img"
      aria-label="AltivonGlobal — Elevate, Evolve, Export"
    >
      <img
        className="brand-emblem"
        src={`${brandPath}emblem-small.webp`}
        srcSet={`${brandPath}emblem-small.webp 96w, ${brandPath}emblem-medium.webp 160w`}
        sizes="(max-width: 767px) 43px, 62px"
        width="480"
        height="446"
        alt=""
        aria-hidden="true"
      />
      <span className="brand-name">
        <img
          className="brand-wordmark"
          src={`${brandPath}wordmark-small.webp`}
          srcSet={`${brandPath}wordmark-small.webp 320w, ${brandPath}wordmark-medium.webp 480w`}
          sizes="(max-width: 767px) 160px, 200px"
          width="984"
          height="176"
          alt=""
          aria-hidden="true"
        />
        <span className="brand-tagline">Elevate · Evolve · Export</span>
      </span>
    </span>
  );
}
