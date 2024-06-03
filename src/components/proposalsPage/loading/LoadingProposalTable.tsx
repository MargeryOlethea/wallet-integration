import { Card } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

function LoadingProposalTable({ rows }: { rows: number }) {
  const loadingRows = Array.from({ length: rows }, (_, i) => {
    return (
      <TableRow key={i}>
        <TableCell className="font-semibold text-lg">
          <Skeleton className="h-8 w-12" />
        </TableCell>
        <TableCell className="max-w-xs font-semibold">
          <Skeleton className="h-6 w-32" />
        </TableCell>
        <TableCell className="font-semibold">
          <Skeleton className="h-6 w-14" />
        </TableCell>
        <TableCell className="font-semibold">
          <Skeleton className="h-6 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-10 w-20" />
        </TableCell>
      </TableRow>
    );
  });
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
          <TableBody>{loadingRows}</TableBody>
        </Table>
      </Card>
    </>
  );
}

export default LoadingProposalTable;
