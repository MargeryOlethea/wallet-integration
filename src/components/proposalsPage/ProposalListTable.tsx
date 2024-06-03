import { ProposalStatus } from "@/helpers/stringModifiers";
import { ProposalItem } from "@/types/proposal.types";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ProposalTableRows from "./ProposalTableRows";

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
              <TableHead>#ID</TableHead>
              <TableHead>Proposal</TableHead>
              <TableHead>Status</TableHead>
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
