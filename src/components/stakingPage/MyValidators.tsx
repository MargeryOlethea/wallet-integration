import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useStakingApi } from "@/hooks/useStakingApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Badge } from "../ui/badge";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { useDistributionApi } from "@/hooks/useDistributionApi";
import { useState } from "react";
import { ValidatorItem } from "@/types/validator.types";
import { DelegationResponse } from "@/types/delegations.types";
import { Reward } from "@/types/reward.types";
import ManageModal, { UserDelegationData } from "./ManageModal";
import { useModal } from "@/hooks/useModal";
import RedelegateModal from "./RedelegateModal";
import { Card } from "../ui/card";
import LoadingMyValidatorPage from "./loading/LoadingMyValidatorTable";
import NoDataFound from "../NoDataFound";

function MyValidators() {
  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;
  const { getDelegationByDelegator, getValidatorsInfoByDelegator } =
    useStakingApi();
  const { getRewardsByDelegator } = useDistributionApi();

  // get staked amount
  const {
    data: delegationData,
    isLoading: delegationLoading,
    error: delegationError,
  } = useQuery({
    queryFn: getDelegationByDelegator,
    queryKey: ["delegationList"],
  });

  const delegations = delegationData && delegationData.delegation_responses;

  // get validators info
  const {
    data: validatorsData,
    isLoading: validatorsLoading,
    error: validatorsError,
  } = useQuery({
    queryFn: getValidatorsInfoByDelegator,
    queryKey: ["myValidatorsList"],
  });

  const validators = validatorsData && validatorsData.validators;

  // get rewards
  const {
    data: rewardsData,
    isLoading: rewardsLoading,
    error: rewardsError,
  } = useQuery({
    queryFn: getRewardsByDelegator,
    queryKey: ["rewardsList"],
  });

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
                          {validators[idx].description.moniker}
                        </p>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {microCoinConverter(+delegation.balance.amount, denom!)}{" "}
                        <Badge className="ml-2">{denom}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {microCoinConverter(
                          (rewards &&
                            rewards[idx] &&
                            +rewards[idx]?.reward[0]?.amount) ||
                            0,
                          denom!,
                        )}{" "}
                        <Badge className="ml-2">{denom}</Badge>
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
