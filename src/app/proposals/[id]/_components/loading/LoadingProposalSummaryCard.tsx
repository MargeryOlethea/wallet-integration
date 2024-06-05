import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingProposalSummaryCard() {
  return (
    <>
      <Card className="my-5">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <Skeleton className="h-10 w-96" />

            <Skeleton className="h-8 w-20 rounded-full" />
          </CardTitle>
          <Skeleton className="h-5 w-20" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24" />
          <div>
            <Skeleton className="h-6 w-full my-1" />
            <Skeleton className="h-6 w-full my-1" />
            <Skeleton className="h-6 w-1/2 my-1" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default LoadingProposalSummaryCard;
