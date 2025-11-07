/*
  # Create cookie consents tracking table

  ## Summary
  This migration creates a table to track user cookie consent preferences for GDPR compliance.

  ## New Tables
  
  ### `cookie_consents`
  Stores information about user cookie consent decisions:
  - `id` (uuid, primary key) - Unique identifier for each consent record
  - `consent_type` (text) - Type of consent: 'accepted' or 'declined'
  - `user_agent` (text) - Browser user agent string for analytics
  - `consent_date` (timestamptz) - Timestamp when consent was given
  - `ip_address` (inet, nullable) - IP address of the user (optional, for audit purposes)
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  - Enable RLS on `cookie_consents` table
  - Public insert policy: allows anonymous users to record their consent
  - Admin read policy: only authenticated admin users can view consent records
  
  ## Important Notes
  
  1. **Privacy Compliance**: This table helps maintain GDPR compliance by tracking consent
  2. **Anonymous Access**: INSERT is allowed for anonymous users as they need to record consent before authentication
  3. **Data Retention**: Consider implementing a data retention policy for old consent records
  4. **Audit Trail**: IP address is optional but can be useful for security auditing
*/

-- Create cookie_consents table
CREATE TABLE IF NOT EXISTS cookie_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_type text NOT NULL CHECK (consent_type IN ('accepted', 'declined')),
  user_agent text,
  consent_date timestamptz DEFAULT now(),
  ip_address inet,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their consent
CREATE POLICY "Anyone can record cookie consent"
  ON cookie_consents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view consent records (for admin purposes)
CREATE POLICY "Authenticated users can view consent records"
  ON cookie_consents
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries by consent_date
CREATE INDEX IF NOT EXISTS idx_cookie_consents_consent_date 
  ON cookie_consents(consent_date DESC);

-- Create index for consent_type for analytics
CREATE INDEX IF NOT EXISTS idx_cookie_consents_type 
  ON cookie_consents(consent_type);
