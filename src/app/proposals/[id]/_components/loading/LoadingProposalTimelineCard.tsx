import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingProposalTimelineCard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* submit time */}
            <div>
              <p className="text-md font-medium text-slate-500">Submit Time</p>
              <Skeleton className="h-6 w-64" />
            </div>

            {/* voting start time */}
            <div>
              <p className="text-md font-medium text-slate-500">
                Voting Start Time
              </p>

              <Skeleton className="h-6 w-64" />
            </div>

            {/* deposit end time */}
            <div>
              <p className="text-md font-medium text-slate-500">
                Deposit End Time
              </p>

              <Skeleton className="h-6 w-64" />
            </div>

            {/* voting end time */}
            <div>
              <p className="text-md font-medium text-slate-500">
                Voting End Time
              </p>
              <Skeleton className="h-6 w-64" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default LoadingProposalTimelineCard;
