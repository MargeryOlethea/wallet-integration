import { useQuery } from "@tanstack/react-query";
import { useWallet } from "./useWallet";
import { useGovernanceApi } from "./useGovernanceApi";
import { useCosmjs } from "./useCosmjs";
import { useDistributionApi } from "./useDistributionApi";
import { useStakingApi } from "./useStakingApi";
import { ProposalStatus } from "@/helpers/stringModifiers";

export const useProposalsList = (
  paginationOffset: number,
  paginationLimit: number,
  proposalStatus: ProposalStatus,
) => {
  const { userAddress, chainId } = useWallet();
  const { getProposalsList } = useGovernanceApi();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "proposalsList",
      proposalStatus,
      paginationOffset,
      paginationLimit,
      chainId,
      userAddress,
    ],
    queryFn: () =>
      getProposalsList(proposalStatus, paginationOffset, paginationLimit),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useProposalDetails = (proposalId: string) => {
  const { userAddress, chainId } = useWallet();
  const { getProposalById } = useGovernanceApi();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["proposal", proposalId, chainId, userAddress],
    queryFn: () => getProposalById(proposalId as string),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useValidatorsList = (
  paginationOffset?: number,
  paginationLimit?: number,
) => {
  const { userAddress, chainId } = useWallet();
  const { getValidatorsList } = useStakingApi();

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => getValidatorsList(paginationOffset, paginationLimit),
    queryKey: ["validatorsList", paginationOffset, chainId, userAddress],
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useAvailableBalance = () => {
  const { userAddress, chainId } = useWallet();
  const { getAvailableBalance } = useCosmjs();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["availableBalance", chainId, userAddress],
    queryFn: () => getAvailableBalance(),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useStakeBalance = () => {
  const { userAddress, chainId } = useWallet();
  const { getStakeBalance } = useCosmjs();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["stakeBalance", chainId, userAddress],
    queryFn: () => getStakeBalance(),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useRewardBalance = () => {
  const { userAddress, chainId } = useWallet();
  const { getRewardsByDelegator } = useDistributionApi();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["rewardsBalance", chainId, userAddress],
    queryFn: () => getRewardsByDelegator(),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useDelegationListByDelegator = () => {
  const { userAddress, chainId } = useWallet();
  const { getDelegationByDelegator } = useStakingApi();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["delegationList", chainId, userAddress],
    queryFn: () => getDelegationByDelegator(),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useValidatorsListByDelegator = () => {
  const { userAddress, chainId } = useWallet();
  const { getValidatorsInfoByDelegator } = useStakingApi();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["validatorsList", chainId, userAddress],
    queryFn: () => getValidatorsInfoByDelegator(),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useRewardsListByDelegator = () => {
  const { userAddress, chainId } = useWallet();
  const { getRewardsByDelegator } = useDistributionApi();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["rewardsList", chainId, userAddress],
    queryFn: () => getRewardsByDelegator(),
    enabled: !!chainId && !!userAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
