const rateLimitStore: { [key: string]: { count: number; timestamp: number } } = {};

export const sanitizeHTML = (dirty: string): string => {
  return dirty
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
}

export const checkRateLimit = (
  key: string,
  options: RateLimitOptions = { maxAttempts: 1, windowMs: 5 * 60 * 1000 }
): { allowed: boolean; resetTime?: number } => {
  const now = Date.now();
  const record = rateLimitStore[key];

  if (!record || now - record.timestamp > options.windowMs) {
    rateLimitStore[key] = { count: 1, timestamp: now };
    return { allowed: true };
  }

  if (record.count >= options.maxAttempts) {
    const resetTime = record.timestamp + options.windowMs;
    return { allowed: false, resetTime };
  }

  record.count += 1;
  return { allowed: true };
};

export const clearRateLimit = (key: string): void => {
  delete rateLimitStore[key];
};

export const getRateLimitKey = (identifier: string, action: string): string => {
  return `${action}_${identifier}`;
};

export const validateFileUpload = (file: File, options: {
  maxSizeMB?: number;
  allowedTypes?: string[];
}): { valid: boolean; error?: string } => {
  const maxSizeMB = options.maxSizeMB || 5;
  const allowedTypes = options.allowedTypes || ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `Файл слишком большой. Максимум ${maxSizeMB}MB` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Недопустимый формат файла' };
  }

  return { valid: true };
};

export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const isValidURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const preventSQLInjection = (input: string): string => {
  return input
    .replace(/['";\\]/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '');
};
