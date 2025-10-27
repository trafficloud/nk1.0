/*
  # Create Reviews Table with Moderation System

  ## Overview
  This migration creates a complete review management system with moderation capabilities.

  ## New Tables
  
  ### `reviews`
  - `id` (uuid, primary key) - Unique review identifier
  - `name` (text, required) - Name of the person leaving review
  - `email` (text, optional) - Email for contact/verification
  - `phone` (text, optional) - Phone number for contact
  - `rating` (integer, required) - Rating from 1 to 5 stars
  - `text` (text, required) - Review content
  - `status` (text, required) - Moderation status: 'pending', 'approved', 'rejected'
  - `created_at` (timestamptz) - When review was submitted
  - `updated_at` (timestamptz) - Last modification time
  - `moderated_at` (timestamptz, nullable) - When review was moderated
  - `moderated_by` (uuid, nullable) - Admin who moderated (future use)

  ## Security
  - RLS enabled on reviews table
  - Public can insert new reviews (they start as 'pending')
  - Public can only read 'approved' reviews
  - Only authenticated users (admins) can update/delete reviews
  - Only authenticated users can see all reviews regardless of status

  ## Indexes
  - Index on status for efficient filtering
  - Index on created_at for sorting
  - Index on rating for analytics

  ## Important Notes
  - All new reviews start with status 'pending' by default
  - Reviews must be approved by admin before appearing publicly
  - Email and phone are optional for privacy
  - Rating is validated to be between 1-5
*/

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  moderated_at timestamptz,
  moderated_by uuid
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert new reviews (they will be pending)
CREATE POLICY "Anyone can submit reviews"
  ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending');

-- Policy: Public can only read approved reviews
CREATE POLICY "Public can view approved reviews"
  ON reviews
  FOR SELECT
  TO anon
  USING (status = 'approved');

-- Policy: Authenticated users (admins) can view all reviews
CREATE POLICY "Admins can view all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users (admins) can update reviews (for moderation)
CREATE POLICY "Admins can moderate reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users (admins) can delete reviews
CREATE POLICY "Admins can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_reviews_timestamp
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_reviews_updated_at();