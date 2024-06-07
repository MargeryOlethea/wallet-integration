import { DeliverTxResponse } from "@cosmjs/stargate";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useCosmjs, VoteOption } from "./useCosmjs";
import toast from "react-hot-toast";
import {
  useAvailableBalance,
  useDelegationListByDelegator,
  useProposalDetails,
  useRewardBalance,
  useRewardsListByDelegator,
  useStakeBalance,
  useValidatorsListByDelegator,
} from "./useReactQuery";
import { useModal } from "./useModal";
import { Dispatch, SetStateAction } from "react";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const useDelegateToken = (
  validatorAddress: string,
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
) => {
  const { delegateToken } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { refetch: refetchAvailableBalance } = useAvailableBalance();
  const { refetch: refetchStakeBalance } = useStakeBalance();
  const { setDelegateModalOpen } = useModal();
  const delegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () => delegateToken(validatorAddress, amount),
      onSuccess: (data) => {
        toast.success(`Success! TxHash: ${data?.transactionHash}`);
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        refetchAvailableBalance();
        refetchStakeBalance();
        setDelegateModalOpen(false);
        scrollToTop();
        setAmount("0");
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
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { refetch: refetchAvailableBalance } = useAvailableBalance();
  const { refetch: refetchRewardsBalance } = useRewardBalance();
  const { setManageModalOpen } = useModal();
  const withdrawMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () => withdrawStakedReward(validatorAddress),
      onSuccess: (data) => {
        toast.success(`Success! TxHash: ${data?.transactionHash}`);
        refetchRewardsList();
        refetchAvailableBalance();
        refetchRewardsBalance();
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
  setAmount: Dispatch<SetStateAction<string>>,
) => {
  const { redelegateToken } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { refetch: refetchAvailableBalance } = useAvailableBalance();
  const { setRedelegateModalOpen } = useModal();
  const redelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        redelegateToken(sourceValidator, destinationValidator, amount),
      onSuccess: (data) => {
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        refetchAvailableBalance();
        setRedelegateModalOpen(false);
        scrollToTop();
        toast.success(`Success! TxHash: ${data?.transactionHash}`);
        setAmount("0");
      },
      onError: (error) => {
        toast.error(`Failed to redelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  return redelegateMutation;
};

export const useUndelegateToken = (
  validatorAddres: string,
  amount: string,
  setAmount: Dispatch<SetStateAction<string>>,
) => {
  const { undelegateToken } = useCosmjs();
  const { refetch: refetchDelegationList } = useDelegationListByDelegator();
  const { refetch: refetchValidatorsList } = useValidatorsListByDelegator();
  const { refetch: refetchRewardsList } = useRewardsListByDelegator();
  const { refetch: refetchAvailableBalance } = useAvailableBalance();
  const { refetch: refetchStakeBalance } = useStakeBalance();
  const { refetch: refetchRewardsBalance } = useRewardBalance();
  const { setManageModalOpen } = useModal();

  const undelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () => undelegateToken(validatorAddres, amount),
      onSuccess: (data) => {
        refetchDelegationList();
        refetchRewardsList();
        refetchValidatorsList();
        refetchAvailableBalance();
        refetchStakeBalance();
        refetchRewardsBalance();
        setManageModalOpen(false);
        scrollToTop();
        setAmount("0");
        toast.success(`Success! TxHash: ${data?.transactionHash}`);
      },
      onError: (error) => {
        toast.error(`Failed to undelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  return undelegateMutation;
};

export const useVoteProposal = (proposalId: string) => {
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
      refetch();
      scrollToTop();
      toast.success("Success! TxHash: ${data?.transactionHash}");
    },
    onError: (error) => {
      toast.error(`Failed to vote proposal: ${error.message}`);
      console.error(error.message);
    },
  });
  return votingMutation;
};
