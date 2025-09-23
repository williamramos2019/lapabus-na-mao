-- Count and import all bus lines from the new JSON data
-- First, let's clear existing data and import the comprehensive dataset

-- Clear existing data (in correct order due to foreign keys)
DELETE FROM bus_schedules;
DELETE FROM bus_positions;
DELETE FROM bus_alerts;
DELETE FROM bus_lines;

-- Import main bus lines with comprehensive data
INSERT INTO bus_lines (line_number, line_name, origin, destination, company, route_type, status) VALUES
-- Metro/Express lines
('4211', 'Terminal São Benedito / Circular Conjunto Cristina', 'Terminal São Benedito', 'Conjunto Cristina', 'Move Metropolitano', 'circular', 'active'),
('5889', 'Vila Maria / Terminal Vilarinho', 'Vila Maria', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('402H', 'Terminal São Gabriel / Hospitais', 'Terminal São Gabriel', 'Hospitais', 'Move Metropolitano', 'express', 'active'),
('510C', 'Terminal Vilarinho / Belo Horizonte Direta', 'Terminal Vilarinho', 'Belo Horizonte', 'Move Metropolitano', 'express', 'active'),
('4810', 'Caeté / Terminal São Gabriel', 'Caeté', 'Terminal São Gabriel', 'Move Metropolitano', 'convencional', 'active'),
('5110', 'Pedro Leopoldo / Lagoa Santa', 'Pedro Leopoldo', 'Lagoa Santa', 'Move Metropolitano', 'convencional', 'active'),
('5120', 'Pedro Leopoldo / Aeroporto de Confins', 'Pedro Leopoldo', 'Aeroporto Confins', 'Move Metropolitano', 'express', 'active'),
('5130', 'D. Pedro I / Terminal Vilarinho', 'Dom Pedro I', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5140', 'São José da Lapa / Terminal Vilarinho', 'São José da Lapa', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5141', 'São José da Lapa / T. Vilarinho via Maria de Lourdes', 'São José da Lapa', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5160', 'Cachoeira / Terminal Vilarinho via Lar de Minas', 'Cachoeira', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5170', 'Vespasiano / Tavares', 'Vespasiano', 'Tavares', 'Move Metropolitano', 'convencional', 'active'),
('5180', 'Pedro Leopoldo / Lapinha', 'Pedro Leopoldo', 'Lapinha', 'Move Metropolitano', 'convencional', 'active'),
('5190', 'Pedro Leopoldo / Palmital', 'Pedro Leopoldo', 'Palmital', 'Move Metropolitano', 'convencional', 'active'),
('5230', 'Vespasiano / Bela Vista', 'Vespasiano', 'Bela Vista', 'Move Metropolitano', 'convencional', 'active'),
('5280', 'Dom Pedro I / Aeroporto Confins', 'Dom Pedro I', 'Aeroporto Confins', 'Move Metropolitano', 'express', 'active'),
('5282', 'Mocambeiro / Terminal Vilarinho', 'Mocambeiro', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5283', 'Vespasiano / Pedro Leopoldo', 'Vespasiano', 'Pedro Leopoldo', 'Move Metropolitano', 'convencional', 'active'),
('5287', 'Pedro Leopoldo / Mocambeiro', 'Pedro Leopoldo', 'Mocambeiro', 'Move Metropolitano', 'convencional', 'active'),
('5289', 'Mocambeiro / T. Vilarinho via Lagoa Santo Antônio', 'Mocambeiro', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5291', 'Executivo Pedro Leopoldo / T. Alvares Cabral Centro BH', 'Pedro Leopoldo', 'Centro BH', 'Move Metropolitano', 'executivo', 'active'),
('5292', 'Vespasiano / Cachoeira', 'Vespasiano', 'Cachoeira', 'Move Metropolitano', 'convencional', 'active'),
('5293', 'Lagoa de Santo Antônio / Terminal Vilarinho', 'Lagoa de Santo Antônio', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5297', 'Pedro Leopoldo / Terminal Vilarinho', 'Pedro Leopoldo', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5298', 'Cidade de Confins / Terminal Vilarinho', 'Cidade de Confins', 'Terminal Vilarinho', 'Move Metropolitano', 'convencional', 'active'),
('5303', 'D. Pedro I / Lagoa Santa', 'Dom Pedro I', 'Lagoa Santa', 'Move Metropolitano', 'convencional', 'active'),
('5305', 'Vespasiano / Cachoeira via Nova Granja', 'Vespasiano', 'Cachoeira', 'Move Metropolitano', 'convencional', 'active'),
('5307', 'Vespasiano / Inacia de Carvalho', 'Vespasiano', 'Inacia de Carvalho', 'Move Metropolitano', 'convencional', 'active'),
-- Additional local lines
('100', 'Vera Cruz', 'Centro', 'Vera Cruz', 'Lapa Transportes', 'convencional', 'active'),
('130', 'Manoel Brandão', 'Centro', 'Manoel Brandão', 'Lapa Transportes', 'convencional', 'active'),
('160', 'Lagoa de Santo Antônio', 'Centro', 'Lagoa de Santo Antônio', 'Lapa Transportes', 'convencional', 'active'),
('170', 'Felipe Cláudio de Sales', 'Centro', 'Felipe Cláudio de Sales', 'Lapa Transportes', 'convencional', 'active'),
('180', 'Morada dos Angicos', 'Centro', 'Morada dos Angicos', 'Lapa Transportes', 'convencional', 'active'),
('190', 'Dr. Lund', 'Centro', 'Dr. Lund', 'Lapa Transportes', 'convencional', 'active'),
('250', 'Circular', 'Centro', 'Bairros', 'Lapa Transportes', 'circular', 'active'),
('300', 'Quinta do Sumidouro', 'Centro', 'Quinta do Sumidouro', 'Lapa Transportes', 'convencional', 'active');

-- Insert comprehensive schedules for main lines
INSERT INTO bus_schedules (line_id, departure_time, day_type, direction) 
SELECT l.id, t.departure_time::time, 'weekday', 'ida'
FROM bus_lines l
CROSS JOIN (
  -- 4211 schedules
  SELECT '05:00'::time as departure_time WHERE l.line_number = '4211'
  UNION SELECT '06:00'::time WHERE l.line_number = '4211'
  UNION SELECT '07:00'::time WHERE l.line_number = '4211'
  UNION SELECT '08:00'::time WHERE l.line_number = '4211'
  UNION SELECT '12:00'::time WHERE l.line_number = '4211'
  UNION SELECT '17:00'::time WHERE l.line_number = '4211'
  UNION SELECT '18:00'::time WHERE l.line_number = '4211'
  UNION SELECT '22:00'::time WHERE l.line_number = '4211'
  -- 510C schedules (high frequency)
  UNION SELECT '05:10'::time WHERE l.line_number = '510C'
  UNION SELECT '05:25'::time WHERE l.line_number = '510C'
  UNION SELECT '05:40'::time WHERE l.line_number = '510C'
  UNION SELECT '06:10'::time WHERE l.line_number = '510C'
  UNION SELECT '06:25'::time WHERE l.line_number = '510C'
  UNION SELECT '06:40'::time WHERE l.line_number = '510C'
  UNION SELECT '07:00'::time WHERE l.line_number = '510C'
  UNION SELECT '16:25'::time WHERE l.line_number = '510C'
  UNION SELECT '17:10'::time WHERE l.line_number = '510C'
  UNION SELECT '17:25'::time WHERE l.line_number = '510C'
  UNION SELECT '18:00'::time WHERE l.line_number = '510C'
  UNION SELECT '18:25'::time WHERE l.line_number = '510C'
  -- 5140 schedules (São José da Lapa)
  UNION SELECT '05:30'::time WHERE l.line_number = '5140'
  UNION SELECT '06:00'::time WHERE l.line_number = '5140'
  UNION SELECT '06:30'::time WHERE l.line_number = '5140'
  UNION SELECT '07:00'::time WHERE l.line_number = '5140'
  UNION SELECT '07:30'::time WHERE l.line_number = '5140'
  UNION SELECT '12:00'::time WHERE l.line_number = '5140'
  UNION SELECT '17:00'::time WHERE l.line_number = '5140'
  UNION SELECT '17:30'::time WHERE l.line_number = '5140'
  UNION SELECT '18:00'::time WHERE l.line_number = '5140'
  UNION SELECT '21:00'::time WHERE l.line_number = '5140'
) t WHERE l.line_number IN ('4211', '510C', '5140');

-- Create real-time positions for all active buses
INSERT INTO bus_positions (line_id, vehicle_id, latitude, longitude, speed_kmh, occupancy_level, status, delay_minutes)
SELECT 
  l.id,
  l.line_number || '-' || (ROW_NUMBER() OVER (PARTITION BY l.id ORDER BY l.line_number)),
  -19.5166 + (RANDOM() - 0.5) * 0.1,  -- Around São José da Lapa
  -43.9654 + (RANDOM() - 0.5) * 0.1,
  (RANDOM() * 40 + 20)::integer,  -- Speed between 20-60 km/h
  CASE 
    WHEN RANDOM() < 0.3 THEN 'baixa'
    WHEN RANDOM() < 0.7 THEN 'média'
    ELSE 'alta'
  END,
  CASE 
    WHEN RANDOM() < 0.9 THEN 'in_service'
    ELSE 'delayed'
  END,
  (RANDOM() * 10)::integer  -- 0-10 minutes delay
FROM bus_lines l
WHERE l.status = 'active';

-- Add more buses for main lines
INSERT INTO bus_positions (line_id, vehicle_id, latitude, longitude, speed_kmh, occupancy_level, status, delay_minutes)
SELECT 
  l.id,
  l.line_number || '-' || (2 + ROW_NUMBER() OVER (PARTITION BY l.id ORDER BY l.line_number)),
  -19.5166 + (RANDOM() - 0.5) * 0.1,
  -43.9654 + (RANDOM() - 0.5) * 0.1,
  (RANDOM() * 40 + 20)::integer,
  CASE 
    WHEN RANDOM() < 0.3 THEN 'baixa'
    WHEN RANDOM() < 0.7 THEN 'média'
    ELSE 'alta'
  END,
  'in_service',
  (RANDOM() * 5)::integer
FROM bus_lines l
WHERE l.line_number IN ('510C', '5140', '5141', '5280', '5291')
AND l.status = 'active';

-- Create alerts for various lines
INSERT INTO bus_alerts (line_id, title, message, alert_type, severity, starts_at, ends_at)
SELECT 
  l.id,
  CASE 
    WHEN l.line_number = '510C' THEN 'Atraso na Linha 510C'
    WHEN l.line_number = '5291' THEN 'Linha Executiva em Operação Normal'
    WHEN l.line_number = '5140' THEN 'Horário Especial São José da Lapa'
    ELSE 'Operação Normal'
  END,
  CASE 
    WHEN l.line_number = '510C' THEN 'Atraso de aproximadamente 15 minutos devido ao trânsito intenso na BR-040'
    WHEN l.line_number = '5291' THEN 'Linha executiva operando normalmente com ar-condicionado'
    WHEN l.line_number = '5140' THEN 'Horários especiais durante o período de férias escolares'
    ELSE 'Linha operando dentro do cronograma normal'
  END,
  CASE 
    WHEN l.line_number = '510C' THEN 'delay'
    WHEN l.line_number = '5291' THEN 'info'
    WHEN l.line_number = '5140' THEN 'schedule_change'
    ELSE 'info'
  END,
  CASE 
    WHEN l.line_number = '510C' THEN 'warning'
    WHEN l.line_number = '5291' THEN 'info'
    WHEN l.line_number = '5140' THEN 'info'
    ELSE 'info'
  END,
  NOW() - INTERVAL '1 hour',
  NOW() + INTERVAL '2 hours'
FROM bus_lines l
WHERE l.line_number IN ('510C', '5291', '5140', '5280')
AND l.status = 'active';