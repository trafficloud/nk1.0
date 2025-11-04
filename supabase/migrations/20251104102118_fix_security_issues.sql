/*
  # Fix Security Issues in Reviews System

  ## Overview
  This migration addresses two security issues:
  1. Removes unused index on rating column
  2. Fixes function search_path mutability issue

  ## Changes Made

  ### 1. Index Removal
  - Drops `idx_reviews_rating` index as it's not being used
  - This improves write performance and reduces storage

  ### 2. Function Security Fix
  - Recreates `update_reviews_updated_at` function with explicit schema qualification
  - Sets explicit search_path to prevent potential security vulnerabilities
  - Uses fully qualified schema references to prevent search_path manipulation attacks

  ## Security Improvements
  - Function now has immutable search_path
  - Protected against search_path hijacking attacks
  - Reduced database overhead by removing unused index
*/

-- Drop unused rating index
DROP INDEX IF EXISTS public.idx_reviews_rating;

-- Drop trigger first
DROP TRIGGER IF EXISTS update_reviews_timestamp ON public.reviews;

-- Drop and recreate function with security definer and explicit schema
DROP FUNCTION IF EXISTS public.update_reviews_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.update_reviews_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger with the updated function
CREATE TRIGGER update_reviews_timestamp
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_reviews_updated_at();