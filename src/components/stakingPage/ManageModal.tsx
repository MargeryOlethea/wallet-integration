import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ValidatorItem } from "@/types/validator.types";
import { TbAlertCircleFilled } from "react-icons/tb";
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
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useModal } from "@/hooks/useModal";
import ModalCloseButton from "../ModalCloseButton";

interface MyModalProps {
  userDelegationData: UserDelegationData;
}

export interface UserDelegationData {
  delegation: DelegationResponse;
  validator: ValidatorItem;
  reward: Reward;
}

export default function ManageModal({ userDelegationData }: MyModalProps) {
  // modal handling
  const { isManageModalOpen, setManageModalOpen, setRedelegateModalOpen } =
    useModal();
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setUndelegateAmount("");
    setShowUndelegate(false);
    setManageModalOpen(false);
  };

  const openRedelegateModal = () => {
    handleCloseModal();
    setRedelegateModalOpen(true);
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

  // handle undelegate input
  const [showUndelegate, setShowUndelegate] = useState(false);

  //  handle undelegate amount
  const [undelegateAmount, setUndelegateAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleInput = (value: string) => {
    const delegationBalance =
      denom == "DYM"
        ? +userDelegationData?.delegation?.balance?.amount /
          1_000_000_000_000_000
        : +userDelegationData?.delegation?.balance?.amount / 1_000_000;
    if (+value > delegationBalance) {
      setShowAlert(true);
      setUndelegateAmount(value);
    } else {
      setShowAlert(false);
      setUndelegateAmount(value);
    }
  };

  // handle submit
  const realAmount =
    denom == "DYM"
      ? (+undelegateAmount * 1_000_000_000_000_000).toString()
      : (+undelegateAmount * 1_000_000).toString();
  const { undelegateToken } = useCosmjs();

  const undelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        undelegateToken(
          userDelegationData?.delegation?.delegation?.validator_address,
          realAmount,
        ),
      onSuccess: (data) => {
        toast.success(`Undelegate successful!`);
        window.location.reload();
      },
      onError: (error) => {
        toast.error(`Failed to undelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  if (!isManageModalOpen) {
    return null;
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative p-5 flex flex-col justify-between w-1/3">
        {/* close button */}
        <ModalCloseButton handleCloseModal={handleCloseModal} />

        {/* header */}
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
                {withdrawMutation.isPending ? "Processing..." : "Claim Rewards"}
              </Button>
            </CardHeader>
          </Card>

          {/* undelegate amount */}
          {showUndelegate && (
            <>
              <Alert className="bg-red-50 border-red-200 text-red-700">
                <AlertTitle className="flex gap-1 items-center text-sm">
                  <TbAlertCircleFilled size="20" />
                  Once the unbonding period begin you will:
                </AlertTitle>
                <AlertDescription className="text-xs">
                  <ol className="list-disc ml-5">
                    <li>not receive staking rewards</li>
                    <li>not be able to cancel the unbonding</li>
                    <li>need to wait 2 days for the amount to be liquid</li>
                  </ol>
                </AlertDescription>
              </Alert>
              <Card className="my-2">
                {/* staking alert */}

                <CardHeader>
                  <p className="text-xs">Undelegate Tokens:</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <input
                        value={undelegateAmount}
                        onChange={(e) => handleInput(e.target.value)}
                        type="number"
                        placeholder="your amount"
                        className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-1/2 font-semibold text-lg placeholder:font-light placeholder:text-sm"
                      />
                      <Badge variant="secondary" className="max-h-6">
                        {denom}
                      </Badge>
                    </div>
                    <Button
                      disabled={showAlert || undelegateMutation.isPending}
                      onClick={() => undelegateMutation.mutate()}
                    >
                      {undelegateMutation.isPending
                        ? "Processing..."
                        : "Undelegate"}
                    </Button>
                  </div>
                  {showAlert && (
                    <AlertTitle className="flex gap-1 items-center text-xs text-red-700">
                      <TbAlertCircleFilled size="14" />
                      <p>Amount can&apos;t be bigger than delegated amount</p>
                    </AlertTitle>
                  )}
                </CardHeader>
              </Card>
            </>
          )}
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <Button className="w-full" onClick={openRedelegateModal}>
            Redelegate
          </Button>
          <Button
            className="w-full"
            onClick={() => setShowUndelegate(!showUndelegate)}
            variant={showUndelegate ? "secondary" : "default"}
          >
            {showUndelegate ? "Cancel Undelegate" : "Undelegate"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
