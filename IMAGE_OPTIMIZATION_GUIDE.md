# Image Optimization Guide

This guide provides instructions for optimizing images in the project.

## Current Status

All PNG images are currently in their original format. For optimal performance, they should be converted to WebP format with PNG fallbacks.

## Recommended Optimizations

### 1. Convert Images to WebP

Use an online tool or command-line tool to convert PNG images to WebP:

**Using online tools:**
- https://cloudconvert.com/png-to-webp
- https://tinypng.com/ (also supports WebP)

**Using command-line (if you have cwebp installed):**
```bash
# Install cwebp (macOS)
brew install webp

# Convert a single image
cwebp input.png -o output.webp -q 85

# Batch convert all PNG files
for file in public/*.png; do
  cwebp "$file" -o "${file%.png}.webp" -q 85
done
```

### 2. Images to Optimize

Priority images (above the fold):
- `/public/68712ea0-bc68-4bc6-b983-b3985a37a71c.png` (logo)
- `/public/logo-image.png`

Portfolio images:
- `/public/after.png`, `/public/after1.png`, `/public/after2.png`, `/public/after3.png`
- `/public/before.png`, `/public/before2.png`, `/public/before3.png`
- `/public/before-1.png`, `/public/before-2.png` (renamed from Cyrillic)
- `/public/after-1.png`, `/public/after-2.png` (renamed from Cyrillic)
- `/public/after-copy.png` (renamed from Cyrillic)

Certificate images:
- `/public/license.png`, `/public/license-new.png` (renamed from Cyrillic)
- `/public/sertificat.png`
- `/public/atestat-cmp.png`, `/public/atestat-cmp-new.png` (renamed from file with spaces)
- `/public/attestat-gp.png`, `/public/attestat-gp-new.png` (renamed from file with spaces)

### 3. Video Optimization

The video file `Cinematic_Electrical_Installation_Sequence.mp4` should be optimized:

**Recommended settings:**
- Format: MP4 (H.264)
- Resolution: Max 1920x1080
- Bitrate: 2-4 Mbps
- Duration: Keep under 30 seconds if possible

**Using ffmpeg:**
```bash
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset slow -vf scale=1920:-2 output.mp4
```

### 4. Implementing WebP with Fallbacks

After converting images, update the code to use WebP with PNG fallbacks:

```jsx
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.png" alt="Description" loading="lazy" />
</picture>
```

### 5. Performance Impact

Expected improvements:
- **Image size reduction:** 25-35% smaller files with WebP
- **Faster load times:** Improved Largest Contentful Paint (LCP)
- **Better Core Web Vitals:** Improved overall performance score
- **Bandwidth savings:** Reduced data usage for mobile users

### 6. Additional Recommendations

1. **Responsive images:** Create multiple sizes for different screen sizes
   - Small: 320px width for mobile
   - Medium: 768px width for tablets
   - Large: 1920px width for desktop

2. **Lazy loading:** Already implemented for most images

3. **CDN:** Consider using a CDN for image delivery (Cloudflare, imgix, etc.)

## Testing

After optimization, test:
1. Visual quality (should be indistinguishable from original)
2. Page load speed using Google PageSpeed Insights
3. Mobile performance
4. Browser compatibility (WebP is supported in all modern browsers)

## Notes

- Keep original PNG files as backups
- Test WebP images across different browsers
- Monitor Core Web Vitals after deployment
