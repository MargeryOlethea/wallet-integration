import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { dayDifferenceCounter } from "@/helpers/dateModifiers";
import {
  getProposalStatusLabel,
  ProposalStatus,
} from "@/helpers/stringModifiers";
import { ProposalItem } from "@/types/proposal.types";
import Link from "next/link";

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

  return (
    <>
      <TableRow>
        <TableCell className="font-semibold text-lg">#{proposal.id}</TableCell>
        <TableCell className="max-w-xs font-semibold">
          {proposal.title}
        </TableCell>
        <TableCell className="font-semibold">
          {getProposalStatusLabel(proposalStatus)}
        </TableCell>
        <TableCell className="font-semibold">
          {dayDifferenceCounter(proposal.voting_end_time)}
        </TableCell>
        <TableCell>
          <Link href={`/proposals/${proposal.id}`}>
            <Button>Details</Button>
          </Link>
        </TableCell>
      </TableRow>
    </>
  );
}

export default ProposalTableRows;
