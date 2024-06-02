import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "./useWallet";
import { ProposalData } from "@/types/proposal.types";

export const useGovernanceApi = () => {
  const { chainId } = useWallet();
  const baseUrl = (chainId && chainInfoMap[chainId].rest) || "";

  const getProposalsList = async (
    proposalStatus: string = "PROPOSAL_STATUS_VOTING_PERIOD",
    paginationOffset: number | string = 0,
    paginationLimit: number | string = 999,
  ) => {
    const paginationReverse = true;

    const response = await fetch(
      `${baseUrl}/cosmos/gov/v1/proposals?proposal_status=${proposalStatus}&pagination.limit=${paginationLimit}&pagination.offset=${paginationOffset}&pagination.reverse=${paginationReverse}`,
    );

    const proposalsList: ProposalData = await response.json();

    return proposalsList;
  };

  return { getProposalsList };
};
