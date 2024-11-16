"use client";

import { CalendarEvent } from "@/lib/types/calendar";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface EventCardProps {
  event: CalendarEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div
      className={cn(
        "px-2 py-1 text-xs rounded-md cursor-pointer",
        "bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      )}
      style={{ backgroundColor: event.color ? `${event.color}20` : undefined }}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-muted-foreground">
        {dayjs(event.start).format("HH:mm")}
      </div>
    </div>
  );
}