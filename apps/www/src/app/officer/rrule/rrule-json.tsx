"use client";

import { useRRule } from "./use-rrule";

export function RRuleOptionText() {
  const { options } = useRRule();

  return JSON.stringify(options, null, 2);
}
