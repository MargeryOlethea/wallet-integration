import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { UserDelegationData } from "../ManageModal";

interface YourDelegationCardProps {
  userDelegationData: UserDelegationData;
  denom: string | null;
}

function YourDelegationCard({
  userDelegationData,
  denom,
}: YourDelegationCardProps) {
  return (
    <>
      <Card className="my-2">
        <CardHeader>
          <p className="text-xs">Your Delegation:</p>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-lg">
              {microCoinConverter(
                +userDelegationData?.delegation?.balance?.amount || 0,
                denom!,
              )}
            </p>{" "}
            <Badge className="mt-1" variant="secondary">
              {denom}
            </Badge>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

export default YourDelegationCard;
