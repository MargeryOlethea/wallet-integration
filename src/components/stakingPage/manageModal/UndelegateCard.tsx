import { AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useCosmjs } from "@/hooks/useCosmjs";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { TbAlertCircleFilled } from "react-icons/tb";
import { UserDelegationData } from "../ManageModal";
interface UndelegateCardProps {
  userDelegationData: UserDelegationData;
  denom: string | null;
  undelegateAmount: string;
  handleInput: (value: string) => void;
  showAlert: boolean;
}

function UndelegateCard({
  userDelegationData,
  denom,
  undelegateAmount,
  handleInput,
  showAlert,
}: UndelegateCardProps) {
  const { undelegateToken } = useCosmjs();

  const realAmount =
    denom == "DYM"
      ? (+undelegateAmount * 1_000_000_000_000_000).toString()
      : (+undelegateAmount * 1_000_000).toString();

  console.log({ realAmount, userDelegationData });

  const undelegateMutation: UseMutationResult<DeliverTxResponse, Error, void> =
    useMutation({
      mutationFn: () =>
        undelegateToken(
          userDelegationData?.validator?.operator_address || "",
          realAmount,
        ),
      onSuccess: (data) => {
        toast.success(`Undelegate successful!`);
        window.location.reload();
      },
      onError: (error) => {
        toast.error(`Failed to undelegate token: ${error.message}`);
        console.error(error.message);
      },
    });
  return (
    <>
      <Card className="my-2">
        <CardHeader>
          <p className="text-xs">Undelegate Tokens:</p>
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <input
                value={undelegateAmount}
                onChange={(e) => handleInput(e.target.value)}
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
