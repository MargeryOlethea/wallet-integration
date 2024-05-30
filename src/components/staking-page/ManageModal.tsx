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

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  delegationAndValidator: DelegationAndValidator;
}

export interface DelegationAndValidator {
  delegation: DelegationResponse;
  validator: ValidatorItem;
}

export default function ManageModal({
  isOpen,
  onClose,
  delegationAndValidator,
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
            {delegationAndValidator?.validator?.description?.moniker}
          </CardTitle>
          <CardDescription>
            Commission:{" "}
            {Math.floor(
              +delegationAndValidator?.validator?.commission?.commission_rates
                ?.rate * 100,
            )}
            %
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <p>Your delegation:</p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-lg">
                  {microCoinConverter(
                    +delegationAndValidator?.delegation?.balance?.amount,
                    denom!,
                  )}
                </p>{" "}
                <Badge>{denom}</Badge>
              </div>
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
