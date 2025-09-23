-- Clear and import comprehensive bus data with corrected SQL

-- Clear existing data (in correct order due to foreign keys)
DELETE FROM bus_schedules;
DELETE FROM bus_positions;  
DELETE FROM bus_alerts;
DELETE FROM bus_lines;

-- Import comprehensive bus lines data
INSERT INTO bus_lines (line_number, line_name, origin, destination, company, route_type, status) VALUES
-- Metropolitan Express lines
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

-- Insert schedules for line 4211
INSERT INTO bus_schedules (line_id, departure_time, day_type, direction)
SELECT l.id, '05:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '06:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '07:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '08:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '12:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '17:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '18:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211'
UNION ALL SELECT l.id, '22:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '4211';

-- Insert schedules for line 510C (high frequency)
INSERT INTO bus_schedules (line_id, departure_time, day_type, direction)
SELECT l.id, '05:10'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '05:25'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '05:40'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '06:10'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '06:25'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '06:40'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '07:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '16:25'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '17:10'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '17:25'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '18:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C'
UNION ALL SELECT l.id, '18:25'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '510C';

-- Insert schedules for line 5140 (São José da Lapa)
INSERT INTO bus_schedules (line_id, departure_time, day_type, direction)
SELECT l.id, '05:30'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '06:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '06:30'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '07:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '07:30'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '12:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '17:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '17:30'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '18:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140'
UNION ALL SELECT l.id, '21:00'::time, 'weekday', 'ida' FROM bus_lines l WHERE l.line_number = '5140';

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

-- Create alerts for various lines
INSERT INTO bus_alerts (line_id, title, message, alert_type, severity, starts_at, ends_at)
VALUES 
((SELECT id FROM bus_lines WHERE line_number = '510C'), 'Atraso na Linha 510C', 'Atraso de aproximadamente 15 minutos devido ao trânsito intenso na BR-040', 'delay', 'warning', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '2 hours'),
((SELECT id FROM bus_lines WHERE line_number = '5291'), 'Linha Executiva em Operação Normal', 'Linha executiva operando normalmente com ar-condicionado', 'info', 'info', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '2 hours'),
((SELECT id FROM bus_lines WHERE line_number = '5140'), 'Horário Especial São José da Lapa', 'Horários especiais durante o período de férias escolares', 'schedule_change', 'info', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '2 hours');