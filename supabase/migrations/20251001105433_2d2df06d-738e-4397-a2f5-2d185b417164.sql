-- Create storage bucket for bus data if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('bus-data', 'bus-data', true)
ON CONFLICT (id) DO NOTHING;

-- Drop policy if exists and recreate
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public Access to Bus Data" ON storage.objects;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Allow public access to read bus data
CREATE POLICY "Public Access to Bus Data"
ON storage.objects FOR SELECT
USING (bucket_id = 'bus-data');