import { numberFormatter } from "@/helpers/integerModifiers";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
                <TableHead className="max-md:hidden">Voting Power</TableHead>
                <TableHead className="max-sm:hidden">Comission</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredValidators?.map((validator) => (
                <TableRow key={validator.operator_address}>
                  <TableCell>
                    <p className="font-semibold text-md max-sm:text-lg">
                      {validator.description.moniker}
                    </p>
                    <a
                      className="font-semilight text-xs hover:text-blue-500 max-lg:hidden"
                      href={validator.description.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {validator.description.website}
                    </a>
                    <Button
                      onClick={() =>
                        setSelectedValidator(validator.description.moniker)
                      }
                      className="lg:hidden my-2 w-full"
                      size="sm"
                    >
                      Select
                    </Button>
                  </TableCell>
                  <TableCell className="max-md:hidden">
                    <div className="text-right pr-10 w-4/5 font-semibold whitespace-nowrap">
                      {numberFormatter(+validator.delegator_shares, denom!)}{" "}
                      <Badge className="ml-2 max-lg:hidden">{denom}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-sm:hidden">
                    <div className="text-right pr-10 w-2/3 font-semibold">
                      {Math.floor(
                        +validator.commission.commission_rates.rate * 100,
                      )}
                      %
                    </div>
                  </TableCell>

                  <TableCell className="max-sm:hidden">
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
