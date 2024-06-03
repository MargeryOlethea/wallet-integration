"use client";
import TallyCountCard from "@/components/ProposalIdPage/TallyCountCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dayDifferenceCounter } from "@/helpers/dateModifiers";
import {
  getProposalStatusLabel,
  ProposalStatus,
} from "@/helpers/stringModifiers";
import { useGovernanceApi } from "@/hooks/useGovernanceApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <Link href="/proposals">
        <Button className="mb-5 gap-2" variant="secondary">
          <IoChevronBack size="20" />
          <span>Back</span>
        </Button>
      </Link>
      <Card className="my-5">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <p>
              {" "}
              <span>#{proposal?.id}</span> {proposal?.title}
            </p>

            <Badge>
              {proposal &&
                getProposalStatusLabel(proposal.status as ProposalStatus)}
            </Badge>
          </CardTitle>
          <CardDescription>
            {proposal && dayDifferenceCounter(proposal?.voting_end_time)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-xl">Summary</p>
          <div className="proposal-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} className="font-xs">
              {proposal?.summary}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <TallyCountCard tallyCount={proposal!.final_tally_result} />
    </>
  );
}

export default ProposalPage;
