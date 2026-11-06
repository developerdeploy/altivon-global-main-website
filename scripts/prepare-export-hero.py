"""Export responsive encodings of the retained generated shipping photograph."""
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=root/'public/images/export-hero-original.png'
with Image.open(source) as image:
    for width in (640,1280,1920):
        resized=image.copy()
        resized.thumbnail((width,10000),Image.Resampling.LANCZOS)
        resized.save(root/f'public/images/export-hero-{width}.webp','WEBP',quality=84,method=6)
        print(width,resized.size)
