import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { useCosmjs } from "@/hooks/useCosmjs";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserDelegationData } from "../ManageModal";

interface RewardsCardProps {
  userDelegationData: UserDelegationData;
  denom: string | null;
}

function RewardsCard({ userDelegationData, denom }: RewardsCardProps) {
  // handle claim rewards
  const { withdrawStakedReward } = useCosmjs();
  const withdrawMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        withdrawStakedReward(userDelegationData.validator.operator_address),
      onSuccess: (data) => {
        toast.success(`Rewards claimed successfully!`);
        window.location.reload();
      },
      onError: (error) => {
        toast.error(`Failed to claim rewards: ${error.message}`);
        console.error(error.message);
      },
    });

  return (
    <>
      <Card className="my-2 bg-gradient-to-r from-blue-100">
        <CardHeader className="flex-row justify-between">
          <div>
            <p className="text-xs">Your Rewards:</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-lg">
                {microCoinConverter(
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
              +userDelegationData.reward.amount <= 100
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
