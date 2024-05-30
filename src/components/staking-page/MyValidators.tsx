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
import ManageModal, { DelegationAndValidator } from "./ManageModal";

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
  const [isOpen, setIsOpen] = useState(false);
  const [delegationAndValidator, setDelegationAndValidator] =
    useState<DelegationAndValidator | null>(null);
  const handleOpenModal = (
    validator: ValidatorItem,
    delegation: DelegationResponse,
  ) => {
    const data = { validator, delegation };
    setDelegationAndValidator(data);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // loading
  if (delegationLoading || rewardsLoading || validatorsLoading) {
    return <p>Loading...</p>;
  }

  // error
  if (delegationError || rewardsError || validatorsError) {
    console.error(delegationError?.message || rewardsError?.message);
    toast.error(
      delegationError?.message ||
        rewardsError?.message ||
        validatorsError?.message ||
        "An error occured.",
    );
  }

  if (validators && validators.length > 0) {
    return (
      <>
        <section className="my-10">
          <h1 className="text-xl">My Validators</h1>

          <Table className="bg-gradient-to-r from-blue-50 my-2">
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
                        handleOpenModal(validators[idx], delegation)
                      }
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <ManageModal
          delegationAndValidator={delegationAndValidator!}
          isOpen={isOpen}
          onClose={handleCloseModal}
        />
      </>
    );
  }
}

export default MyValidators;
