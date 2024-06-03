import { AlertTitle } from "@/components/ui/alert";
import { TbAlertCircleFilled } from "react-icons/tb";

function InsufficientBalanceAlert({ showAlert }: { showAlert: boolean }) {
  return (
    <>
      <AlertTitle className="flex gap-1 items-center text-xs text-red-700 pl-2">
        {showAlert && (
          <>
            <TbAlertCircleFilled size="14" />
            <p>Insufficient Balance</p>
          </>
        )}
      </AlertTitle>
    </>
  );
}

export default InsufficientBalanceAlert;
