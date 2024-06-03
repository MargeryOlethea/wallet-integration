import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

function LoadingRedelegateValidatorsListTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Validator</TableHead>
            <TableHead>Voting Power</TableHead>
            <TableHead>Comission</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {"123".split("").map((i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-8 w-32 mb-1" />
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <div className="flex gap-1 items-center">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-10" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-10 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default LoadingRedelegateValidatorsListTable;
