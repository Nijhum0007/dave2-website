-- Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    recipe_id TEXT NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
    recipe_title TEXT NOT NULL,
    environment TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    duration_seconds NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    qa_score INTEGER,
    qa_reviewer TEXT,
    qa_feedback TEXT,
    rejection_reason TEXT,
    drive_link TEXT NOT NULL,
    rig_id TEXT DEFAULT 'Smartphone/Camera',
    teleop_latency_ms NUMERIC DEFAULT 0,
    is_paid BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- 1. Allow operators to view only their own submissions
CREATE POLICY "Operators can view their own submissions"
ON public.submissions
FOR SELECT
USING (auth.uid() = operator_id);

-- 2. Allow operators to insert their own submissions as PENDING only
CREATE POLICY "Operators can insert their own submissions"
ON public.submissions
FOR INSERT
WITH CHECK (
    auth.uid() = operator_id 
    AND status = 'PENDING'
);

-- 3. Allow operators to update their own submissions only if they remain PENDING
CREATE POLICY "Operators can update their own submissions"
ON public.submissions
FOR UPDATE
USING (auth.uid() = operator_id)
WITH CHECK (
    auth.uid() = operator_id 
    AND status = 'PENDING'
);

-- Note: Admin/Service role bypasses RLS automatically, so no admin policies are needed here.
