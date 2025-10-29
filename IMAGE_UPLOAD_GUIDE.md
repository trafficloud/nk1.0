# Image Upload Guide

This guide explains how to upload and manage images for your project using Supabase Storage.

## Problem Summary

During a platform migration, the image files in the `/public` folder were corrupted and replaced with placeholder URLs. To resolve this permanently and ensure better reliability, we've migrated the image system to use Supabase Storage.

## What Changed

1. **Storage Backend**: Images now use Supabase Storage instead of local files
2. **Automatic Fallbacks**: All images now have error handling with placeholder fallbacks
3. **Centralized Configuration**: Image paths are managed in `src/utils/imageHelpers.ts`
4. **Better Reliability**: Supabase Storage provides better uptime and redundancy

## Required Images

You need to upload the following images to Supabase Storage:

### 1. Logo (Header)
- **Path**: `logo.png`
- **Used in**: Header component
- **Recommended size**: 200x200px
- **Description**: Company logo (Надежный Контакт)

### 2. Hero Background
- **Path**: `hero-background.png`
- **Used in**: Hero section background
- **Recommended size**: 1920x1080px
- **Description**: Background image for hero section

### 3. Portfolio Images (Before/After)

#### Project 1 - ЖК "Минск Мир"
- **Before**: `portfolio/project1-before.png`
- **After**: `portfolio/project1-after.png`
- **Recommended size**: 800x600px

#### Project 2 - ЖК "Маяк Минска"
- **Before**: `portfolio/project2-before.png`
- **After**: `portfolio/project2-after.png`
- **Recommended size**: 800x600px

#### Project 3 - ЖК "Брест Сити"
- **Before**: `portfolio/project3-before.png`
- **After**: `portfolio/project3-after.png`
- **Recommended size**: 800x600px

### 4. Certificate Images

- **License**: `certificates/license.png` (Лицензия на работу)
- **Certificate**: `certificates/certificate.png` (Сертификат соответствия СТБ)
- **Attest CMP**: `certificates/attest-cmp.png` (Аттестат СМР)
- **Attest GP**: `certificates/attest-gp.png` (Аттестат ГП)
- **Recommended size**: 800x1000px (portrait orientation)

## How to Upload Images

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://rqfstisofqubhlcjrjyr.supabase.co
2. Navigate to **Storage** in the left sidebar
3. Click on the **images** bucket
4. Use the **Upload** button to add your images
5. Create folders as needed:
   - Create a `portfolio` folder for before/after images
   - Create a `certificates` folder for documents
6. Upload each image with the exact filename from the list above

### Option 2: Using JavaScript Code

You can also upload images programmatically. Create a new file or use the browser console:

```javascript
import { supabase } from './src/lib/supabase';

async function uploadImage(file, path) {
  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    console.error('Upload error:', error);
    return null;
  }

  console.log('Uploaded:', data);
  return data;
}

// Example usage:
// const file = document.querySelector('input[type="file"]').files[0];
// await uploadImage(file, 'logo.png');
```

### Option 3: Bulk Upload Script

For uploading multiple images at once, you can create a script:

```javascript
// upload-images.js
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function uploadFromFolder(localFolder, remotePath = '') {
  const files = fs.readdirSync(localFolder);

  for (const file of files) {
    const filePath = path.join(localFolder, file);
    const fileBuffer = fs.readFileSync(filePath);
    const remoteName = remotePath ? `${remotePath}/${file}` : file;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(remoteName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading ${file}:`, error);
    } else {
      console.log(`✓ Uploaded: ${remoteName}`);
    }
  }
}

// Usage:
// await uploadFromFolder('./backup-images', '');
// await uploadFromFolder('./backup-images/portfolio', 'portfolio');
// await uploadFromFolder('./backup-images/certificates', 'certificates');
```

## Verifying Uploads

After uploading, you can verify images are accessible by:

1. Opening the Supabase Storage dashboard
2. Clicking on any image to preview it
3. Checking that the public URL works

Alternatively, visit your website and check if:
- The logo appears in the header
- The hero background displays correctly
- Portfolio before/after images show up
- Certificate images are visible in the About section

## Placeholder System

If an image fails to load, the system automatically shows a placeholder with:
- Relevant text (e.g., "НК" for logo, "До" for before images)
- A professional blue color scheme
- Appropriate dimensions

This ensures the site remains functional even if some images are missing.

## Image File Requirements

- **Format**: PNG, JPEG, JPG, or WebP
- **Maximum size**: 5MB per file
- **Naming**: Use the exact filenames listed above
- **Optimization**: Compress images before uploading for better performance

## Troubleshooting

### Images not showing after upload
1. Check the filename matches exactly (case-sensitive)
2. Verify the image is in the correct folder path
3. Clear your browser cache
4. Check browser console for errors

### Upload fails
1. Ensure file size is under 5MB
2. Check file format is supported (PNG, JPEG, JPG, WebP)
3. Verify you're uploading to the correct bucket ('images')

### Placeholder shows instead of image
1. This is normal behavior when images are missing
2. Upload the corresponding image to Supabase Storage
3. Refresh the page after uploading

## Storage Bucket Details

- **Bucket name**: `images`
- **Access**: Public (anyone can view)
- **File size limit**: 5MB per file
- **Allowed formats**: PNG, JPEG, JPG, WebP
- **URL pattern**: `https://rqfstisofqubhlcjrjyr.supabase.co/storage/v1/object/public/images/{path}`

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase credentials in `.env`
3. Ensure the storage bucket exists and is public
4. Review the image paths in `src/utils/imageHelpers.ts`

## Next Steps

1. Gather all original images from your backup
2. Upload them to Supabase Storage following this guide
3. Verify each image displays correctly on the website
4. Consider setting up automatic image optimization
5. Add more images as your portfolio grows

---

**Important**: Keep backup copies of all your images in a safe location to prevent future data loss.
