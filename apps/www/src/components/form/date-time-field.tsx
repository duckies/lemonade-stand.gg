"use client";

import { type FieldMetadata, useInputControl } from "@conform-to/react";
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
import { CalendarIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

export interface DateTimeFieldProps {
  field: FieldMetadata<Date>;
}

export function DateTimeField({ field }: DateTimeFieldProps) {
  const [period, setPeriod] = useState<Period>();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const control = useInputControl(field);

  const date = useMemo(
    () => (control.value ? new Date(control.value) : undefined),
    [control.value],
  );

  const setDate = useCallback(
    (date?: Date) => {
      control.change(date?.toString());
    },
    [control.change],
  );

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
    <div>
      <input
        className="sr-only"
        aria-hidden
        tabIndex={-1}
        name={field.name}
        defaultValue={field.initialValue ? new Date(field.initialValue).toISOString() : ""}
        onFocus={() => {
          triggerRef.current?.focus();
        }}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-10 justify-start text-left font-normal",
              !control.value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP hh:mm a") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={(date) => handleSelect(date)} />
          <div className="flex justify-center gap-2 px-3 pb-3">
            <div className="grid gap-1 text-center">
              <Label htmlFor="hours" className="text-xs">
                Hours
              </Label>
              <TimePicker picker="12hours" date={date} setDate={setDate} period={period} />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="minutes" className="text-xs">
                Minutes
              </Label>
              <TimePicker picker="minutes" date={date} setDate={setDate} />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="period" className="text-xs">
                Period
              </Label>
              <TimePeriod period={period} setPeriod={setPeriod} date={date} setDate={setDate} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
