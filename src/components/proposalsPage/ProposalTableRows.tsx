import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { dayDifferenceCounter } from "@/helpers/dateModifiers";
import {
  getProposalStatusLabel,
  ProposalStatus,
} from "@/helpers/stringModifiers";
import { ProposalData, ProposalItem } from "@/types/proposal.types";
import { useModal } from "@/hooks/useModal";

function ProposalTableRows({
  proposal,
  proposalStatus,
}: {
  proposal: ProposalItem;
  proposalStatus: ProposalStatus;
}) {
  // Counting votes
  const yesVote = Number(proposal.final_tally_result.yes);
  const noVote = Number(proposal.final_tally_result.no);
  const vetoVote = Number(proposal.final_tally_result.no_with_veto);
  const abstainVote = Number(proposal.final_tally_result.abstain);

  const totalVotes = yesVote + noVote + vetoVote + abstainVote;

  const { setProposalModalOpen } = useModal();

  return (
    <TableRow>
      <TableCell className="font-semibold text-lg">#{proposal.id}</TableCell>
      <TableCell className="max-w-xs font-semibold">{proposal.title}</TableCell>
      <TableCell className="font-semibold">
        {getProposalStatusLabel(proposalStatus)}
      </TableCell>
      <TableCell className="font-semibold">
        {dayDifferenceCounter(proposal.voting_end_time)}
      </TableCell>
      <TableCell>
        <Button onClick={() => setProposalModalOpen(true)}>Details</Button>
      </TableCell>
    </TableRow>
  );
}

export default ProposalTableRows;
