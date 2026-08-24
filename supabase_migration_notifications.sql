-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- success, warning, alert
    title TEXT NOT NULL,
    desc_text TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 1. Allow operators to view only their own notifications
CREATE POLICY "Operators can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = operator_id);

-- 2. Allow operators to update only their own notifications
CREATE POLICY "Operators can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = operator_id);

-- Trigger function to notify on submission status changes
CREATE OR REPLACE FUNCTION public.notify_on_submission_status_change()
RETURNS trigger AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND old.status <> new.status) THEN
    INSERT INTO public.notifications (operator_id, type, title, desc_text)
    VALUES (
      new.operator_id,
      CASE 
        WHEN new.status = 'APPROVED' THEN 'success'
        WHEN new.status = 'REJECTED' THEN 'alert'
        ELSE 'warning'
      END,
      CASE 
        WHEN new.status = 'APPROVED' THEN 'Video Submission Approved!'
        WHEN new.status = 'REJECTED' THEN 'Video Submission Rejected'
        ELSE 'Submission status updated'
      END,
      CASE 
        WHEN new.status = 'APPROVED' THEN 'Your video submission for task "' || new.recipe_title || '" has been approved.'
        WHEN new.status = 'REJECTED' then 'Your video submission for task "' || new.recipe_title || '" has been rejected. Feedback: ' || COALESCE(new.rejection_reason, 'None provided.')
        ELSE 'Your video submission status is now ' || new.status || '.'
      END
    );
  END IF;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on public.submissions
DROP TRIGGER IF EXISTS on_submission_status_change ON public.submissions;
CREATE TRIGGER on_submission_status_change
  AFTER UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_submission_status_change();
