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
import { Badge } from "../ui/badge";

function ValidatorsList() {
  return (
    <>
      <div className="my-10">
        <h1 className="text-xl">Validators List</h1>

        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Validator</TableHead>
              <TableHead>Voting Power</TableHead>
              <TableHead>Comission</TableHead>
              <TableHead>APR</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {"1234".split("").map((i) => (
              <TableRow key={i}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="./" />
                    <AvatarFallback>EA</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">Earth</p>
                </TableCell>
                <TableCell>300,036,607.3671 ATOM</TableCell>
                <TableCell>20%</TableCell>
                <TableCell>
                  <Badge>25.21%</Badge>
                </TableCell>
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

export default ValidatorsList;
