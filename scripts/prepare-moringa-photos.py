"""Encode the generated Moringa photographs for responsive website delivery.

Only resizing and format conversion are applied; the generated composition and
colours stay intact. Retained originals live outside the public build folder.
"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
for name in ("moringa-studio-powder", "moringa-studio-leaves", "moringa-studio-packaging", "moringa-quality-review"):
    source = root / f"assets/image-sources/{name}.png"
    with Image.open(source) as original:
        image = original.convert("RGB")
        image.thumbnail((1440, 1080), Image.Resampling.LANCZOS)
        image.save(root / f"public/images/{name}.jpg",
                   "JPEG", quality=90, optimize=True, progressive=True)
        for width in (96, 320, 512, 960, 1440):
            variant = image.copy()
            variant.thumbnail((width, 10000), Image.Resampling.LANCZOS)
            target = root / f"public/images/{name}-{width}.webp"
            variant.save(target, "WEBP", quality=84, method=6)
            print(target.name, variant.size, target.stat().st_size)
