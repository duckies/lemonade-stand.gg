import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { RRuleForm } from "~/components/rrule-form";
import { RRuleDataTable } from "./rrule/rrule-data-table";
import { RRuleProvider } from "./rrule/use-rrule";
import { RRuleOptionText } from "./rrule/rrule-json";

export function RRuleLayout() {
  return (
    <RRuleProvider>
      <div className="mt-10 flex gap-5">
        <Card className="">
          <CardHeader>
            <CardTitle>Create RRule</CardTitle>
            <CardDescription>Fiddle with the buttons.</CardDescription>
          </CardHeader>
          <CardContent>
            <RRuleForm />
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
                  <RRuleOptionText />
                </pre>
                <span className="text-sm font-medium leading-none text-right">RRule</span>
                {/* <pre className="border rounded-md px-3 py-2 bg-muted text-sm">{rrule.toString()}</pre> */}
              </div>
              <RRuleDataTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </RRuleProvider>
  );
}
