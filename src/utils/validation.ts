export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?375(25|29|33|44)\d{7}$/;
  return phoneRegex.test(cleanPhone);
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 100;
};

export const isValidRating = (rating: number): boolean => {
  return rating >= 1 && rating <= 5 && Number.isInteger(rating);
};

export const isValidReviewText = (text: string): boolean => {
  const trimmedText = text.trim();
  return trimmedText.length >= 10 && trimmedText.length <= 1000;
};

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email обязателен' };
  }

  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Неверный формат email' };
  }

  return { isValid: true };
};

export const validatePhone = (phone: string): ValidationResult => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Телефон обязателен' };
  }

  if (!isValidPhone(phone)) {
    return { isValid: false, error: 'Неверный формат телефона. Используйте формат: +375(29)XXX-XX-XX' };
  }

  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Имя обязательно' };
  }

  if (!isValidName(name)) {
    return { isValid: false, error: 'Имя должно быть от 2 до 100 символов' };
  }

  return { isValid: true };
};

export const validateRating = (rating: number): ValidationResult => {
  if (!isValidRating(rating)) {
    return { isValid: false, error: 'Оценка должна быть от 1 до 5' };
  }

  return { isValid: true };
};

export const validateReviewText = (text: string): ValidationResult => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'Текст отзыва обязателен' };
  }

  if (!isValidReviewText(text)) {
    return { isValid: false, error: 'Отзыв должен быть от 10 до 1000 символов' };
  }

  return { isValid: true };
};

export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const normalizePhone = (phone: string): string => {
  return phone.replace(/[\s\-\(\)]/g, '');
};
