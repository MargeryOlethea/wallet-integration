import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

function LoadingMyValidatorPage() {
  return (
    <>
      <Card className="my-5">
        <Table className="bg-gradient-to-r from-blue-50">
          <TableHeader>
            <TableRow>
              <TableHead>Validator</TableHead>
              <TableHead>Amount Staked</TableHead>
              <TableHead>Claimable Rewards</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {"12".split("").map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="bg-slate-200 rounded-full h-6 w-20" />
                </TableCell>
                <TableCell className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Skeleton className="bg-slate-200 h-6 w-14" />
                    <Skeleton className="bg-slate-200 rounded-full h-5 w-14" />
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  <div className="flex items-center gap-2">
                    <Skeleton className="bg-slate-200 h-6 w-14" />
                    <Skeleton className="bg-slate-200 rounded-full h-5 w-14" />
                  </div>
                </TableCell>

                <TableCell>
                  <Skeleton className="bg-slate-200 h-10 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default LoadingMyValidatorPage;
