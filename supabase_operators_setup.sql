-- Create the operators table
CREATE TABLE public.operators (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED, BANNED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;

-- Allow operators to select their own profile
CREATE POLICY "Operators can view their own profile" 
ON public.operators FOR SELECT 
USING (auth.uid() = id);

-- Allow operators to update their own profile
CREATE POLICY "Operators can update their own profile" 
ON public.operators FOR UPDATE 
USING (auth.uid() = id);

-- Trigger to create an operator profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.operators (id, email, name)
  VALUES (
    new.id, 
    new.email, 
    SPLIT_PART(new.email, '@', 1) -- Use the part of email before @ as default name
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- For existing users, you can manually run this (optional, if you already have users in auth.users):
-- INSERT INTO public.operators (id, email, name)
-- SELECT id, email, SPLIT_PART(email, '@', 1) FROM auth.users
-- ON CONFLICT (id) DO NOTHING;
