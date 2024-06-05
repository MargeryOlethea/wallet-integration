import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { microCoinToCoin } from "@/helpers/integerModifiers";
import { UserDelegationData } from "../RedelegateModal";

interface RedelegateFromCardProps {
  userDelegationData: UserDelegationData;
  denom: string;
}

function RedelegateFromCard({
  userDelegationData,
  denom,
}: RedelegateFromCardProps) {
  return (
    <>
      <Card className="my-2 w-1/2">
        <CardHeader>
          <CardDescription className="text-xs">
            Redelegate from:
          </CardDescription>
          <CardTitle className="text-lg">
            {userDelegationData.validator.description.moniker}
          </CardTitle>
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm">
              Staked Balances:{" "}
              <span className="font-semibold text-lg">
                {microCoinToCoin(
                  +userDelegationData.delegation.balance.amount,
                  denom!,
                )}
              </span>
            </p>

            <Badge variant="secondary">{denom}</Badge>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}

export default RedelegateFromCard;
