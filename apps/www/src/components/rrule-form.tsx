"use client";

import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectMultiple,
  SelectTrigger,
  SelectValue,
  cn,
} from "@lemonade-stand/ui";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { WeekdayOptions, useRRule } from "~/app/officer/rrule/use-rrule";

export function RRuleForm() {
  const { options, form } = useRRule();

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="frequency" className="text-right">
          Frequency
        </Label>
        <div className="col-span-3">
          <Select name="frequency" {...form.frequency}>
            <SelectTrigger>
              <SelectValue placeholder="Frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Daily</SelectItem>
              <SelectItem value="2">Weekly</SelectItem>
              <SelectItem value="1">Monthly</SelectItem>
              <SelectItem value="0">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="form-dtstart" className="text-right">
          Start
        </Label>
        <div className="col-span-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full h-10 justify-start text-left font-normal flex",
                  !options.dtstart && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {options.dtstart ? format(options.dtstart, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                id="form-dtstart"
                mode="single"
                autoFocus
                startMonth={new Date(1999, 11)}
                endMonth={new Date(2025, 2)}
                required={false}
                {...form.dtstart}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="form-count" className="text-right">
          Count
        </Label>
        <div className="col-span-3">
          <Input id="form-count" type="number" min="1" {...form.count} />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="form-byweekday" className="text-right">
          Weekdays
        </Label>
        <div className="col-span-3">
          <SelectMultiple defaultOptions={WeekdayOptions} {...form.byweekday} />
        </div>
      </div>
    </div>
  );
}
