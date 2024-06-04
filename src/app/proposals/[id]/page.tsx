"use client";
import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import BackToProposalPage from "./_components/BackToProposalPage";
import ProposalSummaryCard from "./_components/ProposalSummaryCard";
import ProposalTimelineCard from "./_components/ProposalTimelineCard";
import TallyCountCard from "./_components/TallyCountCard";
import { useProposalDetails } from "@/hooks/useReactQuery";

function ProposalPage() {
  const { id } = useParams();
  const { showConnectToWallet } = useWallet();

  // fetch proposal details
  const { data, isLoading, error } = useProposalDetails(id as string);

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
