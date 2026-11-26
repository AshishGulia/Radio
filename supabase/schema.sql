-- Run this SQL in your Supabase Dashboard -> SQL Editor

CREATE TABLE IF NOT EXISTS public.user_state (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT DEFAULT '',
  name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  country TEXT DEFAULT 'India',
  user_state TEXT DEFAULT 'Maharashtra',
  theme TEXT DEFAULT 'dark',
  wallpaper TEXT,
  ad_preference TEXT DEFAULT '1-per-hour',
  is_premium BOOLEAN DEFAULT FALSE,
  favourites JSONB DEFAULT '[]'::jsonb,
  collections JSONB DEFAULT '[]'::jsonb,
  playlists JSONB DEFAULT '[]'::jsonb,
  saved_stations JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_state ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own radio state" ON public.user_state;
CREATE POLICY "Users can view their own radio state"
  ON public.user_state FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own radio state" ON public.user_state;
CREATE POLICY "Users can insert their own radio state"
  ON public.user_state FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own radio state" ON public.user_state;
CREATE POLICY "Users can update their own radio state"
  ON public.user_state FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can delete their own radio state" ON public.user_state;
CREATE POLICY "Users can delete their own radio state"
  ON public.user_state FOR DELETE
  USING (auth.uid() = id);
