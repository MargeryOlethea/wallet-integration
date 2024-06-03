"use client";
import ProposalSummaryCard from "@/components/ProposalIdPage/ProposalSummaryCard";
import ProposalTimelineCard from "@/components/ProposalIdPage/ProposalTimelineCard";
import TallyCountCard from "@/components/ProposalIdPage/TallyCountCard";
import { Button } from "@/components/ui/button";
import { useGovernanceApi } from "@/hooks/useGovernanceApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";

function ProposalPage() {
  const { id } = useParams();
  const { getProposalById } = useGovernanceApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ["proposal", id],
    queryFn: () => getProposalById(id as string),
  });

  const proposal = data && data.proposal;

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error.message);
    toast.error(error.message);
  }
  return (
    <>
      <Link href="/proposals">
        <Button className="mb-5 gap-2" variant="secondary">
          <IoChevronBack size="20" />
          <span>Back</span>
        </Button>
      </Link>

      <ProposalSummaryCard proposal={proposal!} loading={isLoading} />

      <ProposalTimelineCard proposal={proposal!} />

      <TallyCountCard
        tallyCount={proposal!.final_tally_result}
        status={proposal!.status}
      />
    </>
  );
}

export default ProposalPage;
