"use client";

import { format } from "date-fns";
import * as React from "react";

import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@repo/ui";
import { cn } from "@repo/ui";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  onSelect?: (date?: Date) => void;
}

export function DatePicker({ onSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  function handleSelect(date?: Date) {
    setDate(date);
    onSelect?.(date);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          autoFocus
          startMonth={new Date(1999, 11)}
          endMonth={new Date(2025, 2)}
          required={false}
        />
      </PopoverContent>
    </Popover>
  );
}
