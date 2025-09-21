-- Create table for real-time bus positions
CREATE TABLE public.bus_positions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  line_id uuid NOT NULL,
  vehicle_id text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  heading integer,
  speed_kmh integer,
  occupancy_level text CHECK (occupancy_level IN ('low', 'medium', 'high', 'full')),
  next_stop_id text,
  estimated_arrival_time timestamp with time zone,
  delay_minutes integer DEFAULT 0,
  status text DEFAULT 'in_service' CHECK (status IN ('in_service', 'breakdown', 'out_of_service')),
  last_updated timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for user notifications preferences
CREATE TABLE public.user_notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  line_id uuid REFERENCES public.bus_lines(id) ON DELETE CASCADE,
  stop_name text,
  notification_type text NOT NULL CHECK (notification_type IN ('arrival', 'delay', 'route_change')),
  advance_minutes integer DEFAULT 5,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for alert messages
CREATE TABLE public.bus_alerts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  line_id uuid REFERENCES public.bus_lines(id) ON DELETE CASCADE,
  alert_type text NOT NULL CHECK (alert_type IN ('delay', 'route_change', 'service_disruption', 'maintenance')),
  title text NOT NULL,
  message text NOT NULL,
  severity text DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  is_active boolean DEFAULT true,
  starts_at timestamp with time zone DEFAULT now(),
  ends_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.bus_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bus_alerts ENABLE ROW LEVEL SECURITY;

-- RLS policies for bus_positions (public read access)
CREATE POLICY "Bus positions are viewable by everyone"
ON public.bus_positions
FOR SELECT
USING (true);

-- RLS policies for user_notifications (users can only access their own)
CREATE POLICY "Users can view their own notifications"
ON public.user_notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notifications"
ON public.user_notifications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.user_notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
ON public.user_notifications
FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for bus_alerts (public read access)
CREATE POLICY "Bus alerts are viewable by everyone"
ON public.bus_alerts
FOR SELECT
USING (is_active = true);

-- Add indexes for better performance
CREATE INDEX idx_bus_positions_line_id ON public.bus_positions(line_id);
CREATE INDEX idx_bus_positions_last_updated ON public.bus_positions(last_updated);
CREATE INDEX idx_user_notifications_user_id ON public.user_notifications(user_id);
CREATE INDEX idx_user_notifications_line_id ON public.user_notifications(line_id);
CREATE INDEX idx_bus_alerts_line_id ON public.bus_alerts(line_id);
CREATE INDEX idx_bus_alerts_active ON public.bus_alerts(is_active);

-- Enable realtime for bus positions
ALTER TABLE public.bus_positions REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bus_positions;

-- Create trigger for updating timestamps
CREATE TRIGGER update_user_notifications_updated_at
BEFORE UPDATE ON public.user_notifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bus_alerts_updated_at
BEFORE UPDATE ON public.bus_alerts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample bus positions for testing
INSERT INTO public.bus_positions (line_id, vehicle_id, latitude, longitude, heading, speed_kmh, occupancy_level, status)
SELECT 
  id,
  'BUS_' || SUBSTRING(line_number FROM 1 FOR 4) || '_' || FLOOR(RANDOM() * 100 + 1)::text,
  -19.9208 + (RANDOM() - 0.5) * 0.1, -- Around Belo Horizonte coordinates
  -43.9378 + (RANDOM() - 0.5) * 0.1,
  FLOOR(RANDOM() * 360)::integer,
  FLOOR(RANDOM() * 60 + 10)::integer,
  CASE FLOOR(RANDOM() * 4)::integer
    WHEN 0 THEN 'low'
    WHEN 1 THEN 'medium'
    WHEN 2 THEN 'high'
    ELSE 'full'
  END,
  'in_service'
FROM public.bus_lines 
WHERE status = 'active'
LIMIT 20;