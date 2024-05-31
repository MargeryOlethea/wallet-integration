import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ValidatorItem } from "@/types/validator.types";
import { IoClose } from "react-icons/io5";

import { Badge } from "../ui/badge";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { DelegationResponse } from "@/types/delegations.types";
import { Button } from "../ui/button";
import { Reward } from "@/types/reward.types";
import { useCosmjs } from "@/hooks/useCosmjs";

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useRouter } from "next/router";
import { useState } from "react";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDelegationData: UserDelegationData;
}

export interface UserDelegationData {
  delegation: DelegationResponse;
  validator: ValidatorItem;
  reward: Reward;
}

export default function ManageModal({
  isOpen,
  onClose,
  userDelegationData,
}: MyModalProps) {
  // modal handling
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

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

  const [showUndelegate, setShowUndelegate] = useState(false);

  if (!isOpen) return null;
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-1/3 p-5 flex flex-col justify-between">
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <IoClose size="25" />
        </button>
        <CardHeader>
          <CardTitle>
            {userDelegationData?.validator?.description?.moniker}
          </CardTitle>
          <CardDescription>
            Commission:{" "}
            {Math.floor(
              +userDelegationData?.validator?.commission?.commission_rates
                ?.rate * 100,
            )}
            %
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* delegation */}
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

          {/* rewards */}
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
                {withdrawMutation.isPending
                  ? "Claiming Rewards..."
                  : "Claim Rewards"}
              </Button>
            </CardHeader>
          </Card>

          {/* undelegate amount */}
          {showUndelegate && (
            <Card className="my-2">
              <CardHeader>
                <p className="text-xs">Undelegate Tokens:</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <input
                      type="number"
                      placeholder="your amount"
                      className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-1/2 font-semibold text-lg placeholder:font-light placeholder:text-sm"
                    />
                    <Badge variant="secondary" className="max-h-6">
                      {denom}
                    </Badge>
                  </div>
                  <Button>Undelegate</Button>
                </div>
              </CardHeader>
            </Card>
          )}
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <Button className="w-full">Redelegate</Button>
          <Button
            className="w-full"
            onClick={() => setShowUndelegate(!showUndelegate)}
            variant={showUndelegate ? "secondary" : "default"}
          >
            {showUndelegate ? "Cancel" : "Undelegate"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
