import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useStakingApi } from "@/hooks/useStakingApi";
import toast from "react-hot-toast";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { microCoinConverter } from "@/helpers/integerModifiers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ValidatorItem } from "@/types/validator.types";
import DelegateModal from "./DelegateModal";
import { useModal } from "@/hooks/useModal";

function ValidatorsList() {
  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

  // query
  const [paginationOffset, setPaginationOffset] = useState(0);

  const { getValidatorsList } = useStakingApi();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getValidatorsList(paginationOffset),
    queryKey: ["validatorsList", paginationOffset],
  });

  const paginationLimit = data && data.paginationLimit;

  const validators = data && data.validatorsList.validators;

  // modal handling
  const { setDelegateModalOpen } = useModal();
  const [selectedValidator, setSelectedValidator] =
    useState<ValidatorItem | null>(null);

  const handleOpenModal = (validator: ValidatorItem) => {
    setSelectedValidator(validator);
    setDelegateModalOpen(true);
  };

  // loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // error
  if (error) {
    console.error(error.message);
    toast.error(error.message);
  }

  return (
    <>
      <section className="my-10">
        <h1 className="text-xl">Validators List</h1>

        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Validator</TableHead>
              <TableHead>Voting Power</TableHead>
              <TableHead>Comission</TableHead>
              <TableHead></TableHead>
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
                    {microCoinConverter(+validator.delegator_shares, denom!)}{" "}
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

        <Pagination>
          <PaginationContent className="gap-10">
            <PaginationItem>
              <Button
                variant="secondary"
                disabled={paginationOffset < 1}
                onClick={() =>
                  setPaginationOffset((prev) => prev - paginationLimit!)
                }
              >
                Previous
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="secondary"
                disabled={validators && validators?.length < paginationLimit!}
                onClick={() =>
                  setPaginationOffset((prev) => prev + paginationLimit!)
                }
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
      <DelegateModal validator={selectedValidator!} />
    </>
  );
}

export default ValidatorsList;
