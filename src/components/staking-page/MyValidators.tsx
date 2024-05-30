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

function MyValidators() {
  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;
  const { getDelegationByDelegator, getRewardsByDelegator } = useStakingApi();

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

  // loading
  if (delegationLoading || rewardsLoading) {
    return <p>Loading...</p>;
  }

  // error
  if (delegationError || rewardsError) {
    console.error(delegationError?.message || rewardsError?.message);
    toast.error(delegationError?.message || rewardsError?.message || "");
  }

  if (rewards && delegations && rewards.length > 0 && delegations.length > 0) {
    return (
      <>
        <div className="my-10">
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
                      {delegation.delegation.validator_address}
                    </p>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {microCoinConverter(+delegation.balance.amount, denom!)}{" "}
                    <Badge>{denom}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {microCoinConverter(
                      (rewards &&
                        rewards[idx] &&
                        +rewards[idx]?.reward[0]?.amount) ||
                        0,
                      denom!,
                    )}{" "}
                    <Badge>{denom}</Badge>
                  </TableCell>

                  <TableCell>
                    <Button>Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
}

export default MyValidators;
