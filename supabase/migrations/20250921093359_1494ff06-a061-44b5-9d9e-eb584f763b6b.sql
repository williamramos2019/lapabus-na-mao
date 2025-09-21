-- Inserir dados reais das linhas de ônibus baseados nos PDFs fornecidos
INSERT INTO public.bus_lines (line_number, line_name, origin, destination, route_type, company, status) VALUES
('100', 'Vera Cruz', 'Terminal São Benedito', 'Vera Cruz', 'convencional', 'Metropolitano', 'active'),
('130', 'Manoel Brandão', 'Terminal São Benedito', 'Manoel Brandão', 'convencional', 'Metropolitano', 'active'),
('160', 'Lagoa de Santo Antônio', 'Terminal São Benedito', 'Lagoa de Santo Antônio', 'convencional', 'Metropolitano', 'active'),
('170', 'Felipe Cláudio de Sales', 'Terminal São Benedito', 'Felipe Cláudio de Sales', 'convencional', 'Metropolitano', 'active'),
('180', 'Morada dos Angicos', 'Terminal São Benedito', 'Morada dos Angicos', 'convencional', 'Metropolitano', 'active'),
('190', 'Dr. Lund', 'Terminal São Benedito', 'Dr. Lund', 'convencional', 'Metropolitano', 'active'),
('250', 'Circular', 'Terminal São Benedito', 'Centro', 'circular', 'Metropolitano', 'active'),
('300', 'Quinta do Sumidouro', 'Terminal São Benedito', 'Quinta do Sumidouro', 'convencional', 'Metropolitano', 'active'),
('5110', 'Pedro Leopoldo - Lagoa Santa', 'Pedro Leopoldo', 'Lagoa Santa', 'intermunicipal', 'Metropolitano', 'active'),
('5120', 'Pedro Leopoldo - Aeroporto de Confins', 'Pedro Leopoldo', 'Aeroporto de Confins', 'express', 'Metropolitano', 'active'),
('5121', 'Pedro Leopoldo - Aeroporto de Confins', 'Pedro Leopoldo', 'Aeroporto de Confins', 'express', 'Metropolitano', 'active'),
('5130', 'Dom Pedro I - Terminal Vilarinho', 'Dom Pedro I', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5308', 'Dom Pedro I - Terminal Vilarinho', 'Dom Pedro I', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5140', 'São José da Lapa - Terminal Vilarinho', 'São José da Lapa', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5150', 'São José da Lapa - Terminal Vilarinho', 'São José da Lapa', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5141', 'São José da Lapa - Terminal Vilarinho via Maria de Lourdes', 'São José da Lapa', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5160', 'Cachoeira - Terminal Vilarinho via Lar de Minas', 'Cachoeira', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5162', 'Cachoeira - Terminal Vilarinho via Lar de Minas', 'Cachoeira', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5170', 'Vespasiano - Tavares', 'Vespasiano', 'Tavares', 'convencional', 'Metropolitano', 'active'),
('5180', 'Pedro Leopoldo - Lapinha', 'Pedro Leopoldo', 'Lapinha', 'convencional', 'Metropolitano', 'active'),
('5190', 'Pedro Leopoldo - Palmital', 'Pedro Leopoldo', 'Palmital', 'convencional', 'Metropolitano', 'active'),
('5230', 'Vespasiano - Bela Vista', 'Vespasiano', 'Bela Vista', 'convencional', 'Metropolitano', 'active'),
('5280', 'Dom Pedro I - Aeroporto Confins', 'Dom Pedro I', 'Aeroporto de Confins', 'express', 'Metropolitano', 'active'),
('5282', 'Mocambeiro - Terminal Vilarinho', 'Mocambeiro', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5283', 'Vespasiano - Pedro Leopoldo', 'Vespasiano', 'Pedro Leopoldo', 'intermunicipal', 'Metropolitano', 'active'),
('5296', 'Vespasiano - Pedro Leopoldo', 'Vespasiano', 'Pedro Leopoldo', 'intermunicipal', 'Metropolitano', 'active'),
('5287', 'Pedro Leopoldo - Mocambeiro', 'Pedro Leopoldo', 'Mocambeiro', 'convencional', 'Metropolitano', 'active'),
('5288', 'Pedro Leopoldo - Mocambeiro', 'Pedro Leopoldo', 'Mocambeiro', 'convencional', 'Metropolitano', 'active'),
('5289', 'Mocambeiro - Terminal Vilarinho via Lagoa de Santo Antônio', 'Mocambeiro', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5291', 'Executivo Pedro Leopoldo - Centro de BH', 'Pedro Leopoldo', 'Centro de Belo Horizonte', 'executivo', 'Metropolitano', 'active'),
('5292', 'Vespasiano - Cachoeira', 'Vespasiano', 'Cachoeira', 'convencional', 'Metropolitano', 'active'),
('5293', 'Lagoa de Santo Antônio - Terminal Vilarinho', 'Lagoa de Santo Antônio', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5297', 'Pedro Leopoldo - Terminal Vilarinho', 'Pedro Leopoldo', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5298', 'Cidade de Confins - Terminal Vilarinho', 'Cidade de Confins', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5302', 'Cidade de Confins - Terminal Vilarinho', 'Cidade de Confins', 'Terminal Vilarinho', 'intermunicipal', 'Metropolitano', 'active'),
('5303', 'Dom Pedro I - Lagoa Santa', 'Dom Pedro I', 'Lagoa Santa', 'intermunicipal', 'Metropolitano', 'active'),
('5305', 'Vespasiano - Cachoeira via Nova Granja', 'Vespasiano', 'Cachoeira', 'convencional', 'Metropolitano', 'active'),
('5307', 'Vespasiano - Inácio de Carvalho', 'Vespasiano', 'Inácio de Carvalho', 'convencional', 'Metropolitano', 'active');

-- Inserir horários de exemplo para algumas linhas principais
INSERT INTO public.bus_schedules (line_id, departure_time, direction, day_type, stop_name, stop_order) 
SELECT 
  bl.id,
  (ARRAY['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'])[generate_series] AS departure_time,
  CASE WHEN generate_series % 2 = 1 THEN 'ida' ELSE 'volta' END AS direction,
  'weekday' AS day_type,
  CASE WHEN generate_series % 2 = 1 THEN bl.origin ELSE bl.destination END AS stop_name,
  generate_series AS stop_order
FROM public.bus_lines bl
CROSS JOIN generate_series(1, 35)
WHERE bl.line_number IN ('100', '130', '160', '5110', '5140', '5180', '5291', '5297');

-- Inserir horários reduzidos para sábados
INSERT INTO public.bus_schedules (line_id, departure_time, direction, day_type, stop_name, stop_order) 
SELECT 
  bl.id,
  (ARRAY['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'])[generate_series] AS departure_time,
  CASE WHEN generate_series % 2 = 1 THEN 'ida' ELSE 'volta' END AS direction,
  'saturday' AS day_type,
  CASE WHEN generate_series % 2 = 1 THEN bl.origin ELSE bl.destination END AS stop_name,
  generate_series AS stop_order
FROM public.bus_lines bl
CROSS JOIN generate_series(1, 17)
WHERE bl.line_number IN ('100', '130', '160', '5110', '5140', '5180', '5291', '5297');

-- Inserir horários ainda mais reduzidos para domingos
INSERT INTO public.bus_schedules (line_id, departure_time, direction, day_type, stop_name, stop_order) 
SELECT 
  bl.id,
  (ARRAY['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'])[generate_series] AS departure_time,
  CASE WHEN generate_series % 2 = 1 THEN 'ida' ELSE 'volta' END AS direction,
  'sunday' AS day_type,
  CASE WHEN generate_series % 2 = 1 THEN bl.origin ELSE bl.destination END AS stop_name,
  generate_series AS stop_order
FROM public.bus_lines bl
CROSS JOIN generate_series(1, 8)
WHERE bl.line_number IN ('100', '130', '160', '5110', '5140', '5180', '5291', '5297');