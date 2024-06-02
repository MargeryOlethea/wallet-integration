import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { dayDifferenceCounter } from "@/helpers/dateModifiers";
import {
  getProposalStatusLabel,
  ProposalStatus,
} from "@/helpers/stringModifiers";
import {
  PassedProposalItem,
  RejectedProposalItem,
} from "@/types/proposal.types";

interface ProposalTableRowsProps {
  proposal: RejectedProposalItem | PassedProposalItem;
  proposalStatus: ProposalStatus;
}

function ProposalTableRows({
  proposal,
  proposalStatus,
}: ProposalTableRowsProps) {
  // Counting votes
  const yesVote = Number(proposal.final_tally_result.yes);
  const noVote = Number(proposal.final_tally_result.no);
  const vetoVote = Number(proposal.final_tally_result.no_with_veto);
  const abstainVote = Number(proposal.final_tally_result.abstain);

  const totalVotes = yesVote + noVote + vetoVote + abstainVote;

  // Type guard to check if the proposal is a RejectedProposalItem
  const isRejected = (proposal: any): proposal is RejectedProposalItem => {
    return (proposal as RejectedProposalItem).id !== undefined;
  };

  return (
    <TableRow>
      <TableCell className="font-semibold text-lg">
        #{isRejected(proposal) ? proposal.id : proposal.proposal_id}
      </TableCell>
      <TableCell className="max-w-xs font-semibold">
        {isRejected(proposal) ? proposal.title : proposal.content?.title}
      </TableCell>
      <TableCell className="font-semibold">
        {getProposalStatusLabel(proposalStatus)}
      </TableCell>
      <TableCell className="font-semibold">
        {dayDifferenceCounter(proposal.voting_end_time)}
      </TableCell>
      <TableCell>
        <Button>Details</Button>
      </TableCell>
    </TableRow>
  );
}

export default ProposalTableRows;
