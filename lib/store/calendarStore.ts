import { create } from 'zustand';
import { CalendarEvent } from '../types/calendar';
import dayjs from 'dayjs';

interface CalendarState {
  events: CalendarEvent[];
  selectedDate: Date;
  viewMode: 'day' | 'week' | 'month';
  actions: {
    addEvent: (event: CalendarEvent) => void;
    updateEvent: (event: CalendarEvent) => void;
    deleteEvent: (eventId: string) => void;
    setSelectedDate: (date: Date) => void;
    setViewMode: (mode: 'day' | 'week' | 'month') => void;
  };
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  selectedDate: new Date(),
  viewMode: 'month',
  actions: {
    addEvent: (event) =>
      set((state) => ({
        events: [...state.events, event],
      })),
    updateEvent: (updatedEvent) =>
      set((state) => ({
        events: state.events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        ),
      })),
    deleteEvent: (eventId) =>
      set((state) => ({
        events: state.events.filter((event) => event.id !== eventId),
      })),
    setSelectedDate: (date) =>
      set(() => ({
        selectedDate: date,
      })),
    setViewMode: (mode) =>
      set(() => ({
        viewMode: mode,
      })),
  },
}));