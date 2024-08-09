"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { type ByWeekday, Frequency, RRule, Weekday, type WeekdayStr } from "rrule";

export type WeekdayOption = { label: string; value: WeekdayStr };
export const WeekdayOptions: WeekdayOption[] = [
  { label: "Monday", value: "MO" },
  { label: "Tuesday", value: "TU" },
  { label: "Wednesday", value: "WE" },
  { label: "Thursday", value: "TH" },
  { label: "Friday", value: "FR" },
  { label: "Saturday", value: "SA" },
  { label: "Sunday", value: "SU" },
] as const;

export interface RRuleState {
  options: {
    freq: Frequency;
    dtstart?: Date;
    count?: number;
    byweekday?: ByWeekday[];
  };
  form: {
    frequency: {
      value: string;
      onValueChange: (value: string) => void;
    };
    dtstart: {
      selected: Date | undefined;
      onSelect: (date: Date | undefined) => void;
    };
    count: {
      value: string;
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    };
    byweekday: {
      value: WeekdayOption[];
      onChange: (options: WeekdayOption[]) => void;
    };
  };
}

export const RRuleContext = createContext<RRuleState | null>(null);

export function toNumber(value: string) {
  if (value === "") {
    return undefined;
  }

  const num = Number(value);

  return Number.isNaN(num) ? undefined : num;
}

export function RRuleProvider({ children }: { children: React.ReactNode }) {
  const [frequency, setFrequency] = useState<Frequency>(Frequency.WEEKLY);
  const [dtstart, setDTStart] = useState<Date>();
  const [count, setCount] = useState<number>();
  const [byweekday, setByWeekday] = useState<ByWeekday[]>([]);

  const value = useMemo<RRuleState>(
    () => ({
      options: {
        freq: frequency,
        dtstart,
        count,
        byweekday: byweekday.length === 0 ? undefined : byweekday,
      },
      form: {
        frequency: {
          value: frequency.toString(),
          onValueChange: (value) => setFrequency(Number(value)),
        },
        dtstart: {
          selected: dtstart,
          onSelect: (date) => setDTStart(date),
        },
        count: {
          value: count?.toString() ?? "",
          onChange: (e) => setCount(toNumber(e.target.value)),
        },
        byweekday: {
          value: byweekday.map<WeekdayOption>((w) => {
            if (typeof w === "string") {
              return WeekdayOptions.find((o) => o.value === w)!;
            }

            const i = w instanceof Weekday ? w.weekday : w;

            return WeekdayOptions[i]!;
          }),
          onChange: (options) => setByWeekday(options.map((o) => o.value)),
        },
      },
    }),
    [frequency, dtstart, count, byweekday],
  );

  return <RRuleContext.Provider value={value}>{children}</RRuleContext.Provider>;
}

export function useRRule() {
  const ctx = useContext(RRuleContext);

  if (!ctx) {
    throw new Error("useRRule must be used within a RRuleProvider");
  }

  return ctx;
}
