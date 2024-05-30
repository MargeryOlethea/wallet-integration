import React, { useState } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TbAlertCircleFilled } from "react-icons/tb";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useQuery } from "@tanstack/react-query";
import { useCosmjs } from "@/hooks/useCosmjs";
import toast from "react-hot-toast";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { Skeleton } from "../ui/skeleton";

interface AllModalProps {
  validator: ValidatorItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function DelegateModal({
  validator,
  isOpen,
  onClose,
}: AllModalProps) {
  // modal handling
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

  // fetching available balance
  const { getAvailableBalances } = useCosmjs();
  const {
    data: availableBalances,
    error: availableError,
    isLoading: availableLoading,
  } = useQuery({
    queryKey: ["availableBalances"],
    queryFn: getAvailableBalances,
  });

  const firstBalance = (availableBalances && availableBalances[0]?.amount) || 0;

  // handle amount
  const [amount, setAmount] = useState("");
  const handleAmountButton = (amount: "1/3" | "1/2" | "MAX") => {
    switch (amount) {
      case "1/3":
        setAmount(microCoinConverter(+firstBalance / 3, denom!).toString());
        break;
      case "1/2":
        setAmount(microCoinConverter(+firstBalance / 2, denom!).toString());
        break;
      case "MAX":
        setAmount(microCoinConverter(+firstBalance, denom!).toString());
        break;
    }
  };

  if (availableError) {
    toast.error(availableError.message);
  }
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-1/3 h-2/3 p-5 flex flex-col justify-between">
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <IoClose size="25" />
        </button>
        <CardHeader>
          <CardTitle>{validator?.description?.moniker}</CardTitle>
          <CardDescription>
            Commission:{" "}
            {Math.floor(+validator.commission.commission_rates.rate * 100)}%
          </CardDescription>
          {/* alert */}
          <Alert className="bg-red-50 border-red-200 text-red-700">
            <AlertTitle className="flex gap-1 items-center text-sm">
              <TbAlertCircleFilled size="20" />
              Staking will lock your funds for 2 days
            </AlertTitle>
            <AlertDescription className="text-xs">
              You will need to undelegate in order for your staked assets to be
              liquid again. This process will take 2 days to complete.
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <Card className="my-2">
            {" "}
            <CardHeader className="flex flex-row justify-between">
              <p className="text-sm">
                Available Balances:{" "}
                {availableLoading ? (
                  <Skeleton className="h-10 w-1/2" />
                ) : (
                  <span className="font-semibold text-lg">
                    {microCoinConverter(+firstBalance, denom!)}
                  </span>
                )}
              </p>

              <Badge variant="secondary">{denom}</Badge>
            </CardHeader>
          </Card>
          <Card className="my-2">
            <CardHeader className="flex flex-row justify-between gap-5">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="your staking amount"
                className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-full font-semibold text-lg placeholder:font-light placeholder:text-sm"
              />
              <Badge variant="secondary">{denom}</Badge>
            </CardHeader>
          </Card>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleAmountButton("1/3")}
            >
              1/3
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleAmountButton("1/2")}
            >
              1/2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleAmountButton("MAX")}
            >
              MAX
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Delegate</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
