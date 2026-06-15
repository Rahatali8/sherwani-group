SHERWANI GROUP — EXPECTED MEDIA ASSETS
======================================
Drop the real files into the paths below. Until then the site uses graceful
gold-tinted gradient placeholders (see src/components/ui/Media.tsx), so nothing
breaks if a file is missing.

VIDEOS  (/public/videos/)
-------------------------
  placeholder.mp4                generic fallback clip (optional)
  hero-1.mp4 ... hero-4.mp4      hero switcher — 5-8s, 1080p, muted, loop
  diversification/
    toyota-highway.mp4           3-5s each, muted, loop
    builders.mp4
    trv.mp4
    trims.mp4
    engineering.mp4
    hub-motors.mp4
    hub-rally.mp4
    farms.mp4

IMAGES  (/public/images/)
-------------------------
  ceo.jpg                        Shujaat Sherwani (portrait, ~1200x1500)
  about-feature.jpg              About section hero/feature image (~1920x1080)
  logo.svg                       group logo (swaps the text logo)
  textures/dark-gold-bg.jpg      optional section background
  projects/
    bloom-gardens.jpg            ~1600x1000
    royal-suites.jpg
    hub-valley.jpg
    address-one.jpg
  clients/
    1.png ... 44.png             transparent client logos

NOTES (final — Phase 10)
------------------------
- Videos: H.264 MP4, muted, web-optimized with faststart. Target < 4 MB each;
  hero clips 5-8s, diversification 3-5s. Offscreen videos auto-pause (perf).
- Images: .jpg for photos (sRGB, ~80% quality), transparent .png for logos.
  next/image is used with `sizes`, so just drop files at the exact paths.
- Everything degrades gracefully: missing files show a gold gradient + label,
  so the site never looks broken while assets are pending.
- Currently present: videos/hero-1.mp4. Everything else still placeholder.
