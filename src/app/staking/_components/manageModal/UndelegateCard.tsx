import { AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { TbAlertCircleFilled } from "react-icons/tb";
import { UserDelegationData } from "../ManageModal";
import { useUndelegateToken } from "@/hooks/useReactMutation";
import { coinToMicroCoin } from "@/helpers/integerModifiers";
import { Dispatch, SetStateAction } from "react";
import { handleInput } from "@/utils/handleInput";

interface UndelegateCardProps {
  userDelegationData: UserDelegationData;
  denom: string | null;
  delegationBalance: string | number;
  undelegateAmount: string;
  setUndelegateAmount: Dispatch<SetStateAction<string>>;
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

function UndelegateCard({
  userDelegationData,
  denom,
  delegationBalance,
  undelegateAmount,
  setUndelegateAmount,
  showAlert,
  setShowAlert,
}: UndelegateCardProps) {
  const realAmount = coinToMicroCoin(+undelegateAmount, denom!).toString();

  const undelegateMutation = useUndelegateToken(
    userDelegationData?.validator?.operator_address || "",
    realAmount,
  );
  return (
    <>
      <Card className="my-2">
        <CardHeader>
          <p className="text-xs">Undelegate Tokens:</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <input
                value={undelegateAmount}
                onChange={(e) =>
                  handleInput({
                    value: e.target.value,
                    denom: denom!,
                    balanceAmount: delegationBalance,
                    setShowAlert: setShowAlert,
                    setAmount: setUndelegateAmount,
                  })
                }
                type="number"
                placeholder="your amount"
                className="focus:border-transparent focus:outline-none active:outline-none active:border-none bg-transparent w-1/2 font-semibold text-lg placeholder:font-light placeholder:text-sm"
              />
              <Badge variant="secondary" className="max-h-6">
                {denom}
              </Badge>
            </div>
            <Button
              disabled={showAlert || undelegateMutation.isPending}
              onClick={() => undelegateMutation.mutate()}
            >
              {undelegateMutation.isPending ? "Processing..." : "Undelegate"}
            </Button>
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

export default UndelegateCard;
