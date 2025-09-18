export interface BusLine {
  id: string;
  name: string;
  number: string;
  color: string;
  route: string;
  frequency: string;
  firstDeparture: string;
  lastDeparture: string;
  weekdaySchedule: string[];
  saturdaySchedule: string[];
  sundaySchedule: string[];
  stops: BusStop[];
  category?: string;
}

export interface BusStop {
  id: string;
  name: string;
  address: string;
  landmark?: string;
}

export type ScheduleType = 'weekday' | 'saturday' | 'sunday';