import { Card, CardContent, CardTitle } from "@lemonade-stand/ui";
import { z } from "zod";
import { RRuleLayout } from "./rrule-layout";

const searchParamSchema = z.object({
  freq: z.coerce.number().min(0).max(4).optional(),
  dtstart: z.coerce.date().optional(),
  count: z.coerce.number().min(1).optional(),
  byweekday: z
    .preprocess((val) => {
      if (Array.isArray(val)) {
        return val;
      }

      if (typeof val === "string" && val.length > 2) {
        return val.match(/.{1,2}/g);
      }

      return [val];
    }, z.enum(["MO", "TU", "WE", "TH", "FR", "SA", "SU"]).array())
    .optional(),
});

export type SearchParamSchema = z.infer<typeof searchParamSchema>;

interface OfficerHomePageProps {
  searchParams: z.infer<typeof searchParamSchema>;
}

export default async function OfficerHomePage({ searchParams }: OfficerHomePageProps) {
  const params = searchParamSchema.safeParse(searchParams);

  return (
    <div className="container">
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Officer Panel</h2>
            <p className="text-muted-foreground">Here&apos;s the deets on the lemoney peeps.</p>
          </div>
        </div>
        {params.error && (
          <Card>
            <CardTitle>Error</CardTitle>
            <CardContent>{JSON.stringify(params.error, null, 2)}</CardContent>
          </Card>
        )}
        <RRuleLayout init={params.data} />
      </div>
    </div>
  );
}
