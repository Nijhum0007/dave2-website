-- 1. Add is_paid to submissions
ALTER TABLE public.submissions 
ADD COLUMN IF NOT EXISTS is_paid BOOLEAN DEFAULT false;

-- 2. Create payouts table
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'PROCESSING', -- PROCESSING, PAID, FAILED
    transaction_ref TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

-- Allow operators to view their own payouts
CREATE POLICY "Operators can view their own payouts" 
ON public.payouts FOR SELECT 
USING (auth.uid() = operator_id);

-- Allow service_role to insert/update (automatically bypassed by Supabase, no policy needed).
-- Do not allow public/anon inserts or updates.
