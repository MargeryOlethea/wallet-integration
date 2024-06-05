import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { microCoinToCoin } from "@/helpers/integerModifiers";

interface AvailableBalanceCardProps {
  availableAmount: number | string | undefined;
  availableLoading: boolean;
  denom: string | null;
}
function AvailableBalanceCard({
  availableAmount,
  availableLoading,
  denom,
}: AvailableBalanceCardProps) {
  return (
    <>
      <Card className="my-2">
        {" "}
        <CardHeader className="flex flex-row justify-between">
          <p className="text-sm">
            Available Balances:{" "}
            {availableLoading ? (
              <Skeleton className="h-3 w-1/4" />
            ) : (
              <span className="font-semibold text-lg">
                {microCoinToCoin(+availableAmount!, denom!)}
              </span>
            )}
          </p>

          <Badge variant="secondary">{denom}</Badge>
        </CardHeader>
      </Card>
    </>
  );
}

export default AvailableBalanceCard;
