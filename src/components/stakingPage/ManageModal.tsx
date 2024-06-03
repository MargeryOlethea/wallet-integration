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
import YourDelegationCard from "./manageModal/YourDelegationCard";
import UndelegateAlert from "./manageModal/UndelegateAlert";
import RewardsCard from "./manageModal/RewardsCard";
import UndelegateCard from "./manageModal/UndelegateCard";

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
          <YourDelegationCard
            userDelegationData={userDelegationData}
            denom={denom}
          />

          {/* rewards */}
          <RewardsCard userDelegationData={userDelegationData} denom={denom} />

          {/* undelegate amount */}
          {showUndelegate && (
            <>
              <UndelegateAlert />
              <UndelegateCard
                userDelegationData={userDelegationData}
                denom={denom}
                undelegateAmount={undelegateAmount}
                handleInput={handleInput}
                showAlert={showAlert}
              />
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
