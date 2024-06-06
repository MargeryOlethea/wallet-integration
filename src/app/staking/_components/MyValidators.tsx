import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWallet } from "@/hooks/useWallet";
import toast from "react-hot-toast";
import { microCoinToCoin } from "@/helpers/integerModifiers";
import { useState } from "react";
import { ValidatorItem } from "@/types/validator.types";
import { DelegationResponse } from "@/types/delegations.types";
import { Reward } from "@/types/reward.types";
import ManageModal, { UserDelegationData } from "./ManageModal";
import { useModal } from "@/hooks/useModal";
import RedelegateModal from "./RedelegateModal";
import LoadingMyValidatorPage from "./loading/LoadingMyValidatorTable";
import { Card } from "@/components/ui/card";
import NoDataFound from "@/components/NoDataFound";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useDelegationListByDelegator,
  useRewardsListByDelegator,
  useValidatorsListByDelegator,
} from "@/hooks/useReactQuery";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function MyValidators() {
  // get denom
  const { denom } = useWallet();

  // get my delegation list
  const {
    data: delegationData,
    isLoading: delegationLoading,
    error: delegationError,
  } = useDelegationListByDelegator();
  const delegations = delegationData && delegationData.delegation_responses;

  // get validators list
  const {
    data: validatorsData,
    isLoading: validatorsLoading,
    error: validatorsError,
  } = useValidatorsListByDelegator();
  const validators = validatorsData && validatorsData.validators;

  // get rewards list
  const {
    data: rewardsData,
    isLoading: rewardsLoading,
    error: rewardsError,
  } = useRewardsListByDelegator();
  const rewards = rewardsData && rewardsData.rewards;

  // modal handling
  const { setManageModalOpen } = useModal();
  const [userDelegationData, setUserDelegationData] =
    useState<UserDelegationData | null>(null);
  const handleOpenModal = (
    delegation: DelegationResponse,
    validator: ValidatorItem,
    reward: Reward,
  ) => {
    const data = { validator, delegation, reward };
    setUserDelegationData(data);
    setManageModalOpen(true);
  };

  // media query
  const { isMobile } = useMediaQuery();

  // loading & error
  const loading = delegationLoading || rewardsLoading || validatorsLoading;
  const error = delegationError || rewardsError || validatorsError;

  // error
  if (error) {
    console.error(error.message);
    toast.error(
      error.message || "An error occured while fetching your validators.",
    );
  }

  if (validators && validators.length > 0) {
    return (
      <>
        <section className="my-10">
          <h1 className="text-xl">My Validators</h1>

          {loading && <LoadingMyValidatorPage />}
          {!loading && delegations && delegations.length < 1 && <NoDataFound />}
          {!loading && delegations && delegations.length > 0 && (
            <Card className="my-5">
              <Table className="bg-gradient-to-r from-blue-50">
                <TableHeader>
                  <TableRow>
                    <TableHead>Validator</TableHead>
                    <TableHead>Amount Staked</TableHead>
                    <TableHead>Claimable Rewards</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delegations!.map((delegation, idx) => (
                    <TableRow key={delegation.delegation.validator_address}>
                      <TableCell className="flex items-center gap-2">
                        <p className="font-semibold">
                          {validators[idx]?.description?.moniker}
                        </p>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isMobile
                          ? microCoinToCoin(
                              +delegation.balance.amount,
                              denom!,
                              2,
                            )
                          : microCoinToCoin(
                              +delegation.balance.amount,
                              denom!,
                            )}{" "}
                        <Badge className="ml-2 max-md:hidden">{denom}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {isMobile
                          ? microCoinToCoin(
                              (rewards &&
                                rewards[idx] &&
                                +rewards[idx]?.reward[0]?.amount) ||
                                0,
                              denom!,
                              2,
                            )
                          : microCoinToCoin(
                              (rewards &&
                                rewards[idx] &&
                                +rewards[idx]?.reward[0]?.amount) ||
                                0,
                              denom!,
                            )}{" "}
                        <Badge className="ml-2 max-md:hidden">{denom}</Badge>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() =>
                            handleOpenModal(
                              delegation,
                              validators[idx],
                              rewards![idx].reward[0],
                            )
                          }
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </section>

        <ManageModal userDelegationData={userDelegationData!} />
        <RedelegateModal userDelegationData={userDelegationData!} />
      </>
    );
  }
}

export default MyValidators;
