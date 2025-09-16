import { BusLine } from '@/types/bus';

export const busLines: BusLine[] = [
  {
    id: '1',
    name: 'Centro - Bairro São José',
    number: '101',
    color: '#2563eb',
    route: 'Centro → Rua Principal → Bairro São José',
    frequency: 'A cada 30 minutos',
    firstDeparture: '05:30',
    lastDeparture: '22:00',
    weekdaySchedule: [
      '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00',
      '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
      '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
      '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00',
      '21:30', '22:00'
    ],
    saturdaySchedule: [
      '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
      '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
      '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ],
    sundaySchedule: [
      '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ],
    stops: [
      { id: '1', name: 'Terminal Rodoviário', address: 'Rua Central, 100' },
      { id: '2', name: 'Praça da Matriz', address: 'Praça São José', landmark: 'Igreja Matriz' },
      { id: '3', name: 'Posto de Saúde', address: 'Rua da Saúde, 50' },
      { id: '4', name: 'Escola Municipal', address: 'Rua Educação, 200' },
      { id: '5', name: 'Bairro São José', address: 'Rua São José, 300' }
    ]
  },
  {
    id: '2',
    name: 'Centro - Vila Nova',
    number: '102',
    color: '#16a34a',
    route: 'Centro → Avenida Brasil → Vila Nova',
    frequency: 'A cada 45 minutos',
    firstDeparture: '06:00',
    lastDeparture: '21:30',
    weekdaySchedule: [
      '06:00', '06:45', '07:30', '08:15', '09:00', '09:45', '10:30', '11:15',
      '12:00', '12:45', '13:30', '14:15', '15:00', '15:45', '16:30', '17:15',
      '18:00', '18:45', '19:30', '20:15', '21:00', '21:30'
    ],
    saturdaySchedule: [
      '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
      '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ],
    sundaySchedule: [
      '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'
    ],
    stops: [
      { id: '1', name: 'Terminal Rodoviário', address: 'Rua Central, 100' },
      { id: '6', name: 'Mercado Municipal', address: 'Avenida Brasil, 80' },
      { id: '7', name: 'Banco do Brasil', address: 'Avenida Brasil, 150' },
      { id: '8', name: 'Farmácia Central', address: 'Avenida Brasil, 220' },
      { id: '9', name: 'Vila Nova', address: 'Rua Nova, 400' }
    ]
  },
  {
    id: '3',
    name: 'Centro - Industrial',
    number: '103',
    color: '#dc2626',
    route: 'Centro → Zona Industrial → Distrito',
    frequency: 'A cada 1 hora',
    firstDeparture: '05:00',
    lastDeparture: '20:00',
    weekdaySchedule: [
      '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
    ],
    saturdaySchedule: [
      '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'
    ],
    sundaySchedule: [
      '08:00', '12:00', '16:00', '20:00'
    ],
    stops: [
      { id: '1', name: 'Terminal Rodoviário', address: 'Rua Central, 100' },
      { id: '10', name: 'Prefeitura', address: 'Rua Municipal, 1' },
      { id: '11', name: 'Zona Industrial', address: 'Distrito Industrial' },
      { id: '12', name: 'Fábrica Textil', address: 'Rua Industrial, 500' },
      { id: '13', name: 'Distrito', address: 'Estrada do Distrito, s/n' }
    ]
  }
];