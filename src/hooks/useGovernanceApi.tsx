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
    if (chainId === "froopyland_100-1") {
      switch (proposalStatus) {
        case "PROPOSAL_STATUS_VOTING_PERIOD":
          proposalStatus = "2";
          break;
        case "PROPOSAL_STATUS_PASSED":
          proposalStatus = "3";
          break;
        case "PROPOSAL_STATUS_REJECTED":
          proposalStatus = "4";
          break;
      }
    }
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
  };

  const getProposalById = async (proposalId: string) => {
    const path = "/cosmos/gov/v1/proposals/" + proposalId;
    const response = await fetch(baseUrl + path);

    const proposal: ProposalById = await response.json();

    return proposal;
  };

  return { getProposalsList, getProposalById };
};
