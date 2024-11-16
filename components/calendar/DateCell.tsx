"use client";

import { CalendarEvent } from "@/lib/types/calendar";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { EventCard } from "./EventCard";
import { useCalendarStore } from "@/lib/store/calendarStore";

interface DateCellProps {
  date: Date;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
}

export function DateCell({ date, events, isCurrentMonth }: DateCellProps) {
  const { selectedDate, actions } = useCalendarStore();
  const isToday = dayjs(date).isSame(dayjs(), 'day');
  const isSelected = dayjs(date).isSame(selectedDate, 'day');

  return (
    <div
      className={cn(
        "min-h-[120px] p-2 border border-border",
        !isCurrentMonth && "bg-muted/50",
        isSelected && "bg-primary/5"
      )}
      onClick={() => actions.setSelectedDate(date)}
    >
      <div className="flex justify-between items-start">
        <span
          className={cn(
            "text-sm font-medium",
            isToday && "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center",
            !isCurrentMonth && "text-muted-foreground"
          )}
        >
          {dayjs(date).format("D")}
        </span>
        {isToday && !isSelected && (
          <div className="w-2 h-2 rounded-full bg-primary" />
        )}
      </div>
      <div className="mt-2 space-y-1">
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {events.length > 3 && (
          <div className="text-xs text-muted-foreground">
            +{events.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
}