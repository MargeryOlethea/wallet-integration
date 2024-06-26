import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface AccountBalanceCardProps {
  amount: number | string | undefined;
  denom: string | undefined;
  loading: boolean;
}

function AccountBalanceCard({
  amount,
  denom,
  loading,
}: AccountBalanceCardProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription className="max-md:text-xs">
            Total Balance
          </CardDescription>
          {loading ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />{" "}
              <Skeleton className="rounded-full h-5 w-14" />
            </div>
          ) : (
            <CardTitle className="flex items-center gap-2 max-md:text-[20px]">
              {amount}{" "}
              <Badge variant="secondary" className="max-md:text-[10px]">
                {denom}
              </Badge>
            </CardTitle>
          )}
        </CardHeader>
      </Card>
    </>
  );
}

export default AccountBalanceCard;
