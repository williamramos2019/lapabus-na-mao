-- Gerar posições iniciais para os ônibus (dados simulados mas realistas)
UPDATE public.bus_positions 
SET 
  latitude = -19.9208 + (RANDOM() - 0.5) * 0.05,
  longitude = -43.9378 + (RANDOM() - 0.5) * 0.05,
  speed_kmh = FLOOR(RANDOM() * 50 + 10)::integer,
  delay_minutes = CASE WHEN RANDOM() < 0.8 THEN 0 ELSE FLOOR(RANDOM() * 10)::integer END,
  last_updated = now()
WHERE status = 'in_service';

-- Se não há posições, criar algumas baseadas nas linhas existentes
INSERT INTO public.bus_positions (line_id, vehicle_id, latitude, longitude, heading, speed_kmh, occupancy_level, status)
SELECT 
  bl.id,
  'BUS_' || bl.line_number || '_' || FLOOR(RANDOM() * 100 + 1)::text,
  -19.9208 + (RANDOM() - 0.5) * 0.05,
  -43.9378 + (RANDOM() - 0.5) * 0.05,
  FLOOR(RANDOM() * 360)::integer,
  FLOOR(RANDOM() * 50 + 10)::integer,
  CASE FLOOR(RANDOM() * 4)::integer
    WHEN 0 THEN 'low'
    WHEN 1 THEN 'medium'
    WHEN 2 THEN 'high'
    ELSE 'full'
  END,
  'in_service'
FROM public.bus_lines bl
WHERE bl.status = 'active'
  AND NOT EXISTS (
    SELECT 1 FROM public.bus_positions bp WHERE bp.line_id = bl.id
  )
LIMIT 15;

-- Inserir alguns alertas de exemplo
INSERT INTO public.bus_alerts (line_id, alert_type, title, message, severity, is_active)
SELECT 
  bl.id,
  'delay',
  'Trânsito Intenso',
  'Atraso de até 10 minutos devido ao tráfego na região central.',
  'warning',
  true
FROM public.bus_lines bl
WHERE bl.line_number IN ('100', '160', '5291')
  AND NOT EXISTS (
    SELECT 1 FROM public.bus_alerts ba WHERE ba.line_id = bl.id
  );

INSERT INTO public.bus_alerts (line_id, alert_type, title, message, severity, is_active)
SELECT 
  bl.id,
  'route_change',
  'Desvio Temporário',
  'Rota modificada devido a obras na via principal. Duração prevista: 3 dias.',
  'info',
  true
FROM public.bus_lines bl
WHERE bl.line_number = '250'
  AND NOT EXISTS (
    SELECT 1 FROM public.bus_alerts ba WHERE ba.line_id = bl.id AND ba.alert_type = 'route_change'
  );