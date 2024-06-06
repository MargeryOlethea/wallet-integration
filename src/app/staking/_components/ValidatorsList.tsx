import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { microCoinToCoin, numberFormatter } from "@/helpers/integerModifiers";
import { ValidatorItem } from "@/types/validator.types";
import DelegateModal from "./DelegateModal";
import { useModal } from "@/hooks/useModal";
import { Card } from "@/components/ui/card";
import BottomPagination from "@/components/BottomPagination";
import LoadingValidatorsListTable from "./loading/LoadingValidatorsListTable";
import NoDataFound from "@/components/NoDataFound";
import { useValidatorsList } from "@/hooks/useReactQuery";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function ValidatorsList() {
  // get denom
  const { denom } = useWallet();

  // query
  const [paginationOffset, setPaginationOffset] = useState(0);
  const paginationLimit = 10;

  const { data, isLoading, error } = useValidatorsList(
    paginationOffset,
    paginationLimit,
  );

  const validators = data && data.validators;

  // modal handling
  const { setDelegateModalOpen } = useModal();
  const [selectedValidator, setSelectedValidator] =
    useState<ValidatorItem | null>(null);

  const handleOpenModal = (validator: ValidatorItem) => {
    setSelectedValidator(validator);
    setDelegateModalOpen(true);
  };

  // error
  if (error) {
    console.error(error.message);
    toast.error(error.message);
  }

  // media query
  const { isMobile, isTablet, isDesktop } = useMediaQuery();

  return (
    <>
      <section className="my-10">
        <h1 className="text-xl">Validators List</h1>

        {isLoading && <LoadingValidatorsListTable rows={paginationLimit} />}
        {!isLoading && (!validators || validators.length === 0) && (
          <NoDataFound />
        )}

        {!isLoading && validators && validators.length > 0 && (
          <Card className="my-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Validator</TableHead>
                  <TableHead>Voting Power</TableHead>
                  <TableHead>Comission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {validators?.map((validator) => (
                  <TableRow key={validator.operator_address}>
                    <TableCell>
                      <p className="font-semibold text-md">
                        {validator.description.moniker}
                      </p>
                      {isDesktop && (
                        <a
                          className="font-semilight text-xs hover:text-blue-500"
                          href={validator.description.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {validator.description.website}
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-right pr-10 max-lg:w-full w-2/3 font-semibold whitespace-nowrap">
                        {isMobile || isTablet
                          ? numberFormatter(+validator.delegator_shares, denom!)
                          : microCoinToCoin(
                              +validator.delegator_shares,
                              denom!,
                            )}{" "}
                        <Badge className="ml-2 max-md:hidden">{denom}</Badge>
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
                      <Button onClick={() => handleOpenModal(validator)}>
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}

        <BottomPagination
          paginationOffset={paginationOffset}
          setPaginationOffset={setPaginationOffset}
          data={validators}
          paginationLimit={paginationLimit}
        />
      </section>
      <DelegateModal validator={selectedValidator!} />
    </>
  );
}

export default ValidatorsList;
