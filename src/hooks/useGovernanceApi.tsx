import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { ProposalById, ProposalData } from "@/types/proposal.types";

export const useGovernanceApi = () => {
  const { chainId } = useWallet();
  const baseUrl = (chainId && chainInfoMap[chainId].rest) || "";

  const getProposalsList = async (
    proposalStatus: string = "PROPOSAL_STATUS_VOTING_PERIOD",
    paginationOffset: number | string = 0,
    paginationLimit: number | string = 999,
  ) => {
    try {
      const path = "/cosmos/gov/v1/proposals";
      const paginationReverse = true;
      const queryParams = new URLSearchParams({
        proposal_status: proposalStatus,
        "pagination.limit": paginationLimit.toString(),
        "pagination.offset": paginationOffset.toString(),
        "pagination.reverse": paginationReverse.toString(),
      }).toString();

      const response = await fetch(baseUrl + path + "?" + queryParams);

      const proposalsList: ProposalData = await response.json();

      return proposalsList;
    } catch (error) {
      throw error;
    }
  };

  const getProposalById = async (proposalId: string) => {
    try {
      const path = "/cosmos/gov/v1/proposals/" + proposalId;
      const response = await fetch(baseUrl + path);

      const proposal: ProposalById = await response.json();

      return proposal;
    } catch (error) {
      throw error;
    }
  };

  return { getProposalsList, getProposalById };
};
