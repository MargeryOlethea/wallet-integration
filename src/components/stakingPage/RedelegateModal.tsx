import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/useModal";
import { DelegationResponse } from "@/types/delegations.types";
import { ValidatorItem } from "@/types/validator.types";
import { Reward } from "@/types/reward.types";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import {
  microCoinConverter,
  numberFormatter,
} from "@/helpers/integerModifiers";
import { useStakingApi } from "@/hooks/useStakingApi";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { TbAlertCircleFilled } from "react-icons/tb";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { useCosmjs } from "@/hooks/useCosmjs";

interface RedelegateModalProps {
  userDelegationData: UserDelegationData;
}

export interface UserDelegationData {
  delegation: DelegationResponse;
  validator: ValidatorItem;
  reward: Reward;
}

export default function RedelegateModal({
  userDelegationData,
}: RedelegateModalProps) {
  // modal handling
  const { isRedelegateModalOpen, setRedelegateModalOpen } = useModal();
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setRedelegateModalOpen(false);
    setSearch("");
    setSelectedValidator("...");
  };

  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

  // get validators list
  const { getValidatorsList } = useStakingApi();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getValidatorsList(),
    queryKey: ["validatorsList"],
  });

  const validators = data && data.validators;

  // handle search
  const [search, setSearch] = useState("");
  const filteredValidators = search
    ? validators &&
      validators.filter((validator) =>
        new RegExp(search.trim(), "i").test(validator.description.moniker),
      )
    : validators;

  // handle select validator
  const [selectedValidator, setSelectedValidator] = useState("...");

  // handle redelegate amount
  const [redelegateAmount, setRedelegateAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleInput = (value: string) => {
    const delegationBalance =
      denom == "DYM"
        ? +userDelegationData?.delegation?.balance?.amount /
          1_000_000_000_000_000
        : +userDelegationData?.delegation?.balance?.amount / 1_000_000;
    if (+value > delegationBalance) {
      setShowAlert(true);
      setRedelegateAmount(value);
    } else {
      setShowAlert(false);
      setRedelegateAmount(value);
    }
  };

  // handle redelegate
  const realAmount =
    denom == "DYM"
      ? (+redelegateAmount * 1_000_000_000_000_000).toString()
      : (+redelegateAmount * 1_000_000).toString();

  const sourceValidator =
    userDelegationData && userDelegationData.validator.operator_address;
  const destinationValidator =
    validators &&
    validators.find(
      (validator) => validator.description.moniker === selectedValidator,
    )?.operator_address;

  const { redelegateToken } = useCosmjs();
  const redelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        redelegateToken(sourceValidator, destinationValidator!, realAmount),
      onSuccess: (data) => {
        toast.success(`Redelegate successful!`);
        window.location.reload();
      },
      onError: (error) => {
        toast.error(`Failed to redelegate token: ${error.message}`);
        console.error(error.message);
      },
    });

  if (!isRedelegateModalOpen) {
    return null;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <Card className="relative w-2/3 p-5 flex flex-col justify-between">
        {/* close button */}
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
          onClick={handleCloseModal}
        >
          <IoClose size="25" />
        </button>

        {/* header */}
        <CardHeader>
          <CardTitle>Redelegate Token</CardTitle>

          {/* commission */}
        </CardHeader>
        <CardContent>
          {/* search */}
          <Input
            placeholder="Search validator by name..."
            type="text"
            className="mb-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {/* scrollable table */}
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
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
          </ScrollArea>

          {/* bottom section */}
          <div className="flex gap-5">
            {/* delegate */}
            <Card className="my-2 w-1/2">
              {" "}
              <CardHeader>
                <CardDescription className="text-xs">
                  Redelegate from:
                </CardDescription>
                <CardTitle className="text-lg">
                  {userDelegationData.validator.description.moniker}
                </CardTitle>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-sm">
                    Staked Balances:{" "}
                    <span className="font-semibold text-lg">
                      {microCoinConverter(
                        +userDelegationData.delegation.balance.amount,
                        denom!,
                      )}
                    </span>
                  </p>

                  <Badge variant="secondary">{denom}</Badge>
                </div>
              </CardHeader>
            </Card>

            {/* input amount */}
            <Card className="my-2 w-1/2">
              {" "}
              <CardHeader>
                <CardDescription className="text-xs">
                  Redelegate to:
                </CardDescription>
                <CardTitle className="text-lg">{selectedValidator}</CardTitle>
                <div className="flex flex-row justify-between gap-5">
                  <input
                    type="number"
                    placeholder="your redelegate amount"
                    className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-full font-semibold text-lg placeholder:font-light placeholder:text-sm"
                    value={redelegateAmount}
                    onChange={(e) => handleInput(e.target.value)}
                  />
                  <Badge variant="secondary">{denom}</Badge>
                </div>
                {showAlert && (
                  <AlertTitle className="flex gap-1 items-center text-xs text-red-700">
                    <TbAlertCircleFilled size="14" />
                    <p>Amount can&apos;t be bigger than delegated amount</p>
                  </AlertTitle>
                )}
              </CardHeader>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            disabled={
              showAlert ||
              selectedValidator === "..." ||
              +redelegateAmount <= 0 ||
              redelegateMutation.isPending
            }
            onClick={() => redelegateMutation.mutate()}
          >
            {redelegateMutation.isPending
              ? "Processing..."
              : "Redelegate Tokens"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
