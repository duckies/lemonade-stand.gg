"use client";

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
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
} from "@repo/ui";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { FormSchema } from "~/app/officer/rrule-layout";

interface RRuleFormProps {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const WeekdayOptions = [
  { label: "Monday", value: 0 },
  { label: "Tuesday", value: 1 },
  { label: "Wednesday", value: 2 },
  { label: "Thursday", value: 3 },
  { label: "Friday", value: 4 },
  { label: "Saturday", value: 5 },
  { label: "Sunday", value: 6 },
];

export function RRuleForm({ form }: RRuleFormProps) {
  return (
    <Form {...form}>
      <form className="grid gap-2">
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Frequency</FormLabel>
              <div className="col-span-3">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">Daily</SelectItem>
                    <SelectItem value="2">Weekly</SelectItem>
                    <SelectItem value="1">Monthly</SelectItem>
                    <SelectItem value="0">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dtstart"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Start</FormLabel>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal flex",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      autoFocus
                      startMonth={new Date(1999, 11)}
                      endMonth={new Date(2025, 2)}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Count</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    }
                    min="1"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tzid"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Timezone</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="byweekday"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">By Weekday</FormLabel>
              <div className="col-span-3">
                <FormControl>
                  <SelectMultiple {...field} defaultOptions={WeekdayOptions} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
