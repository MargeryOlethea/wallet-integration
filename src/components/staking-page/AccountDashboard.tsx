import { useCosmjs } from "@/hooks/useCosmjs";
import AccountBalanceCard from "./AccountBalanceCard";
import AvailableBalanceCard from "./AvailableBalanceCard";
import RewardBalanceCard from "./RewardBalanceCard";
import StakeBalanceCard from "./StakeBalanceCard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { splitMicroCoin } from "@/helpers/stringModifiers";

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

  const totalBalance = firstBalance &&
    stakeBalances && {
      amount: +firstBalance.amount + +stakeBalances.amount,
      denom: firstBalance.denom,
    };

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
        <AccountBalanceCard
          amount={microCoinConverter(Number(totalBalance?.amount || 0))}
          denom={splitMicroCoin(totalBalance?.denom || "")}
        />
        <AvailableBalanceCard
          amount={microCoinConverter(Number(firstBalance?.amount || 0))}
          denom={splitMicroCoin(firstBalance?.denom || "")}
        />
        <StakeBalanceCard
          amount={microCoinConverter(Number(stakeBalances?.amount || 0))}
          denom={splitMicroCoin(stakeBalances?.denom || "")}
        />
        <RewardBalanceCard amount={0} denom="" />
      </div>
    </>
  );
}

export default AccountDashboard;
