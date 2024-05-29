import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function MyValidators() {
  return (
    <>
      <div className="my-10">
        <h1 className="text-xl">My Validators</h1>

        <Table className="bg-gradient-to-r from-blue-50 my-2">
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
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="./" />
                    <AvatarFallback>EA</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">Earth</p>
                </TableCell>
                <TableCell>0.002 ATOM</TableCell>
                <TableCell>0 ATOM</TableCell>

                <TableCell>
                  <Button>Manage</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default MyValidators;
