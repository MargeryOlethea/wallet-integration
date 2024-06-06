import { ProposalStatus } from "@/helpers/stringModifiers";
import { ProposalItem } from "@/types/proposal.types";
import ProposalTableRows from "./ProposalTableRows";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProposalListTableProps {
  proposals: ProposalItem[];
  proposalStatus: ProposalStatus;
}
function ProposalListTable({
  proposals,
  proposalStatus,
}: ProposalListTableProps) {
  return (
    <>
      <Card className="my-5">
        <Table className="my-2">
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:hidden">#ID</TableHead>
              <TableHead>Proposal</TableHead>
              <TableHead className="max-md:hidden">Status</TableHead>
              <TableHead>End Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals?.map((proposal) => (
              <ProposalTableRows
                key={proposal.id}
                proposal={proposal}
                proposalStatus={proposalStatus}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default ProposalListTable;
