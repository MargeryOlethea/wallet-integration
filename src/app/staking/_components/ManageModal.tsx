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
import { DelegationResponse } from "@/types/delegations.types";
import { Reward } from "@/types/reward.types";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import YourDelegationCard from "./manageModal/YourDelegationCard";
import UndelegateAlert from "./manageModal/UndelegateAlert";
import RewardsCard from "./manageModal/RewardsCard";
import UndelegateCard from "./manageModal/UndelegateCard";
import { Button } from "@/components/ui/button";
import ModalCloseButton from "@/components/ModalCloseButton";

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
    setShowAlert(false);
  };

  const openRedelegateModal = () => {
    handleCloseModal();
    setRedelegateModalOpen(true);
  };

  // get denom
  const { denom } = useWallet();

  // handle undelegate input
  const [showUndelegate, setShowUndelegate] = useState(false);

  //  handle undelegate amount
  const [undelegateAmount, setUndelegateAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const delegationBalance = +userDelegationData?.delegation?.balance?.amount;

  if (!isManageModalOpen) {
    return null;
  }
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative p-5 flex flex-col justify-between w-1/3 max-xl:w-2/3 max-sm:w-5/6">
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
                setUndelegateAmount={setUndelegateAmount}
                delegationBalance={delegationBalance}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
              />
            </>
          )}
        </CardContent>

        <CardFooter className="justify-between gap-3 max-sm:flex-col">
          <Button
            className="w-full"
            onClick={() => setShowUndelegate(!showUndelegate)}
            variant={showUndelegate ? "secondary" : "default"}
          >
            {showUndelegate ? "Cancel Undelegate" : "Undelegate"}
          </Button>
          <Button className="w-full" onClick={openRedelegateModal}>
            Redelegate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
