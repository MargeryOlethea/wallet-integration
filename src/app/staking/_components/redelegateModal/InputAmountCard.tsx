import { AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TbAlertCircleFilled } from "react-icons/tb";

interface InputAmountCardProps {
  selectedValidator: string;
  redelegateAmount: string;
  handleInput: (value: string) => void;
  showAlert: boolean;
  denom: string | null;
}

function InputAmountCard({
  selectedValidator,
  redelegateAmount,
  handleInput,
  showAlert,
  denom,
}: InputAmountCardProps) {
  return (
    <>
      <Card className="my-2 w-1/2">
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
              onChange={(e) => handleInput(e.target.value)}
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
