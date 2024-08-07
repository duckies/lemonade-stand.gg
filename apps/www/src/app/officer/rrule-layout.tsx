"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { useForm, useWatch } from "react-hook-form";
// import { RRule } from "rrule-rust";
import { z } from "zod";
import { RRuleForm } from "~/components/rrule-form";
import { createRRule } from "~/server/rrule";
import { columns, RRuleDataTable } from "./rrule-data-table";

export const FormSchema = z.object({
  dtstart: z.date(),
  frequency: z.enum(["3", "2", "1", "0"]),
  count: z.number().min(1).optional(),
  tzid: z.string().optional(),
  byweekday: z.array(z.string()),
});

export function RRuleLayout() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dtstart: undefined,
      count: undefined,
      frequency: "3",
      tzid: "",
      byweekday: [],
    },
  });

  const data = useWatch({
    control: form.control,
  });

  const values = Object.entries(data).reduce(
    (res, [key, value]) => {
      if (value === "" || (Array.isArray(value) && value.length === 0)) {
        return res;
      }
      res[key] = value;

      return res;
    },
    {} as z.infer<typeof FormSchema>,
  );
  // form.getValues()
  const rrule = createRRule(values);

  return (
    <div className="mt-10 flex gap-5">
      <Card className="">
        <CardHeader>
          <CardTitle>Create RRule</CardTitle>
          <CardDescription>Fiddle with the buttons.</CardDescription>
        </CardHeader>
        <CardContent>
          <RRuleForm form={form} />
        </CardContent>
      </Card>
      <Card className="grow">
        <CardHeader>
          <CardTitle>Dates</CardTitle>
          <CardDescription>Use the form on the left to generate dates.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="grid grid-cols-[minmax(3rem,auto)_1fr] items-center gap-4">
              <span className="text-sm font-medium leading-none text-right">Data</span>
              <pre className="border rounded-md px-3 py-2 bg-muted text-sm">
                {JSON.stringify(values, null, 2)}
              </pre>
              <span className="text-sm font-medium leading-none text-right">RRule</span>
              <pre className="border rounded-md px-3 py-2 bg-muted text-sm">{rrule.toString()}</pre>
            </div>
            <RRuleDataTable
              columns={columns}
              data={rrule.all((_date, i) => i < 10).map((date) => ({ date: date.toISOString() }))}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
