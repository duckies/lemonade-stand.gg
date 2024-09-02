import {
  Button,
  Calendar,
  Label,
  type Period,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TimePeriod,
  TimePicker,
  cn,
} from "@lemonade-stand/ui";
import { add, format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";

interface DateTimePickerProps {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [period, setPeriod] = useState<Period>("PM");

  const handleSelect = (newDate?: Date) => {
    if (!newDate) return;
    if (!date) {
      setDate(newDate);
      return;
    }

    const diff = newDate.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP h:mm a") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={(d) => handleSelect(d)} />
        <div className="p-3 border-t border-border">
          <div className="flex items-end gap-2">
            <div className="grid gap-1 text-center">
              <Label htmlFor="hours" className="text-xs">
                Hours
              </Label>
              <TimePicker
                id="hours"
                picker="12hours"
                date={date}
                setDate={setDate}
                period={period}
              />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="minutes" className="text-xs">
                Minutes
              </Label>
              <TimePicker id="minutes" picker="minutes" date={date} setDate={setDate} />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="period" className="text-xs">
                Period
              </Label>
              <TimePeriod
                id="period"
                period={period}
                setPeriod={setPeriod}
                date={date}
                setDate={setDate}
              />
            </div>
            <div className="flex h-10 items-center">
              <Clock className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
