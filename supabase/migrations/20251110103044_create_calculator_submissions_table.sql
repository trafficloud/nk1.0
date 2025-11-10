/*
  # Create calculator submissions table

  ## Overview
  This table stores all calculator submissions from the electrical work cost calculator.
  It tracks user inputs, calculation results, and generated PDF/image URLs for analytics and future reference.

  ## New Tables
  - `calculator_submissions`
    - `id` (uuid, primary key) - Unique identifier for each submission
    - `session_id` (text) - Browser session identifier to track user sessions
    - `object_type` (text) - Type of object: apartment, house, office, commercial
    - `area` (numeric) - Object area in square meters
    - `points` (integer) - Number of electrical points (outlets)
    - `lights` (integer) - Number of light fixtures
    - `panel` (text) - Type of electrical panel selected
    - `rcd` (text) - Type of RCD (residual current device)
    - `chase_m` (numeric) - Chase length in meters
    - `materials_tier` (text) - Materials quality tier: economy, standard, premium
    - `region` (text) - Region/city for pricing adjustments
    - `urgency` (text) - Work urgency: normal, urgent, very_urgent
    - `wall_material` (text) - Wall material type
    - `height_gt3` (text) - Whether height is greater than 3 meters
    - `opt_warm_floor` (boolean) - Warm floor option selected
    - `opt_weak_current` (boolean) - Weak current systems option
    - `opt_grounding` (boolean) - Grounding system option
    - `opt_meter_move` (boolean) - Meter relocation option
    - `calculation_result` (jsonb) - Full calculation result with min/max/breakdown
    - `pdf_url` (text) - URL of generated PDF in Supabase Storage
    - `image_url` (text) - URL of generated image in Supabase Storage
    - `user_agent` (text) - Browser user agent for analytics
    - `created_at` (timestamptz) - Timestamp of submission

  ## Indexes
  - `idx_calc_region_created` - For analytics by region and date
  - `idx_calc_object_type` - For analytics by object type
  - `idx_calc_created` - For time-based queries

  ## Security
  - RLS will be enabled in a separate migration
  - Table is designed for anonymous submissions (no user authentication required)
*/

-- Create calculator submissions table
CREATE TABLE IF NOT EXISTS calculator_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text,
  object_type text,
  area numeric,
  points integer,
  lights integer,
  panel text,
  rcd text,
  chase_m numeric,
  materials_tier text,
  region text,
  urgency text,
  wall_material text,
  height_gt3 text,
  opt_warm_floor boolean DEFAULT false,
  opt_weak_current boolean DEFAULT false,
  opt_grounding boolean DEFAULT false,
  opt_meter_move boolean DEFAULT false,
  calculation_result jsonb NOT NULL,
  pdf_url text,
  image_url text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_calc_region_created 
  ON calculator_submissions(region, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_calc_object_type 
  ON calculator_submissions(object_type);

CREATE INDEX IF NOT EXISTS idx_calc_created 
  ON calculator_submissions(created_at DESC);

-- Create view for analytics
CREATE OR REPLACE VIEW view_calculator_stats AS
SELECT 
  object_type,
  COUNT(*) as total_submissions,
  AVG(area) as avg_area,
  COUNT(CASE WHEN pdf_url IS NOT NULL THEN 1 END) as pdf_downloads,
  COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as image_downloads,
  SUM(CASE WHEN opt_warm_floor THEN 1 ELSE 0 END) as warm_floor_count,
  SUM(CASE WHEN opt_weak_current THEN 1 ELSE 0 END) as weak_current_count,
  SUM(CASE WHEN opt_grounding THEN 1 ELSE 0 END) as grounding_count,
  SUM(CASE WHEN opt_meter_move THEN 1 ELSE 0 END) as meter_move_count,
  region,
  DATE_TRUNC('day', created_at) as submission_date
FROM calculator_submissions
GROUP BY object_type, region, DATE_TRUNC('day', created_at)
ORDER BY submission_date DESC;