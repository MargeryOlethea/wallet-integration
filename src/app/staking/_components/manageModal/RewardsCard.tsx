import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { microCoinToCoin } from "@/helpers/integerModifiers";
import { UserDelegationData } from "../ManageModal";
import { useClaimRewards } from "@/hooks/useReactMutation";

interface RewardsCardProps {
  userDelegationData: UserDelegationData;
  denom: string | null;
}

function RewardsCard({ userDelegationData, denom }: RewardsCardProps) {
  // handle claim rewards
  const withdrawMutation = useClaimRewards(
    userDelegationData.validator.operator_address,
  );

  return (
    <>
      <Card className="my-2 bg-gradient-to-r from-blue-100">
        <CardHeader className="flex-row justify-between max-sm:flex-col max-sm:gap-3">
          <div>
            <p className="text-xs">Your Rewards:</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg">
                {microCoinToCoin(
                  +userDelegationData?.reward?.amount || 0,
                  denom!,
                )}
              </p>{" "}
              <Badge className="mt-2 bg-blue-400">{denom}</Badge>
            </div>
          </div>
          <Button
            onClick={() => withdrawMutation.mutate()}
            className="bg-blue-500 hover:bg-blue-600"
            disabled={
              withdrawMutation.isPending ||
              !userDelegationData?.reward?.amount ||
              +userDelegationData.reward.amount < 10
            }
          >
            {withdrawMutation.isPending ? "Processing..." : "Claim Rewards"}
          </Button>
        </CardHeader>
      </Card>
    </>
  );
}

export default RewardsCard;
