-- Create the recipes table
CREATE TABLE public.recipes (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    environment TEXT NOT NULL,
    hardware_rig TEXT NOT NULL,
    estimated_time TEXT NOT NULL,
    payout_rate NUMERIC NOT NULL,
    description TEXT NOT NULL,
    target_fps INTEGER NOT NULL,
    expected_duration_sec INTEGER NOT NULL,
    acceptance_rate NUMERIC NOT NULL DEFAULT 100.0,
    difficulty TEXT NOT NULL,
    required_objects TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Add a policy to allow anyone to read recipes (since operators need to see them)
CREATE POLICY "Allow public read access to recipes"
    ON public.recipes
    FOR SELECT
    USING (true);

-- Note: Insert/Update/Delete policies are not strictly necessary if you are exclusively inserting jobs via the Next.js API using the Service Role Key. However, if using the anon key, you would need additional policies.

-- Seed data to get started
INSERT INTO public.recipes (id, code, title, environment, hardware_rig, estimated_time, payout_rate, description, target_fps, expected_duration_sec, difficulty, required_objects, tags) VALUES 
('rec-1', 'HH-DISH-001', 'Load Dishwasher - Kitchen A', 'Household', 'Tier 3 (Standard Phone)', '45 mins', 3.75, 'Record yourself loading at least 5 different types of dishes (plates, bowls, cups, silverware) into a dishwasher from a countertop. Ensure the dishwasher door starts closed, is opened during the video, and closed at the end. Perform this action 10 times from slightly different angles.', 30, 180, 'Beginner', ARRAY['Dishwasher', 'Plates', 'Cups', 'Silverware'], ARRAY['Household', 'Kitchen', 'Pick and Place']),
('rec-2', 'IND-CABLE-004', 'Route Power Cables - Server Rack', 'Warehouse', 'Tier 1 (Depth Camera) or Tier 2 (iPhone Pro)', '60 mins', 5.00, 'Demonstrate routing 3 thick power cables (C13/C14) through a standard 1U cable management arm. Clip the cables securely. Perform this full action 5 times.', 30, 300, 'Expert', ARRAY['Server Rack', 'Power Cables', 'Cable Management Arm'], ARRAY['IT', 'Dexterity', 'Insertion']);
