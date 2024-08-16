"use client";

import { type ReactNode, createContext, useContext } from "react";
import { type ByWeekday, type Frequency, RRule, Weekday, type WeekdayStr } from "rrule";
import { useQueryString } from "~/hooks/use-query";

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
  rrule: RRule;
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

export interface RRuleProviderProps {
  children: ReactNode;
  init?: Partial<RRuleState["options"]>;
}

export function RRuleProvider({ children, init }: RRuleProviderProps) {
  const query = useQueryString();

  const options = {
    freq: init?.freq === undefined ? 2 : init.freq,
    dtstart: init?.dtstart,
    count: init?.count,
    byweekday: !init?.byweekday?.length ? undefined : init.byweekday,
  };

  const value = {
    options,
    rrule: new RRule(options, true),
    form: {
      frequency: {
        value: options.freq.toString(),
        onValueChange: (value) => query.set("freq", value),
      },
      dtstart: {
        selected: options.dtstart,
        onSelect: (date) => query.set("dtstart", date?.toISOString()),
      },
      count: {
        value: options.count?.toString() ?? "",
        onChange: (e) => query.set("count", e.target.value),
      },
      byweekday: {
        value: options.byweekday
          ? options.byweekday.map<WeekdayOption>((w) => {
              if (typeof w === "string") {
                return WeekdayOptions.find((o) => o.value === w)!;
              }

              const i = w instanceof Weekday ? w.weekday : w;

              return WeekdayOptions[i]!;
            })
          : [],
        onChange: (options) =>
          query.set(
            "byweekday",
            options.map((o) => o.value),
          ),
      },
    },
  } satisfies RRuleState;

  return <RRuleContext.Provider value={value}>{children}</RRuleContext.Provider>;
}

export function useRRule() {
  const ctx = useContext(RRuleContext);

  if (!ctx) {
    throw new Error("useRRule must be used within a RRuleProvider");
  }

  return ctx;
}
