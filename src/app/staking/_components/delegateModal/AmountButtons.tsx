import { Button } from "@/components/ui/button";

interface AmountButtonsProps {
  handleAmountButton: (amount: "1/3" | "1/2" | "MAX") => void;
}
function AmountButtons({ handleAmountButton }: AmountButtonsProps) {
  return (
    <>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => handleAmountButton("1/3")}
        >
          1/3
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => handleAmountButton("1/2")}
        >
          1/2
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => handleAmountButton("MAX")}
        >
          MAX
        </Button>
      </div>
    </>
  );
}

export default AmountButtons;
