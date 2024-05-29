import { useCosmjs } from "@/hooks/useCosmjs";
import AccountBalanceCard from "./AccountBalanceCard";
import AvailableBalanceCard from "./AvailableBalanceCard";
import RewardBalanceCard from "./RewardBalanceCard";
import StakeBalanceCard from "./StakeBalanceCard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Coin } from "@cosmjs/proto-signing";

function AccountDashboard() {
  const { getStakeBalances, getAvailableBalances } = useCosmjs();

  const {
    data: availableBalances,
    error: availableError,
    isLoading: availableLoading,
  } = useQuery({
    queryKey: ["availableBalances"],
    queryFn: getAvailableBalances,
  });

  const firstBalance = (availableBalances && availableBalances[0]) || {
    amount: "",
    denom: "",
  };

  const {
    data: stakeBalances,
    error: stakeError,
    isLoading: stakeLoading,
  } = useQuery({
    queryKey: ["stakeBalances"],
    queryFn: getStakeBalances,
  });

  if (availableLoading || stakeLoading) {
    return <p>Loading...</p>;
  }

  if (availableError || stakeError) {
    console.error(availableError || stakeError);
    toast.error(availableError!.message || stakeError!.message);
  }

  return (
    <>
      <div className="grid grid-cols-9 gap-5">
        <AccountBalanceCard amount="" denom="" />
        <AvailableBalanceCard
          amount={firstBalance?.amount}
          denom={firstBalance?.denom}
        />
        <StakeBalanceCard
          amount={stakeBalances?.amount}
          denom={stakeBalances?.denom}
        />
        <RewardBalanceCard amount="" denom="" />
      </div>
    </>
  );
}

export default AccountDashboard;
