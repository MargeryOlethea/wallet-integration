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
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/useModal";
import StakingAlert from "./delegateModal/StakingAlert";
import AvailableBalanceCard from "./delegateModal/AvailableBalanceCard";
import DelegateAmountCard from "./delegateModal/DelegateAmountCard";
import InsufficientBalanceAlert from "./delegateModal/InsufficientBalanceAlert";
import AmountButtons from "./delegateModal/AmountButtons";
import ModalCloseButton from "@/components/ModalCloseButton";
import { Button } from "@/components/ui/button";
import { useAvailableBalance } from "@/hooks/useReactQuery";
import { useDelegateToken } from "@/hooks/useReactMutation";
import { coinToMicroCoin, microCoinToCoin } from "@/helpers/integerModifiers";

interface AllModalProps {
  validator: ValidatorItem;
}

export default function DelegateModal({ validator }: AllModalProps) {
  // modal handling
  const { isDelegateModalOpen, setDelegateModalOpen } = useModal();
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setDelegateAmount("");
    setDelegateModalOpen(false);
    setShowAlert(false);
  };

  // get denom
  const { denom } = useWallet();

  // fetching available balance
  const {
    data: availableBalance,
    error: availableError,
    isLoading: availableLoading,
  } = useAvailableBalance();

  const availableAmount = availableBalance?.amount || 0;

  // handle amount
  const [delegateAmount, setDelegateAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleInput = (value: string) => {
    const balance =
      denom == "DYM"
        ? +availableAmount / 1_000_000_000_000_000_000
        : +availableAmount / 1_000_000;

    if (+value > balance) {
      setShowAlert(true);
      setDelegateAmount(value);
    } else {
      setShowAlert(false);
      setDelegateAmount(value);
    }
  };

  const handleAmountButton = (amount: "1/3" | "1/2" | "MAX") => {
    const coin =
      denom == "DYM"
        ? +availableAmount / 1_000_000_000_000_000_000
        : +availableAmount / 1_000_000;
    switch (amount) {
      case "1/3":
        setDelegateAmount((coin / 3).toFixed(4));
        setShowAlert(false);
        break;
      case "1/2":
        setDelegateAmount((coin / 2).toFixed(4));
        setShowAlert(false);
        break;
      case "MAX":
        setDelegateAmount(coin.toFixed(4));
        setShowAlert(false);
        break;
    }
  };

  // handle submit
  const realAmount = coinToMicroCoin(+delegateAmount, denom!).toString();

  const delegateMutation = useDelegateToken(
    validator?.operator_address,
    realAmount,
  );

  if (availableError) {
    toast.error(availableError.message);
  }
  if (!isDelegateModalOpen) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-1/3  lg:h-2/3 max-lg:w-2/3 p-5 flex flex-col justify-between">
        {/* close button */}
        <ModalCloseButton handleCloseModal={handleCloseModal} />

        {/* header */}
        <CardHeader>
          <CardTitle>{validator?.description?.moniker}</CardTitle>

          {/* commission */}
          <CardDescription>
            Commission:{" "}
            {Math.floor(+validator.commission.commission_rates.rate * 100)}%
          </CardDescription>

          <StakingAlert />
        </CardHeader>
        <CardContent>
          {/* available balances */}
          <AvailableBalanceCard
            availableAmount={availableAmount}
            availableLoading={availableLoading}
            denom={denom}
          />

          {/* amount to delegate */}
          <DelegateAmountCard
            delegateAmount={delegateAmount}
            handleInput={handleInput}
            denom={denom}
          />

          {/* amount buttons */}
          <div className="flex justify-between items-center">
            <InsufficientBalanceAlert showAlert={showAlert} />

            <AmountButtons handleAmountButton={handleAmountButton} />
          </div>
        </CardContent>
        <CardFooter>
          {/* delegate button */}
          <Button
            className="w-full"
            disabled={
              showAlert || +delegateAmount <= 0 || delegateMutation.isPending
            }
            onClick={() => delegateMutation.mutate()}
          >
            {delegateMutation.isPending ? "Processing..." : "Delegate"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
