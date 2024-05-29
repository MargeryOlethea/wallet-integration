import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RewardBalanceCard() {
  return (
    <>
      <Card className="bg-gradient-to-r from-blue-100 flex items-center justify-even col-span-3 pr-6">
        <CardHeader>
          <CardDescription>Balance</CardDescription>
          <CardTitle className="flex items-center gap-2">
            50.20290 <Badge>OSMO</Badge>
          </CardTitle>
        </CardHeader>

        <Button className="bg-blue-500">Claim Rewards</Button>
      </Card>
    </>
  );
}

export default RewardBalanceCard;
