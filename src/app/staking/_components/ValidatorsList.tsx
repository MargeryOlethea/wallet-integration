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
import { chainInfoMap } from "@/constants/chainInfoMap";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { ValidatorItem } from "@/types/validator.types";
import DelegateModal from "./DelegateModal";
import { useModal } from "@/hooks/useModal";
import { Card } from "@/components/ui/card";
import BottomPagination from "@/components/BottomPagination";
import LoadingValidatorsListTable from "./loading/LoadingValidatorsListTable";
import NoDataFound from "@/components/NoDataFound";
import { useValidatorsList } from "@/hooks/useReactQuery";

function ValidatorsList() {
  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

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
                      <div className="text-right pr-10 w-2/3 font-semibold">
                        {microCoinConverter(
                          +validator.delegator_shares,
                          denom!,
                        )}{" "}
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
