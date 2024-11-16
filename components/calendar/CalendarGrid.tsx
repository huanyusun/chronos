"use client";

import { useCalendarStore } from "@/lib/store/calendarStore";
import { DateCell } from "./DateCell";
import { useMemo } from "react";
import dayjs from "dayjs";

export function CalendarGrid() {
  const { viewMode, selectedDate, events } = useCalendarStore();

  const days = useMemo(() => {
    const firstDay = dayjs(selectedDate).startOf('month');
    const lastDay = dayjs(selectedDate).endOf('month');
    const startDate = firstDay.startOf('week');
    const endDate = lastDay.endOf('week');
    
    const daysArray = [];
    let currentDate = startDate;

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      daysArray.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }

    return daysArray;
  }, [selectedDate]);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px bg-muted">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            星期{day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-muted">
        {days.map((day) => (
          <DateCell
            key={day.format()}
            date={day.toDate()}
            events={events.filter((event) =>
              dayjs(event.start).isSame(day, 'day')
            )}
            isCurrentMonth={day.isSame(selectedDate, 'month')}
          />
        ))}
      </div>
    </div>
  );
}