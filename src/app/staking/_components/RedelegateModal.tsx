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
import { useStakingApi } from "@/hooks/useStakingApi";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { useCosmjs } from "@/hooks/useCosmjs";
import ModalCloseButton from "@/components/ModalCloseButton";
import ScrollableValidatorsTable from "./redelegateModal/ScrollableValidatorsTable";
import RedelegateFromCard from "./redelegateModal/RedelegateFromCard";
import InputAmountCard from "./redelegateModal/InputAmountCard";

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
  };

  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

  // get validators list
  const { getValidatorsList } = useStakingApi();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getValidatorsList(),
    queryKey: ["validatorsList"],
  });

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
  const realAmount =
    denom == "DYM"
      ? (+redelegateAmount * 1_000_000_000_000_000).toString()
      : (+redelegateAmount * 1_000_000).toString();

  const sourceValidator =
    userDelegationData && userDelegationData.validator.operator_address;
  const destinationValidator =
    validators &&
    validators.find(
      (validator) => validator.description.moniker === selectedValidator,
    )?.operator_address;

  const { redelegateToken } = useCosmjs();
  const redelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        redelegateToken(sourceValidator, destinationValidator!, realAmount),
      onSuccess: (data) => {
        toast.success(`Redelegate successful!`);
        window.location.reload();
      },
      onError: (error) => {
        toast.error(`Failed to redelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

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
