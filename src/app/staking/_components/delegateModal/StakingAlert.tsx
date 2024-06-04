import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TbAlertCircleFilled } from "react-icons/tb";

function StakingAlert() {
  return (
    <>
      {/* staking alert */}
      <Alert className="bg-red-50 border-red-200 text-red-700">
        <AlertTitle className="flex gap-1 items-center text-sm">
          <TbAlertCircleFilled size="20" />
          Staking will lock your funds for 2 days
        </AlertTitle>
        <AlertDescription className="text-xs">
          You will need to undelegate in order for your staked assets to be
          liquid again. This process will take 2 days to complete.
        </AlertDescription>
      </Alert>
    </>
  );
}

export default StakingAlert;
