"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCalendarStore } from "@/lib/store/calendarStore";
import { CalendarEvent } from "@/lib/types/calendar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const eventSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  description: z.string().optional(),
  start: z.string(),
  end: z.string(),
  color: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export function EventDialog() {
  const [open, setOpen] = useState(false);
  const { actions } = useCalendarStore();

  const { register, handleSubmit, reset } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: EventFormData) => {
    const event: CalendarEvent = {
      id: crypto.randomUUID(),
      ...data,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    actions.addEvent(event);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>添加事件</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加新事件</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">标题</Label>
            <Input id="title" {...register("title")} />
          </div>
          <div>
            <Label htmlFor="description">描述</Label>
            <Input id="description" {...register("description")} />
          </div>
          <div>
            <Label htmlFor="start">开始时间</Label>
            <Input id="start" type="datetime-local" {...register("start")} />
          </div>
          <div>
            <Label htmlFor="end">结束时间</Label>
            <Input id="end" type="datetime-local" {...register("end")} />
          </div>
          <div>
            <Label htmlFor="color">颜色</Label>
            <Input id="color" type="color" {...register("color")} />
          </div>
          <Button type="submit">创建事件</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}