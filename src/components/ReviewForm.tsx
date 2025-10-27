import React, { useState } from 'react';
import { Star, X, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rating: 5,
    text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.text.trim().length < 10) {
      alert('Пожалуйста, напишите более подробный отзыв (минимум 10 символов)');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim() || null,
            phone: formData.phone.trim() || null,
            rating: formData.rating,
            text: formData.text.trim(),
            status: 'pending'
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', rating: 5, text: '' });

      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2500);
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSubmitStatus('idle');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div>
              <h2 className="text-2xl font-bold text-primary">Оставить отзыв</h2>
              <p className="text-sm text-text mt-1">Ваш отзыв появится на сайте после модерации</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Закрыть"
            >
              <X className="w-6 h-6 text-primary" />
            </button>
          </div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mx-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800 font-medium">
                ✓ Спасибо за отзыв! Он появится на сайте после проверки.
              </p>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 font-medium">
                ✗ Ошибка отправки. Попробуйте позже или свяжитесь с нами.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                Ваше имя <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Как вас зовут?"
                disabled={isSubmitting}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Оценка <span className="text-accent">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={isSubmitting}
                    className="transition-transform hover:scale-110 disabled:opacity-50"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || formData.rating)
                          ? 'text-accent fill-accent'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-text self-center">
                  ({formData.rating} из 5)
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="text" className="block text-sm font-semibold text-primary mb-2">
                Ваш отзыв <span className="text-accent">*</span>
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={5}
                value={formData.text}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                placeholder="Расскажите о вашем опыте работы с нами..."
                disabled={isSubmitting}
                minLength={10}
              />
              <p className="text-xs text-text mt-1">
                Минимум 10 символов
              </p>
            </div>

            {/* Contact Info (Optional) */}
            <div className="border-t border-gray-200 pt-5">
              <p className="text-sm font-semibold text-primary mb-3">
                Контакты (необязательно)
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs text-text mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs text-text mb-1">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="+375 (XX) XXX-XX-XX"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <p className="text-xs text-text mt-2">
                Мы можем связаться с вами для уточнения деталей
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="w-full inline-flex items-center justify-center gap-2
                         rounded-xl min-h-[52px] px-8 py-3
                         text-base font-semibold
                         bg-ctaButton text-white hover:bg-accent
                         transition-colors duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Отправить отзыв</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
