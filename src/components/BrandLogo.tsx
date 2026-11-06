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
        src={`${brandPath}emblem-transparent.webp`}
        width="480"
        height="446"
        alt=""
        aria-hidden="true"
      />
      <span className="brand-name">
        <img
          className="brand-wordmark"
          src={`${brandPath}wordmark-transparent.webp`}
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
