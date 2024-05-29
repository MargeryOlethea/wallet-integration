import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RewardBalanceCard({
  amount,
  denom,
}: {
  amount: number | undefined;
  denom: string | undefined;
}) {
  return (
    <>
      <Card className="bg-gradient-to-r from-blue-100 flex items-center justify-even col-span-3 pr-6">
        <CardHeader>
          <CardDescription>Rewarded Balance</CardDescription>
          <CardTitle className="flex items-center gap-2">
            0 <Badge>denom</Badge>
          </CardTitle>
        </CardHeader>

        <Button className="bg-blue-500">Claim Rewards</Button>
      </Card>
    </>
  );
}

export default RewardBalanceCard;
