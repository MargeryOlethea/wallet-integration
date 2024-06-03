import { numberFormatter } from "@/helpers/integerModifiers";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import LoadingRedelegateValidatorsListTable from "../loading/LoadingRedelegateValidatorsListTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ValidatorItem } from "@/types/validator.types";

interface ScrollableValidatorsTableProps {
  filteredValidators: ValidatorItem[] | undefined;
  isLoading: boolean;
  setSelectedValidator: (validator: string) => void;
  denom: string;
}
function ScrollableValidatorsTable({
  filteredValidators,
  isLoading,
  setSelectedValidator,
  denom,
}: ScrollableValidatorsTableProps) {
  return (
    <>
      {/* scrollable table */}
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        {isLoading && <LoadingRedelegateValidatorsListTable />}
        {!isLoading && filteredValidators && (
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
              {filteredValidators?.map((validator) => (
                <TableRow key={validator.operator_address}>
                  <TableCell>
                    <p className="font-semibold text-md">
                      {validator.description.moniker}
                    </p>
                    <a
                      className="font-semilight text-xs hover:text-blue-500"
                      href={validator.description.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {validator.description.website}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="text-right pr-10 w-4/5 font-semibold">
                      {numberFormatter(+validator.delegator_shares, denom!)}{" "}
                      <Badge className="ml-2">{denom}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-right pr-10 w-2/3 font-semibold">
                      {Math.floor(
                        +validator.commission.commission_rates.rate * 100,
                      )}
                      %
                    </div>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() =>
                        setSelectedValidator(validator.description.moniker)
                      }
                    >
                      Select
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </ScrollArea>
    </>
  );
}

export default ScrollableValidatorsTable;
