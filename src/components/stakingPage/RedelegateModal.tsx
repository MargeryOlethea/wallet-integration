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
import { microCoinConverter } from "@/helpers/integerModifiers";

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
  };

  // get denom
  const { chainId } = useWallet();
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

  if (!isRedelegateModalOpen) {
    return null;
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
                {"12345".split("").map((i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <p className="font-semibold text-md">earth</p>
                      <a
                        className="font-semilight text-xs hover:text-blue-500"
                        href="validator.description.website"
                        target="_blank"
                        rel="noreferrer"
                      >
                        www.disni.com
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="text-right pr-10 w-2/3 font-semibold">
                        123.456.789
                        <Badge className="ml-2">atom</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-right pr-10 w-2/3 font-semibold">
                        10%
                      </div>
                    </TableCell>

                    <TableCell>
                      <Button>Select</Button>
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
                <CardTitle className="text-lg">fire</CardTitle>
                <div className="flex flex-row justify-between gap-5">
                  <input
                    type="number"
                    placeholder="your redelegate amount"
                    className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-full font-semibold text-lg placeholder:font-light placeholder:text-sm"
                  />
                  <Badge variant="secondary">{denom}</Badge>
                </div>
              </CardHeader>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Redelegate Tokens</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
