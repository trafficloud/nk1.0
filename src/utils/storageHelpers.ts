import { supabase } from '../lib/supabase';

export async function uploadFileToStorage(
  file: Blob,
  fileName: string,
  bucketName: string,
  maxRetries: number = 3
): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      console.log(`File uploaded successfully to Supabase Storage: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      lastError = error as Error;
      console.error(`Upload attempt ${attempt + 1} failed:`, error);

      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw new Error(`Не удалось загрузить файл после ${maxRetries} попыток: ${lastError?.message}`);
}

export async function deleteFileFromStorage(
  fileName: string,
  bucketName: string
): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName]);

    if (error) {
      throw error;
    }

    console.log(`File deleted successfully from Supabase Storage: ${fileName}`);
  } catch (error) {
    console.error('Error deleting file from storage:', error);
    throw new Error('Не удалось удалить файл из хранилища');
  }
}

export function generateUniqueFileName(
  sessionId: string,
  extension: 'pdf' | 'png'
): string {
  const timestamp = Date.now();
  return `calculator_${sessionId}_${timestamp}.${extension}`;
}
