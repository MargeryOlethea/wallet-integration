import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TbAlertCircleFilled } from "react-icons/tb";

function UndelegateAlert() {
  return (
    <>
      <Alert className="bg-red-50 border-red-200 text-red-700">
        <AlertTitle className="flex gap-1 items-center text-sm">
          <TbAlertCircleFilled size="20" />
          Once the unbonding period begin you will:
        </AlertTitle>
        <AlertDescription className="text-xs">
          <ol className="list-disc ml-5">
            <li>not receive staking rewards</li>
            <li>not be able to cancel the unbonding</li>
            <li>need to wait 2 days for the amount to be liquid</li>
          </ol>
        </AlertDescription>
      </Alert>
    </>
  );
}

export default UndelegateAlert;
