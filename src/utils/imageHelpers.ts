import { supabase } from '../lib/supabase';

export const getStorageUrl = (path: string): string => {
  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
};

export const createPlaceholderImage = (width: number, height: number, text: string): string => {
  return `https://placehold.co/${width}x${height}/1e40af/ffffff?text=${encodeURIComponent(text)}`;
};

export const IMAGE_PATHS = {
  logo: 'logo.png',
  heroBg: 'hero-background.png',
  portfolio: {
    project1Before: 'portfolio/project1-before.png',
    project1After: 'portfolio/project1-after.png',
    project2Before: 'portfolio/project2-before.png',
    project2After: 'portfolio/project2-after.png',
    project3Before: 'portfolio/project3-before.png',
    project3After: 'portfolio/project3-after.png',
  },
  certificates: {
    license: 'certificates/license.png',
    certificate: 'certificates/certificate.png',
    attestCMP: 'certificates/attest-cmp.png',
    attestGP: 'certificates/attest-gp.png',
  }
} as const;

export const getImageUrl = (path: string, placeholderText?: string): string => {
  const storageUrl = getStorageUrl(path);
  return storageUrl;
};

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackText: string,
  width = 400,
  height = 300
) => {
  const img = event.currentTarget;
  img.src = createPlaceholderImage(width, height, fallbackText);
};
