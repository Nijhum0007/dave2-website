-- Create the admins table
CREATE TABLE public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Note: We do not add public RLS policies because this table should only be accessed via the service role key from Next.js server actions / API routes.

-- INSERT INTO public.admins (username, password_hash) VALUES ('admin', '$2b$10$9CMuDeiLN7b4SJzW4RN0geT5lyMWiH9a9pXRrceU4MneN0SrmGNGG');
