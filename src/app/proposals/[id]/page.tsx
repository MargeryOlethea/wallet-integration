"use client";
import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";

import { useGovernanceApi } from "@/hooks/useGovernanceApi";
import { useWallet } from "@/hooks/useWallet";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import BackToProposalPage from "./_components/BackToProposalPage";
import ProposalSummaryCard from "./_components/ProposalSummaryCard";
import ProposalTimelineCard from "./_components/ProposalTimelineCard";
import TallyCountCard from "./_components/TallyCountCard";

function ProposalPage() {
  const { id } = useParams();
  const { getProposalById } = useGovernanceApi();
  const { chainId, userAddress, showConnectToWallet } = useWallet();
  const { data, isLoading, error } = useQuery({
    queryKey: ["proposal", id, chainId, userAddress],
    queryFn: () => getProposalById(id as string),
    enabled: !!chainId && !!userAddress,
  });

  const proposal = data && data.proposal;

  if (error) {
    console.error(error.message);
    toast.error(error.message);
  }

  if (showConnectToWallet) {
    return <NoConnectedWalletHeader />;
  }
  return (
    <>
      <BackToProposalPage />

      <ProposalSummaryCard proposal={proposal} loading={isLoading} />

      <ProposalTimelineCard proposal={proposal} loading={isLoading} />

      <TallyCountCard
        proposalId={proposal?.id}
        tallyCount={proposal?.final_tally_result}
        status={proposal?.status}
        loading={isLoading}
      />
    </>
  );
}

export default ProposalPage;
