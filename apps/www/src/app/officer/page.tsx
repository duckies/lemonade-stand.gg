import { RRuleLayout } from "./rrule-layout";

export default async function OfficerHomePage() {
  return (
    <div className="container">
      <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Officer Panel</h2>
            <p className="text-muted-foreground">Here&apos;s the deets on the lemoney peeps.</p>
          </div>
        </div>
        <RRuleLayout />
      </div>
    </div>
  );
}
