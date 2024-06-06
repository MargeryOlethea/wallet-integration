import { Badge } from "@/components/ui/badge";
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
import { ProposalItem } from "@/types/proposal.types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingProposalSummaryCard from "./loading/LoadingProposalSummaryCard";
interface ProposalSummaryCardProps {
  proposal: ProposalItem | undefined;
  loading: boolean;
}

function ProposalSummaryCard({ proposal, loading }: ProposalSummaryCardProps) {
  if (loading) return <LoadingProposalSummaryCard />;
  if (!loading && proposal) {
    return (
      <>
        <Card className="my-5">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <p>
                #{proposal?.id} <span>{proposal?.title}</span>
              </p>

              <Badge className="text-sm max-h-10 max-md:hidden">
                {proposal &&
                  getProposalStatusLabel(proposal.status as ProposalStatus)}
              </Badge>
            </CardTitle>
            <CardDescription>
              {proposal && dayDifferenceCounter(proposal?.voting_end_time)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-xl mb-3">Summary</p>
            <div className="proposal-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="font-xs">
                {proposal?.summary}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default ProposalSummaryCard;
