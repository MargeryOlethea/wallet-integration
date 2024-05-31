import { useCosmjs } from "@/hooks/useCosmjs";
import AccountBalanceCard from "./AccountBalanceCard";
import AvailableBalanceCard from "./AvailableBalanceCard";
import RewardBalanceCard from "./RewardBalanceCard";
import StakeBalanceCard from "./StakeBalanceCard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useMemo } from "react";
import { useDistributionApi } from "@/hooks/useDistributionApi";

function AccountDashboard() {
  //  get functions for fetching data
  const { getStakeBalances, getAvailableBalances } = useCosmjs();
  const { getRewardsByDelegator } = useDistributionApi();
  const { chainId } = useWallet();

  // setup denom
  const coinDenom =
    (chainId && chainInfoMap[chainId].currencies[0].coinDenom) || "";

  // fetching available balance
  const {
    data: availableBalances,
    error: availableError,
    isLoading: availableLoading,
  } = useQuery({
    queryKey: ["availableBalances"],
    queryFn: getAvailableBalances,
  });

  // fetching stake balance
  const {
    data: stakeBalances,
    error: stakeError,
    isLoading: stakeLoading,
  } = useQuery({
    queryKey: ["stakeBalances"],
    queryFn: getStakeBalances,
  });

  // fetching rewards balance
  const {
    data: rewardsBalances,
    isLoading: rewardsLoading,
    error: rewardsError,
  } = useQuery({
    queryFn: getRewardsByDelegator,
    queryKey: ["rewardsBalance"],
  });
  const rewardsAmount = rewardsBalances?.total[0]?.amount ?? 0;

  // extracting available balance data
  //TODO: Fix the exhaustive-deps warning
  const firstBalance = (availableBalances && availableBalances[0]) || {
    amount: "",
  };

  // calculating total balance
  const totalBalance = useMemo(() => {
    const firstAmount = firstBalance?.amount || 0;
    const stakeAmount = stakeBalances?.amount || 0;

    const amount = Number(firstAmount) + Number(stakeAmount);

    if (amount === 0) {
      return { amount: 0 };
    }

    return { amount };
  }, [firstBalance, stakeBalances]);

  if (availableLoading || stakeLoading || rewardsLoading) {
    return <p>Loading...</p>;
  }

  if (availableError || stakeError || rewardsError) {
    console.error(availableError || stakeError || rewardsError);
    toast.error(
      availableError?.message ||
        stakeError?.message ||
        rewardsError?.message ||
        "An error occured.",
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        <AccountBalanceCard
          amount={microCoinConverter(
            Number(totalBalance?.amount || 0),
            coinDenom,
          )}
          denom={coinDenom}
        />
        <AvailableBalanceCard
          amount={microCoinConverter(
            Number(firstBalance?.amount || 0),
            coinDenom,
          )}
          denom={coinDenom}
        />
        <StakeBalanceCard
          amount={microCoinConverter(
            Number(stakeBalances?.amount || 0),
            coinDenom,
          )}
          denom={coinDenom}
        />
        <RewardBalanceCard
          amount={microCoinConverter(+rewardsAmount, coinDenom)}
          denom={coinDenom}
        />
      </div>
    </>
  );
}

export default AccountDashboard;
