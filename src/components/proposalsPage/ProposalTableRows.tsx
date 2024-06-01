import { ProposalItem } from "@/types/proposal.types";
import { TableCell, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { dayDifferenceCounter } from "@/helpers/dateModifiers";
import {
  getProposalStatusLabel,
  ProposalStatus,
} from "@/helpers/stringModifiers";

function ProposalTableRows({
  proposal,
  proposalStatus,
}: {
  proposal: ProposalItem;
  proposalStatus: ProposalStatus;
}) {
  // counting vote
  const yesVote = +proposal.final_tally_result.yes;
  const noVote = +proposal.final_tally_result.no;
  const vetoVote = +proposal.final_tally_result.no_with_veto;
  const abstainVote = +proposal.final_tally_result.abstain;
  console.log({ yesVote, noVote, vetoVote, abstainVote }, "votes");

  const totalVotes = yesVote + noVote + vetoVote + abstainVote;
  const totalYesVotesPercentage = (noVote / totalVotes) * 100;
  console.log(totalYesVotesPercentage, "totalyes");
  return (
    <>
      <TableRow key={proposal.proposal_id}>
        <TableCell className="font-semibold text-lg">
          #{proposal.proposal_id}
        </TableCell>
        <TableCell className="max-w-xs font-semibold">
          {proposal.content.title}
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
    </>
  );
}

export default ProposalTableRows;
