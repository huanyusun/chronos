"use client";

import { Button } from "@/components/ui/button";
import { useCalendarStore } from "@/lib/store/calendarStore";
import dayjs from "dayjs";

export function CalendarHeader() {
  const { selectedDate, viewMode, actions } = useCalendarStore();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = dayjs(selectedDate)[direction === 'prev' ? 'subtract' : 'add'](1, 'month').toDate();
    actions.setSelectedDate(newDate);
  };

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-bold">
        {dayjs(selectedDate).format('YYYY年 M月')}
      </h2>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('prev')}
        >
          上个月
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => actions.setSelectedDate(new Date())}
        >
          今天
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateMonth('next')}
        >
          下个月
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'month' ? 'default' : 'outline'}
          size="sm"
          onClick={() => actions.setViewMode('month')}
        >
          月视图
        </Button>
        <Button
          variant={viewMode === 'week' ? 'default' : 'outline'}
          size="sm"
          onClick={() => actions.setViewMode('week')}
        >
          周视图
        </Button>
        <Button
          variant={viewMode === 'day' ? 'default' : 'outline'}
          size="sm"
          onClick={() => actions.setViewMode('day')}
        >
          日视图
        </Button>
      </div>
    </div>
  );
}