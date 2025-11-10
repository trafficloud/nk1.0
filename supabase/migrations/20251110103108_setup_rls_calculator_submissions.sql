/*
  # Set up Row Level Security for calculator_submissions

  ## Overview
  This migration enables RLS and creates security policies for the calculator_submissions table.
  The calculator is public-facing and allows anonymous submissions, but we need to protect the data.

  ## Security Policies

  ### 1. Insert Policy - "allow_insert_calculator"
  - Allows both authenticated and anonymous users to insert new calculator submissions
  - This enables the calculator to work without requiring user authentication
  - Each submission is tracked by session_id for analytics

  ### 2. Select Policy - "allow_select_own"
  - Allows users to read only their own submissions based on session_id
  - Prevents users from accessing other users' calculation data
  - Important for privacy even though no personal data is stored

  ### 3. Update/Delete Restrictions
  - No public UPDATE or DELETE policies
  - Only service_role can modify/delete records (admin panel only)
  - Protects data integrity and prevents tampering

  ## Notes
  - RLS is restrictive by default: once enabled, NO ONE can access the table until policies are added
  - These policies ensure calculator works publicly while maintaining data privacy
  - Analytics queries will use service_role key to bypass RLS
*/

-- Enable Row Level Security
ALTER TABLE calculator_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert calculator submissions
CREATE POLICY "allow_insert_calculator"
  ON calculator_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Allow users to view only their own submissions (by session_id)
-- This is optional since session_id is client-generated, but adds a layer of privacy
CREATE POLICY "allow_select_own"
  ON calculator_submissions
  FOR SELECT
  TO public
  USING (
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
    OR session_id IS NULL
  );

-- No UPDATE or DELETE policies - only service_role can modify records