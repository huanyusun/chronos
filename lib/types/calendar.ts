export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: string;
  isLunar?: boolean;
  reminder?: ReminderSettings;
  recurrence?: RecurrenceRule;
  category?: string;
}

export interface ReminderSettings {
  enabled: boolean;
  time: number; // minutes before event
  type: 'notification' | 'email';
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  occurrences?: number;
}

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  leap?: boolean;
}

export interface FortuneCalendarDay {
  date: Date;
  lunarDate: LunarDate;
  suitable: string[];
  unsuitable: string[];
  direction: string;
  godOfWealth: string;
}