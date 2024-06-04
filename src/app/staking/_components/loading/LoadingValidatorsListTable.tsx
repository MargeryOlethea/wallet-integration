import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingValidatorsListTable({ rows }: { rows: number }) {
  const loadingRows = Array.from({ length: rows }, (_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-16 mt-1" />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="rounded-full h-5 w-14" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-14" />
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Validator</TableHead>
              <TableHead>Voting Power</TableHead>
              <TableHead>Comission</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{loadingRows}</TableBody>
        </Table>
      </Card>
    </>
  );
}

export default LoadingValidatorsListTable;
