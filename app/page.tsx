import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventDialog } from "@/components/calendar/EventDialog";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex justify-between items-center p-4">
        <CalendarHeader />
        <EventDialog />
      </div>
      <div className="container mx-auto py-8">
        <CalendarGrid />
      </div>
    </main>
  );
}