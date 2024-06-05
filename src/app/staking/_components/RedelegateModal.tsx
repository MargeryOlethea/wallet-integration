import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { DelegationResponse } from "@/types/delegations.types";
import { ValidatorItem } from "@/types/validator.types";
import { Reward } from "@/types/reward.types";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ModalCloseButton from "@/components/ModalCloseButton";
import ScrollableValidatorsTable from "./redelegateModal/ScrollableValidatorsTable";
import RedelegateFromCard from "./redelegateModal/RedelegateFromCard";
import InputAmountCard from "./redelegateModal/InputAmountCard";
import { useValidatorsList } from "@/hooks/useReactQuery";
import { useRedelegateToken } from "@/hooks/useReactMutation";
import { coinToMicroCoin } from "@/helpers/integerModifiers";

interface RedelegateModalProps {
  userDelegationData: UserDelegationData;
}

export interface UserDelegationData {
  delegation: DelegationResponse;
  validator: ValidatorItem;
  reward: Reward;
}

export default function RedelegateModal({
  userDelegationData,
}: RedelegateModalProps) {
  // modal handling
  const { isRedelegateModalOpen, setRedelegateModalOpen } = useModal();
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setRedelegateModalOpen(false);
    setSearch("");
    setSelectedValidator("...");
    setShowAlert(false);
  };

  // get denom
  const { denom } = useWallet();

  // get validators list
  const { data, isLoading, error } = useValidatorsList();
  const validators = data && data.validators;

  // handle search
  const [search, setSearch] = useState("");
  const filteredValidators = search
    ? validators &&
      validators.filter((validator) =>
        new RegExp(search.trim(), "i").test(validator.description.moniker),
      )
    : validators;

  // handle select validator
  const [selectedValidator, setSelectedValidator] = useState("...");

  // handle redelegate amount
  const [redelegateAmount, setRedelegateAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleInput = (value: string) => {
    const delegationBalance =
      denom == "DYM"
        ? +userDelegationData?.delegation?.balance?.amount /
          1_000_000_000_000_000
        : +userDelegationData?.delegation?.balance?.amount / 1_000_000;
    if (+value > delegationBalance) {
      setShowAlert(true);
      setRedelegateAmount(value);
    } else {
      setShowAlert(false);
      setRedelegateAmount(value);
    }
  };

  // handle redelegate
  const realAmount = coinToMicroCoin(+redelegateAmount, denom!).toString();

  const sourceValidator =
    userDelegationData && userDelegationData.validator.operator_address;
  const destinationValidator =
    validators &&
    validators.find(
      (validator) => validator.description.moniker === selectedValidator,
    )?.operator_address;

  // redelegate
  const redelegateMutation = useRedelegateToken(
    sourceValidator,
    destinationValidator!,
    realAmount,
  );

  if (!isRedelegateModalOpen) {
    return null;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-2/3 p-5 flex flex-col justify-between">
        {/* close button */}
        <ModalCloseButton handleCloseModal={handleCloseModal} />

        {/* header */}
        <CardHeader>
          <CardTitle>Redelegate Token</CardTitle>

          {/* commission */}
        </CardHeader>
        <CardContent>
          {/* search */}
          <Input
            placeholder="Search validator by name..."
            type="text"
            className="mb-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <ScrollableValidatorsTable
            filteredValidators={filteredValidators}
            isLoading={isLoading}
            setSelectedValidator={setSelectedValidator}
            denom={denom!}
          />

          {/* bottom section */}
          <div className="flex gap-5">
            {/* delegate */}
            <RedelegateFromCard
              userDelegationData={userDelegationData}
              denom={denom!}
            />

            {/* input amount */}
            <InputAmountCard
              selectedValidator={selectedValidator}
              redelegateAmount={redelegateAmount}
              handleInput={handleInput}
              showAlert={showAlert}
              denom={denom}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={
              showAlert ||
              selectedValidator === "..." ||
              +redelegateAmount <= 0 ||
              redelegateMutation.isPending
            }
            onClick={() => redelegateMutation.mutate()}
          >
            {redelegateMutation.isPending
              ? "Processing..."
              : "Redelegate Tokens"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
