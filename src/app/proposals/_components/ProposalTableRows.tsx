import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
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
  return (
    <>
      <TableRow>
        <TableCell className="font-semibold text-lg max-sm:hidden">
          #{proposal.id}
        </TableCell>
        <TableCell className="max-w-xs font-semibold">
          {proposal?.title || proposal?.messages[0]?.content?.title}
        </TableCell>
        <TableCell className="font-semibold max-md:hidden">
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
