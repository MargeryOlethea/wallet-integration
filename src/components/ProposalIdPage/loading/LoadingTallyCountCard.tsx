import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

function LoadingTallyCountCard() {
  return (
    <>
      <Card className="my-5">
        <CardHeader>
          <CardTitle>Tally</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-8">
            {/* yes */}
            <Skeleton className="h-24 w-full" />

            {/* no */}
            <Skeleton className="h-24 w-full" />

            {/* abstain */}
            <Skeleton className="h-24 w-full" />

            {/* no with veto */}
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Percentage */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 my-5">
            {/* yes */}
            <div>
              <p className="text-md font-medium text-slate-500">Yes</p>
              <Skeleton className="h-6 w-full rounded-full" />
            </div>

            {/* no */}
            <div>
              <p className="text-md font-medium text-slate-500">No</p>
              <Skeleton className="h-6 w-full rounded-full" />
            </div>

            {/* abstain */}
            <div>
              <p className="text-md font-medium text-slate-500">Abstain</p>
              <Skeleton className="h-6 w-full rounded-full" />
            </div>

            {/* veto */}
            <div>
              <p className="text-md font-medium text-slate-500">No with Veto</p>
              <Skeleton className="h-6 w-full rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default LoadingTallyCountCard;
