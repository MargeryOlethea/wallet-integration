import { DeliverTxResponse } from "@cosmjs/stargate";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useCosmjs, VoteOption } from "./useCosmjs";
import toast from "react-hot-toast";
import {
  useDelegationListByDelegator,
  useProposalDetails,
  useRewardsListByDelegator,
  useValidatorsListByDelegator,
} from "./useReactQuery";
import { useModal } from "./useModal";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const useDelegateToken = (validatorAddress: string, amount: string) => {
  const { delegateToken } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { setDelegateModalOpen } = useModal();
  const delegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () => delegateToken(validatorAddress, amount),
      onSuccess: (data) => {
        toast.success(`Staking successful!`);
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        setDelegateModalOpen(false);
        scrollToTop();
      },
      onError: (error) => {
        toast.error(`Failed to delegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  return delegateMutation;
};

export const useClaimRewards = (validatorAddress: string) => {
  const { withdrawStakedReward } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { setManageModalOpen } = useModal();
  const withdrawMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () => withdrawStakedReward(validatorAddress),
      onSuccess: (data) => {
        toast.success(`Rewards claimed successfully!`);
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        setManageModalOpen(false);
        scrollToTop();
      },
      onError: (error) => {
        toast.error(`Failed to claim rewards: ${error.message}`);
        console.error(error.message);
      },
    });

  return withdrawMutation;
};

export const useRedelegateToken = (
  sourceValidator: string,
  destinationValidator: string,
  amount: string,
) => {
  const { redelegateToken } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { setRedelegateModalOpen } = useModal();
  const redelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        redelegateToken(sourceValidator, destinationValidator, amount),
      onSuccess: (data) => {
        toast.success(`Redelegate successful!`);
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        setRedelegateModalOpen(false);
        scrollToTop();
      },
      onError: (error) => {
        toast.error(`Failed to redelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  return redelegateMutation;
};

export const useUndelegateToken = (validatorAddres: string, amount: string) => {
  const { undelegateToken } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { setManageModalOpen } = useModal();

  const undelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () => undelegateToken(validatorAddres, amount),
      onSuccess: (data) => {
        toast.success(`Undelegate successful!`);
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        setManageModalOpen(false);
        scrollToTop();
      },
      onError: (error) => {
        toast.error(`Failed to undelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  return undelegateMutation;
};

export const useVoteProposal = () => {
  const { voteProposal } = useCosmjs();
  const { refetch } = useProposalDetails(proposalId as string);
  const votingMutation: UseMutationResult<
    DeliverTxResponse,
    Error,
    VoteOption,
    void
  > = useMutation({
    mutationFn: (option: VoteOption) => {
      return voteProposal(proposalId!, option);
    },
    onSuccess: () => {
      toast.success("Voting successful!");
      refetch();
      scrollToTop();
    },
    onError: (error) => {
      toast.error(`Failed to vote proposal: ${error.message}`);
      console.error(error.message);
    },
  });
  return votingMutation;
};
