import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { RRuleForm } from "~/components/rrule-form";
import { RRuleOptionText } from "./rrule/rrule-json";
import { RRuleProvider } from "./rrule/use-rrule";
import { RRuleDataTable } from "./rrule/rrule-data-table";
import type { SearchParamSchema } from "./page";

export function RRuleLayout({ init }: { init?: SearchParamSchema }) {
  if (init && !init.dtstart) {
    // We have to pass a stable date from the server to the client
    // to avoid a hydration mismatch.
    init.dtstart = new Date();
  }

  return (
    <RRuleProvider init={init}>
      <div className="mt-10 grid grid-cols-3 gap-5">
        <Card className="">
          <CardHeader>
            <CardTitle>Create RRule</CardTitle>
            <CardDescription>Fiddle with the buttons.</CardDescription>
          </CardHeader>
          <CardContent>
            <RRuleForm />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Dates</CardTitle>
            <CardDescription>Use the form on the left to generate dates.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="border rounded-md px-3 py-2 bg-background text-sm col-span-3">
              <RRuleOptionText />
            </pre>
          </CardContent>
        </Card>
      </div>
      <div>
        <RRuleDataTable />
      </div>
    </RRuleProvider>
  );
}
