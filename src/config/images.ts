const image = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

// Publish design assets with the website instead of depending on external links.
export const SITE_IMAGES = {
  exportPartner: image("export-partner.jpg"),
  bulkPackaging: image("moringa-studio-packaging.jpg"),
  globalPort: image("global-shipping-port.jpg"),
  globalLogistics: image("global-trade-logistics.jpg"),
  homeHero: image("moringa-origin.jpg"),
  moringaPowder: image("moringa-studio-powder.jpg"),
  moringaFoliage: image("moringa-studio-leaves.jpg"),
  moringaPlantation: image("moringa-plantation.jpg"),
  qualityLaboratory: image("moringa-quality-review.jpg"),
};

export const RESPONSIVE_IMAGE_WIDTHS: Record<string, readonly number[]> = {
  [SITE_IMAGES.moringaPowder]: [320, 512, 960, 1440],
  [SITE_IMAGES.moringaFoliage]: [320, 512, 960, 1440],
  [SITE_IMAGES.bulkPackaging]: [320, 512, 960, 1440],
  [SITE_IMAGES.qualityLaboratory]: [320, 512, 960, 1440],
};

const studioBackdrop = (name: string) => ({
  src: image(`moringa-studio-${name}-1440.webp`),
  mobileSrc: image(`moringa-studio-${name}-960.webp`),
});
const filmBackdrop = (frame: string) => ({
  src: `${import.meta.env.BASE_URL}frames/export-journey/desktop/${frame}.webp`,
  mobileSrc: `${import.meta.env.BASE_URL}frames/export-journey/mobile/${frame}.webp`,
});
export const SITE_BACKDROPS = {
  leaf: studioBackdrop("leaves"),
  powder: studioBackdrop("powder"),
  packing: studioBackdrop("packaging"),
  milling: filmBackdrop("0060"),
  shipping: filmBackdrop("0660"),
  laboratory: { src: image("moringa-quality-review-1440.webp"), mobileSrc: image("moringa-quality-review-960.webp") },
  origin: { src: image("moringa-plantation.jpg"), mobileSrc: image("moringa-plantation-512.webp") },
};
