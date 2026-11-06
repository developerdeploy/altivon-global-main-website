"""Encode local design assets without altering the retained original artwork."""
from pathlib import Path
from PIL import Image
import json, math

root = Path(__file__).resolve().parents[1]
images = root / 'public/images'
for source in images.glob('*.jpg'):
    with Image.open(source) as image:
        for width in (96, 320, 512):
            resized=image.copy()
            resized.thumbnail((width, width*2), Image.Resampling.LANCZOS)
            resized.save(images/f'{source.stem}-{width}.webp', 'WEBP', quality=82, method=6)
with Image.open(root/'public/brand/altivonglobal-original.png') as image:
    image.crop((385,205,1245,960)).resize((430,378),Image.Resampling.LANCZOS).save(root/'public/brand/emblem-header.webp','WEBP',quality=92,method=6)
    image.crop((185,1100,1415,1280)).save(root/'public/brand/wordmark-header.webp','WEBP',lossless=True,method=6)

points=json.loads((root/'public/data/land-points.json').read_text())
svg=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><radialGradient id="s" cx="35%" cy="30%"><stop stop-color="#47664a"/><stop offset=".7" stop-color="#173e30"/><stop offset="1" stop-color="#05261e"/></radialGradient><clipPath id="c"><circle cx="300" cy="300" r="222"/></clipPath></defs><circle cx="300" cy="300" r="222" fill="url(#s)"/><g clip-path="url(#c)" fill="none" stroke="#9da777" stroke-opacity=".18">']
for height in (75,150,220): svg.append(f'<ellipse cx="300" cy="300" rx="222" ry="{height}"/>')
for width in (65,155): svg.append(f'<ellipse cx="300" cy="300" rx="{width}" ry="222"/>')
svg.append('</g><g fill="#d3b47a">')
for lon,lat in points:
    a=math.radians(lat); b=math.radians(lon-60)
    z=math.cos(a)*math.cos(b)
    if z>0:
        x=300+222*math.cos(a)*math.sin(b); y=300-222*math.sin(a)
        svg.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1.25" opacity="{.3+.6*z:.2f}"/>')
svg.append('</g><g fill="none" stroke="#c3a46a" stroke-opacity=".55"><ellipse cx="300" cy="300" rx="276" ry="108" transform="rotate(-27 300 300)"/><path d="M349 216 Q260 -8 159 176 M349 216 Q486 75 513 345 M349 216 Q426 149 446 282"/></g><g fill="#efd69d"><circle cx="349" cy="216" r="5"/><circle cx="159" cy="176" r="3"/><circle cx="513" cy="345" r="3"/><circle cx="446" cy="282" r="3"/></g></svg>')
(images/'export-globe-still.svg').write_text(''.join(svg),encoding='utf-8')
print('Created responsive WebP images, cropped brand assets, and static globe.')
