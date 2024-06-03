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
  console.log(proposal.title);
  return (
    <>
      <TableRow>
        <TableCell className="font-semibold text-lg">#{proposal.id}</TableCell>
        <TableCell className="max-w-xs font-semibold">
          {proposal?.title || proposal?.messages[0]?.content?.title}
        </TableCell>
        <TableCell className="font-semibold">
          {getProposalStatusLabel(proposalStatus)}
        </TableCell>
        <TableCell className="font-semibold">
          {dayDifferenceCounter(proposal?.voting_end_time)}
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
