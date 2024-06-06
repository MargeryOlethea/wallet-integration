import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface RewardBalanceCardProps {
  amount: number | string | undefined;
  denom: string | undefined;
  loading: boolean;
}

function RewardBalanceCard({ amount, denom, loading }: RewardBalanceCardProps) {
  return (
    <>
      <Card className="bg-gradient-to-r from-blue-100 flex items-center justify-even pr-6">
        <CardHeader>
          <CardDescription className="max-md:text-xs">
            Rewarded Balance
          </CardDescription>
          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="bg-slate-200 h-8 w-20" />{" "}
              <Skeleton className="bg-slate-200 rounded-full h-5 w-14" />
            </div>
          ) : (
            <CardTitle className="flex items-center gap-2 max-md:text-[20px]">
              {amount}{" "}
              <Badge className="bg-blue-500 max-md:text-[10px]">{denom}</Badge>
            </CardTitle>
          )}
        </CardHeader>
      </Card>
    </>
  );
}

export default RewardBalanceCard;
