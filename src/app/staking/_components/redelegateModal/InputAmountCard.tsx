import { AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { handleInput } from "@/utils/handleInput";
import { Dispatch, SetStateAction } from "react";
import { TbAlertCircleFilled } from "react-icons/tb";

interface InputAmountCardProps {
  selectedValidator: string;
  redelegateAmount: string;
  delegationBalance: string | number;
  denom: string | null;
  setRedelegateAmount: Dispatch<SetStateAction<string>>;
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

function InputAmountCard({
  selectedValidator,
  redelegateAmount,
  delegationBalance,
  denom,
  setRedelegateAmount,
  showAlert,
  setShowAlert,
}: InputAmountCardProps) {
  return (
    <>
      <Card className="my-2 w-1/2 max-md:w-full">
        {" "}
        <CardHeader>
          <CardDescription className="text-xs">Redelegate to:</CardDescription>
          <CardTitle className="text-lg">{selectedValidator}</CardTitle>
          <div className="flex flex-row justify-between gap-5 items-center">
            <input
              type="number"
              placeholder="your redelegate amount"
              className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-full font-semibold text-lg placeholder:font-light placeholder:text-sm"
              value={redelegateAmount}
              onChange={(e) =>
                handleInput({
                  value: e.target.value,
                  denom: denom!,
                  balanceAmount: delegationBalance,
                  setShowAlert: setShowAlert,
                  setAmount: setRedelegateAmount,
                })
              }
            />
            <Badge variant="secondary" className="max-h-6">
              {denom}
            </Badge>
          </div>
          {showAlert && (
            <AlertTitle className="flex gap-1 items-center text-xs text-red-700">
              <TbAlertCircleFilled size="14" />
              <p>Amount can&apos;t be bigger than delegated amount</p>
            </AlertTitle>
          )}
        </CardHeader>
      </Card>
    </>
  );
}

export default InputAmountCard;
