import { useEffect, useRef, useState } from "react";
import { SITE_IMAGES } from "@/config/images";
import { Icon } from "./PageElements";
import ProductImage, { imageVariant } from "./ProductImage";

const photos = [
  {
    src: SITE_IMAGES.moringaPowder,
    alt: "Soft green moringa powder in a shallow ivory dish on warm limestone, with a fresh leaf sprig",
    label: "The powder",
    detail: "A closer look at the ingredient.",
  },
  {
    src: SITE_IMAGES.bulkPackaging,
    alt: "Illustrative plain kraft sack, ivory pouch and carton in soft natural light",
    label: "The packaging",
    detail: "Discuss the format that fits your order.",
  },
  {
    src: SITE_IMAGES.moringaFoliage,
    alt: "Fresh moringa leaf stems resting on pale stone in soft morning light",
    label: "The leaf",
    detail: "The botanical at the beginning of the story.",
  },
];
export default function ProductGallery() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const photo = photos[active];
  const move = (direction: number) => {
    setActive((value) => (value + direction + photos.length) % photos.length);
    setZoom(false);
  };
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
      dialog.current?.close();
      opener.current?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <div className="ingredient-gallery">
      <figure className="gallery-figure">
        <div className="gallery-photo-label">
          <span>MORINGA LEAF POWDER / INDIA</span>
          <span>{String(active + 1).padStart(2, "0")} / 03</span>
        </div>
        <button
          className="gallery-open"
          type="button"
          ref={opener}
          onClick={() => {
            setZoom(false);
            setOpen(true);
          }}
          aria-label={`Enlarge ${photo.label.toLowerCase()} image`}
        >
          <ProductImage
            src={photo.src}
            alt={photo.alt}
            fetchPriority="high"
            loading="eager"
          />
          <span className="gallery-enlarge">
            <Icon>open_in_full</Icon> Explore image
          </span>
        </button>
        <figcaption>
          <div aria-live="polite">
            <span>{photo.label}</span>
            <p>{photo.detail}</p>
          </div>
          <div className="gallery-arrows">
            <button
              type="button"
              aria-label="Previous product image"
              onClick={() => move(-1)}
            >
              <Icon>arrow_back</Icon>
            </button>
            <button
              type="button"
              aria-label="Next product image"
              onClick={() => move(1)}
            >
              <Icon>arrow_forward</Icon>
            </button>
          </div>
        </figcaption>
      </figure>
      <div className="gallery-thumbnails" aria-label="Product images">
        {photos.map((item, i) => (
          <button
            type="button"
            key={item.src}
            aria-label={`View ${item.label.toLowerCase()}`}
            aria-pressed={active === i}
            onClick={() => {
              setActive(i);
              setZoom(false);
            }}
          >
            <img
              src={imageVariant(item.src, 96)}
              alt=""
              width={96}
              height={72}
            />
            <span>
              <small>0{i + 1}</small>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <p className="gallery-note">
        Illustrative product imagery. Final appearance and packing confirmed
        with your quotation.
      </p>
      {open && (
        <dialog
          ref={dialog}
          className="product-lightbox"
          aria-labelledby="gallery-dialog-title"
          onCancel={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          onKeyDown={(event) => {
            if (
              zoom &&
              event.target instanceof HTMLElement &&
              event.target.classList.contains("lightbox-image")
            )
              return;
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
          }}
        >
          <div className="lightbox-shell">
            <header>
              <div>
                <span className="small-label">
                  ALTIVONGLOBAL / INGREDIENT VIEW
                </span>
                <h2 id="gallery-dialog-title">{photo.label}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close image viewer"
                autoFocus
              >
                <Icon>close</Icon>
              </button>
            </header>
            <div
              className={`lightbox-image${zoom ? " is-zoomed" : ""}`}
              tabIndex={0}
              aria-label={
                zoom
                  ? "Enlarged product image. Scroll to inspect."
                  : "Product image"
              }
            >
              <img src={photo.src} alt={photo.alt} width={1440} height={1080} />
            </div>
            <footer>
              <button
                type="button"
                aria-label="Previous enlarged image"
                onClick={() => move(-1)}
              >
                <Icon>arrow_back</Icon>
              </button>
              <span aria-live="polite">
                {String(active + 1).padStart(2, "0")} / 03
              </span>
              <button
                type="button"
                className="image-zoom"
                aria-pressed={zoom}
                onClick={() => setZoom((value) => !value)}
              >
                <Icon>{zoom ? "zoom_out" : "zoom_in"}</Icon>
                {zoom ? "Fit image" : "Zoom image"}
              </button>
              <button
                type="button"
                aria-label="Next enlarged image"
                onClick={() => move(1)}
              >
                <Icon>arrow_forward</Icon>
              </button>
            </footer>
          </div>
        </dialog>
      )}
    </div>
  );
}
