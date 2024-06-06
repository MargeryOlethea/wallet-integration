import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { handleInput } from "@/utils/handleInput";
import { Dispatch, SetStateAction } from "react";

interface DelegateAmountCardProps {
  delegateAmount: string | number;
  balanceAmount: string | number;
  denom: string | null;
  setDelegateAmount: Dispatch<SetStateAction<string>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

function DelegateAmountCard({
  delegateAmount,
  balanceAmount,
  denom,
  setDelegateAmount,
  setShowAlert,
}: DelegateAmountCardProps) {
  return (
    <>
      <Card className="my-2">
        <CardHeader className="flex flex-row justify-between gap-5">
          <input
            value={delegateAmount}
            onChange={(e) =>
              handleInput({
                value: e.target.value,
                denom: denom!,
                balanceAmount: balanceAmount,
                setShowAlert: setShowAlert,
                setAmount: setDelegateAmount,
              })
            }
            type="number"
            placeholder="your staking amount"
            className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-full font-semibold text-lg placeholder:font-light placeholder:text-sm"
          />
          <Badge variant="secondary">{denom}</Badge>
        </CardHeader>
      </Card>
    </>
  );
}

export default DelegateAmountCard;
