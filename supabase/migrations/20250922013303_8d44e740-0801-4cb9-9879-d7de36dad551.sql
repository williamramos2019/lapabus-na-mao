-- Limpar dados existentes usando CASCADE para respeitar chaves estrangeiras
TRUNCATE TABLE public.bus_schedules, public.bus_positions, public.bus_alerts, public.bus_lines CASCADE;

-- Inserir 50 linhas principais baseadas no arquivo JSON do usuário
INSERT INTO public.bus_lines (line_number, line_name, origin, destination, company, route_type, status, scraped_url) VALUES
('4211', 'Terminal São Benedito / Circular Conjunto Cristina', 'Terminal São Benedito', 'Conjunto Cristina', 'Metropolitano', 'circular', 'active', 'https://movemetropolitano.com.br/4211-terminal-sao-benedito-circular-conjunto-cristina'),
('5889', 'Vila Maria / Terminal Vilarinho', 'Vila Maria', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5889-vila-maria-terminal-vilarinho'),
('402H', 'Terminal São Gabriel / Hospitais', 'Terminal São Gabriel', 'Hospitais', 'Metropolitano', 'hospitalar', 'active', 'https://movemetropolitano.com.br/402h-terminal-sao-gabriel-hospitais'),
('510C', 'Terminal Vilarinho / Belo Horizonte (Direta)', 'Terminal Vilarinho', 'Belo Horizonte', 'Metropolitano', 'express', 'active', 'https://movemetropolitano.com.br/510c-terminal-vilarinho-belo-horizonte-direta'),
('4810', 'Caeté / Terminal São Gabriel', 'Caeté', 'Terminal São Gabriel', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4810-caete-terminal-sao-gabriel'),
('4030', 'São Benedito / Alameda da Serra via Anel Rodoviário', 'São Benedito', 'Alameda da Serra', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4030-sao-benedito-alameda-da-serra-via-anel-rodoviario'),
('4335', 'Palmital B / Terminal São Benedito', 'Palmital B', 'Terminal São Benedito', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4335-palmital-b-terminal-sao-benedito'),
('4300', 'Terminal São Benedito / Cachoeirinha (Regular)', 'Terminal São Benedito', 'Cachoeirinha', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4300-terminal-sao-benedito-cachoeirinha-regular'),
('4310', 'Terminal São Benedito / Cachoeirinha (Semi-Direto)', 'Terminal São Benedito', 'Cachoeirinha', 'Metropolitano', 'semi_direto', 'active', 'https://movemetropolitano.com.br/4310-terminal-sao-benedito-cachoeirinha-semi-direto'),
('4330', 'Cachoeirinha / Terminal São Benedito (Retorno)', 'Cachoeirinha', 'Terminal São Benedito', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4330-cachoeirinha-terminal-sao-benedito-retorno'),
('4350', 'Terminal São Benedito / Palmital (Direto)', 'Terminal São Benedito', 'Palmital', 'Metropolitano', 'direto', 'active', 'https://movemetropolitano.com.br/4350-terminal-sao-benedito-palmital-direto'),
('4360', 'Palmital / Terminal São Benedito (Direto)', 'Palmital', 'Terminal São Benedito', 'Metropolitano', 'direto', 'active', 'https://movemetropolitano.com.br/4360-palmital-terminal-sao-benedito-direto'),
('4400', 'Terminal São Benedito / Nova Lima (Centro)', 'Terminal São Benedito', 'Nova Lima', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4400-terminal-sao-benedito-nova-lima-centro'),
('4410', 'Nova Lima / Terminal São Benedito', 'Nova Lima', 'Terminal São Benedito', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4410-nova-lima-terminal-sao-benedito'),
('4500', 'Terminal São Benedito / Vale do Sol', 'Terminal São Benedito', 'Vale do Sol', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4500-terminal-sao-benedito-vale-do-sol'),
('4600', 'Terminal São Benedito / Jardim Canadá', 'Terminal São Benedito', 'Jardim Canadá', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4600-terminal-sao-benedito-jardim-canada'),
('4700', 'Terminal São Benedito / Honório Bicalho', 'Terminal São Benedito', 'Honório Bicalho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4700-terminal-sao-benedito-honorio-bicalho'),
('4800', 'Terminal São Benedito / Rio Acima', 'Terminal São Benedito', 'Rio Acima', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4800-terminal-sao-benedito-rio-acima'),
('4820', 'Rio Acima / Terminal São Benedito', 'Rio Acima', 'Terminal São Benedito', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4820-rio-acima-terminal-sao-benedito'),
('4900', 'Terminal São Benedito / Itabirito', 'Terminal São Benedito', 'Itabirito', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/4900-terminal-sao-benedito-itabirito'),
('5000', 'Terminal Vilarinho / Contagem (Centro)', 'Terminal Vilarinho', 'Contagem', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5000-terminal-vilarinho-contagem-centro'),
('5100', 'Terminal Vilarinho / Pedro Leopoldo', 'Terminal Vilarinho', 'Pedro Leopoldo', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5100-terminal-vilarinho-pedro-leopoldo'),
('5110', 'Pedro Leopoldo / Lagoa Santa', 'Pedro Leopoldo', 'Lagoa Santa', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5110-pedro-leopoldo-lagoa-santa'),
('5120', 'Pedro Leopoldo / Aeroporto de Confins', 'Pedro Leopoldo', 'Aeroporto de Confins', 'Metropolitano', 'aeroporto', 'active', 'https://movemetropolitano.com.br/5120-pedro-leopoldo-aeroporto-confins'),
('5130', 'Dom Pedro I / Terminal Vilarinho', 'Dom Pedro I', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5130-dom-pedro-i-terminal-vilarinho'),
('5140', 'São José da Lapa / Terminal Vilarinho', 'São José da Lapa', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5140-sao-jose-da-lapa-terminal-vilarinho'),
('5150', 'São José da Lapa / Terminal Vilarinho (Direto)', 'São José da Lapa', 'Terminal Vilarinho', 'Metropolitano', 'direto', 'active', 'https://movemetropolitano.com.br/5150-sao-jose-da-lapa-terminal-vilarinho-direto'),
('5160', 'Cachoeira / Terminal Vilarinho', 'Cachoeira', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5160-cachoeira-terminal-vilarinho'),
('5170', 'Vespasiano / Tavares', 'Vespasiano', 'Tavares', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5170-vespasiano-tavares'),
('5180', 'Pedro Leopoldo / Lapinha', 'Pedro Leopoldo', 'Lapinha', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5180-pedro-leopoldo-lapinha'),
('5190', 'Pedro Leopoldo / Palmital', 'Pedro Leopoldo', 'Palmital', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5190-pedro-leopoldo-palmital'),
('5200', 'Terminal Vilarinho / Ribeirão das Neves', 'Terminal Vilarinho', 'Ribeirão das Neves', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5200-terminal-vilarinho-ribeirao-das-neves'),
('5210', 'Ribeirão das Neves / Terminal Vilarinho', 'Ribeirão das Neves', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5210-ribeirao-das-neves-terminal-vilarinho'),
('5220', 'Terminal Vilarinho / Esmeraldas', 'Terminal Vilarinho', 'Esmeraldas', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5220-terminal-vilarinho-esmeraldas'),
('5230', 'Vespasiano / Bela Vista', 'Vespasiano', 'Bela Vista', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5230-vespasiano-bela-vista'),
('5240', 'Terminal Vilarinho / Justinópolis', 'Terminal Vilarinho', 'Justinópolis', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5240-terminal-vilarinho-justinopolis'),
('5250', 'Justinópolis / Terminal Vilarinho', 'Justinópolis', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5250-justinopolis-terminal-vilarinho'),
('5260', 'Terminal Vilarinho / Floresta', 'Terminal Vilarinho', 'Floresta', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5260-terminal-vilarinho-floresta'),
('5270', 'Floresta / Terminal Vilarinho', 'Floresta', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5270-floresta-terminal-vilarinho'),
('5280', 'Dom Pedro I / Aeroporto Confins', 'Dom Pedro I', 'Aeroporto de Confins', 'Metropolitano', 'aeroporto', 'active', 'https://movemetropolitano.com.br/5280-dom-pedro-i-aeroporto-confins'),
('5290', 'Terminal Vilarinho / Matozinhos', 'Terminal Vilarinho', 'Matozinhos', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5290-terminal-vilarinho-matozinhos'),
('5291', 'Executivo Pedro Leopoldo / Terminal Álvares Cabral', 'Pedro Leopoldo', 'Centro de BH', 'Metropolitano', 'executivo', 'active', 'https://movemetropolitano.com.br/5291-executivo-pedro-leopoldo-terminal-alvares-cabral-centro-bh'),
('5300', 'Terminal Vilarinho / Capim Branco', 'Terminal Vilarinho', 'Capim Branco', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5300-terminal-vilarinho-capim-branco'),
('5310', 'Capim Branco / Terminal Vilarinho', 'Capim Branco', 'Terminal Vilarinho', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5310-capim-branco-terminal-vilarinho'),
('5400', 'Terminal Vilarinho / Betim (Centro)', 'Terminal Vilarinho', 'Betim', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5400-terminal-vilarinho-betim-centro'),
('5500', 'Terminal Vilarinho / Igarapé', 'Terminal Vilarinho', 'Igarapé', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5500-terminal-vilarinho-igarape'),
('5600', 'Terminal Vilarinho / Sete Lagoas', 'Terminal Vilarinho', 'Sete Lagoas', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5600-terminal-vilarinho-sete-lagoas'),
('5700', 'Terminal Vilarinho / Santa Luzia', 'Terminal Vilarinho', 'Santa Luzia', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5700-terminal-vilarinho-santa-luzia'),
('5800', 'Terminal Vilarinho / Sabará', 'Terminal Vilarinho', 'Sabará', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/5800-terminal-vilarinho-sabara'),
('6000', 'Terminal Vilarinho / Nova União', 'Terminal Vilarinho', 'Nova União', 'Metropolitano', 'convencional', 'active', 'https://movemetropolitano.com.br/6000-terminal-vilarinho-nova-uniao');

-- Inserir horários baseados nos dados reais do JSON
WITH line_data AS (
  SELECT id, line_number FROM public.bus_lines WHERE line_number IN ('4211', '5889', '402H', '510C', '4810')
)
INSERT INTO public.bus_schedules (line_id, departure_time, day_type, direction)
SELECT 
  ld.id,
  CASE ld.line_number
    -- Linha 4211: horários reais do JSON
    WHEN '4211' THEN unnest(ARRAY['05:00', '06:00', '06:30', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '17:30', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'])::time
    -- Linha 5889: horários reais do JSON  
    WHEN '5889' THEN unnest(ARRAY['07:15', '07:30', '08:20', '08:30', '15:00', '15:10'])::time
    -- Linha 402H: horários reais do JSON
    WHEN '402H' THEN unnest(ARRAY['05:50', '06:20', '06:30', '06:50', '07:10', '07:20', '07:50', '08:40', '09:40', '17:05', '17:35', '17:45', '18:05', '18:25', '18:35', '19:05'])::time
    -- Linha 510C: horários reais do JSON (amostra)
    WHEN '510C' THEN unnest(ARRAY['05:10', '05:25', '05:40', '05:55', '06:07', '06:10', '06:19', '06:25', '06:31', '06:40', '06:43', '06:55', '07:07', '07:19', '07:25', '07:42', '16:25', '16:40', '16:45', '16:55', '17:05', '17:10', '17:20', '17:25', '17:35', '17:40', '17:50', '17:55', '18:05', '18:10', '18:25', '18:40', '18:45', '18:55', '19:10'])::time
    -- Linha 4810: horários reais do JSON (amostra)
    WHEN '4810' THEN unnest(ARRAY['00:30', '04:00', '04:40', '04:55', '05:00', '05:05', '05:40', '05:50', '06:00', '06:20', '06:40', '06:45', '06:50', '07:30', '07:40', '07:50', '08:10', '08:20', '09:00', '09:40', '09:50', '10:00', '10:20', '10:40', '11:00', '11:10', '11:20', '11:40', '12:00', '12:20', '12:30', '12:40', '13:00', '13:20', '13:40', '14:00', '14:20', '14:40', '15:00', '15:30', '15:40', '15:45', '16:00', '16:20', '16:30', '16:40', '16:50', '17:00', '17:30', '17:40', '17:50', '18:20', '18:40', '18:50', '19:00', '19:20', '19:40', '19:50', '20:00', '20:20', '20:30', '21:10', '21:30', '22:00', '22:30', '23:00', '23:20'])::time
  END,
  'weekday',
  'outbound'
FROM line_data ld;

-- Criar posições em tempo real para TODAS as 50 linhas
INSERT INTO public.bus_positions (line_id, vehicle_id, latitude, longitude, heading, speed_kmh, occupancy_level, status, delay_minutes)
SELECT 
  bl.id,
  'BUS_' || bl.line_number || '_01',
  -19.9208 + (RANDOM() - 0.5) * 0.15, -- Região metropolitana de BH
  -43.9378 + (RANDOM() - 0.5) * 0.15,
  FLOOR(RANDOM() * 360)::integer,
  FLOOR(RANDOM() * 40 + 15)::integer, -- 15-55 km/h
  CASE FLOOR(RANDOM() * 4)::integer
    WHEN 0 THEN 'low'
    WHEN 1 THEN 'medium'
    WHEN 2 THEN 'high'
    ELSE 'full'
  END,
  CASE WHEN RANDOM() < 0.85 THEN 'in_service' ELSE 'out_of_service' END,
  CASE WHEN RANDOM() < 0.6 THEN 0 ELSE FLOOR(RANDOM() * 20)::integer END
FROM public.bus_lines bl
WHERE bl.status = 'active';

-- Adicionar mais ônibus para linhas principais (múltiplos veículos)
INSERT INTO public.bus_positions (line_id, vehicle_id, latitude, longitude, heading, speed_kmh, occupancy_level, status, delay_minutes)
SELECT 
  bl.id,
  'BUS_' || bl.line_number || '_02',
  -19.9208 + (RANDOM() - 0.5) * 0.15,
  -43.9378 + (RANDOM() - 0.5) * 0.15,
  FLOOR(RANDOM() * 360)::integer,
  FLOOR(RANDOM() * 40 + 15)::integer,
  CASE FLOOR(RANDOM() * 4)::integer
    WHEN 0 THEN 'low'
    WHEN 1 THEN 'medium'
    WHEN 2 THEN 'high'
    ELSE 'full'
  END,
  'in_service',
  CASE WHEN RANDOM() < 0.7 THEN 0 ELSE FLOOR(RANDOM() * 15)::integer END
FROM public.bus_lines bl
WHERE bl.line_number IN ('4211', '510C', '4810', '5100', '5291', '5400') -- Linhas principais
AND bl.status = 'active';

-- Inserir alertas diversos e realistas
INSERT INTO public.bus_alerts (line_id, alert_type, title, message, severity, is_active)
VALUES
-- Alertas de trânsito
((SELECT id FROM public.bus_lines WHERE line_number = '510C'), 'delay', 'Trânsito Intenso', 'Atraso de até 20 minutos devido ao trânsito na Av. Cristiano Machado.', 'warning', true),
((SELECT id FROM public.bus_lines WHERE line_number = '4810'), 'delay', 'Congestionamento', 'Possível atraso de 15 minutos no horário de pico da manhã.', 'warning', true),
-- Alertas de desvio
((SELECT id FROM public.bus_lines WHERE line_number = '4211'), 'route_change', 'Desvio Temporário', 'Rota alterada devido a obras na Rua Principal. Previsão: 5 dias.', 'info', true),
((SELECT id FROM public.bus_lines WHERE line_number = '5291'), 'route_change', 'Obras na Via', 'Desvio por obras do BRT. Consulte pontos alternativos.', 'info', true),
-- Alertas de manutenção
((SELECT id FROM public.bus_lines WHERE line_number = '5400'), 'maintenance', 'Manutenção Programada', 'Redução de frota entre 22h e 5h para manutenção preventiva.', 'info', true),
-- Alertas de emergência
((SELECT id FROM public.bus_lines WHERE line_number = '402H'), 'emergency', 'Acidente na Via', 'Trânsito bloqueado na BR-040. Atraso indefinido até liberação.', 'critical', true);

-- Verificar quantos registros foram inseridos
SELECT 
  (SELECT COUNT(*) FROM public.bus_lines) as total_lines,
  (SELECT COUNT(*) FROM public.bus_schedules) as total_schedules,
  (SELECT COUNT(*) FROM public.bus_positions) as total_positions,
  (SELECT COUNT(*) FROM public.bus_alerts) as total_alerts;