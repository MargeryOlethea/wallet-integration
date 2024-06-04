import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

interface DelegateAmountCardProps {
  delegateAmount: string;
  handleInput: (value: string) => void;
  denom: string | null;
}

function DelegateAmountCard({
  delegateAmount,
  handleInput,
  denom,
}: DelegateAmountCardProps) {
  return (
    <>
      <Card className="my-2">
        <CardHeader className="flex flex-row justify-between gap-5">
          <input
            value={delegateAmount}
            onChange={(e) => handleInput(e.target.value)}
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
