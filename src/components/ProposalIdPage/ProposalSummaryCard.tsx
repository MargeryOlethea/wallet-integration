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

interface ProposalSummaryCardProps {
  proposal: ProposalItem;
  loading: boolean;
}

function ProposalSummaryCard({ proposal, loading }: ProposalSummaryCardProps) {
  return (
    <>
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

export default ProposalSummaryCard;
