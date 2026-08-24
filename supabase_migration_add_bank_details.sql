-- Run this script in your Supabase SQL Editor to add the JSONB bank_details column
ALTER TABLE public.operators 
ADD COLUMN IF NOT EXISTS bank_details JSONB DEFAULT '{}'::jsonb;
