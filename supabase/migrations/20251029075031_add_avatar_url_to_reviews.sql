/*
  # Добавление поля avatar_url в таблицу reviews

  ## Описание
  Эта миграция добавляет поле для хранения URL аватара/фотографии автора отзыва.

  ## Изменения
  
  ### Таблица `reviews`
  - Добавлена колонка `avatar_url` (text, необязательное) - URL фотографии автора отзыва
  
  ## Примечания
  - Поле необязательное (nullable), что обеспечивает обратную совместимость
  - Существующие отзывы без фото будут отображать инициалы
  - Новые отзывы могут включать фото автора
*/

-- Добавляем колонку avatar_url в таблицу reviews
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE reviews ADD COLUMN avatar_url text;
  END IF;
END $$;