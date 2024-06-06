import AccountBalanceCard from "./accountDashboard/AccountBalanceCard";
import AvailableBalanceCard from "./accountDashboard/AvailableBalanceCard";
import RewardBalanceCard from "./accountDashboard/RewardBalanceCard";
import StakeBalanceCard from "./accountDashboard/StakeBalanceCard";
import toast from "react-hot-toast";
import { microCoinToCoin } from "@/helpers/integerModifiers";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useMemo } from "react";
import {
  useAvailableBalance,
  useRewardBalance,
  useStakeBalance,
} from "@/hooks/useReactQuery";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function AccountDashboard() {
  const { chainId } = useWallet();

  // setup denom
  const coinDenom =
    (chainId && chainInfoMap[chainId].currencies[0].coinDenom) || "";

  // fetching available balance
  const {
    data: availableBalance,
    error: availableError,
    isLoading: availableLoading,
  } = useAvailableBalance();

  // fetching stake balance
  const {
    data: stakeBalance,
    error: stakeError,
    isLoading: stakeLoading,
  } = useStakeBalance();

  // fetching rewards balance
  const {
    data: rewardsBalance,
    isLoading: rewardsLoading,
    error: rewardsError,
  } = useRewardBalance();
  const rewardsAmount = rewardsBalance?.total[0]?.amount ?? 0;

  // calculating total balance
  const totalBalance = useMemo(() => {
    const availableAmount = availableBalance?.amount || 0;
    const stakeAmount = stakeBalance?.amount || 0;

    const amount = Number(availableAmount) + Number(stakeAmount);

    if (amount === 0) {
      return { amount: 0 };
    }

    return { amount };
  }, [availableBalance, stakeBalance]);

  if (availableError || stakeError || rewardsError) {
    console.error(availableError || stakeError || rewardsError);
    toast.error(
      availableError?.message ||
        stakeError?.message ||
        rewardsError?.message ||
        "An error occured.",
    );
  }

  const { isMobile } = useMediaQuery();
  const totalAmount = isMobile
    ? microCoinToCoin(Number(totalBalance?.amount || 0), coinDenom, 2)
    : microCoinToCoin(Number(totalBalance?.amount || 0), coinDenom);

  const availableAmount = isMobile
    ? microCoinToCoin(Number(availableBalance?.amount || 0), coinDenom, 2)
    : microCoinToCoin(Number(availableBalance?.amount || 0), coinDenom);

  const rewardAmount = isMobile
    ? microCoinToCoin(+rewardsAmount, coinDenom, 2)
    : microCoinToCoin(+rewardsAmount, coinDenom);

  const stakeAmount = isMobile
    ? microCoinToCoin(Number(stakeBalance?.amount || 0), coinDenom, 2)
    : microCoinToCoin(Number(stakeBalance?.amount || 0), coinDenom);
  return (
    <>
      <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2">
        <AccountBalanceCard
          amount={totalAmount}
          denom={coinDenom}
          loading={availableLoading || stakeLoading || rewardsLoading}
        />
        <AvailableBalanceCard
          amount={availableAmount}
          denom={coinDenom}
          loading={availableLoading}
        />
        <StakeBalanceCard
          amount={stakeAmount}
          denom={coinDenom}
          loading={stakeLoading}
        />
        <RewardBalanceCard
          amount={rewardAmount}
          denom={coinDenom}
          loading={rewardsLoading}
        />
      </div>
    </>
  );
}

export default AccountDashboard;
