import React from "react";
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
  const handleClaimRewards = () => {
    alert("TODO!");
  };

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
              <p className="text-xs">Your delegation:</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-lg">
                  {microCoinConverter(
                    +userDelegationData?.delegation?.balance?.amount || 0,
                    denom!,
                  )}
                </p>{" "}
                <Badge className="mt-1">{denom}</Badge>
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
                  <Badge className="mt-1">{denom}</Badge>
                </div>
              </div>
              <Button
                onClick={handleClaimRewards}
                className="bg-blue-500 hover:bg-blue-600"
                disabled={
                  +userDelegationData?.reward?.amount > 0 ? false : true
                }
              >
                Claim Rewards
              </Button>
            </CardHeader>
          </Card>
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <Button className="w-full">Delegate</Button>
          <Button className="w-full">Redelegate</Button>
          <Button className="w-full">Undelegate</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
