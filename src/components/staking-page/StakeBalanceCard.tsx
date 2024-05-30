import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function StakeBalanceCard({
  amount,
  denom,
}: {
  amount: number | string | undefined;
  denom: string | undefined;
}) {
  return (
    <>
      <Card className="col-span-2">
        <CardHeader>
          <CardDescription>Staked Balance</CardDescription>
          <CardTitle className="flex items-center gap-2">
            {amount} <Badge variant="secondary">{denom}</Badge>
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
}

export default StakeBalanceCard;
