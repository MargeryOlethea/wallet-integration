import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function AvailableBalanceCard() {
  return (
    <>
      <Card className="col-span-2">
        <CardHeader>
          <CardDescription>Available Balance</CardDescription>
          <CardTitle className="flex items-center gap-2">
            50.20290 <Badge variant="secondary">OSMO</Badge>
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
}

export default AvailableBalanceCard;
