import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function LoadingProposalSummaryCard() {
  return (
    <>
      <Card className="my-5">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <Skeleton className="h-10 w-96" />

            <Skeleton className="h-8 w-20 rounded-full" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-5 w-20" />
          </CardDescription>
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