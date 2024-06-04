import { useCosmjs } from "@/hooks/useCosmjs";
import AccountBalanceCard from "./accountDashboard/AccountBalanceCard";
import AvailableBalanceCard from "./accountDashboard/AvailableBalanceCard";
import RewardBalanceCard from "./accountDashboard/RewardBalanceCard";
import StakeBalanceCard from "./accountDashboard/StakeBalanceCard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { microCoinConverter } from "@/helpers/integerModifiers";
import { useWallet } from "@/hooks/useWallet";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { useMemo } from "react";
import { useDistributionApi } from "@/hooks/useDistributionApi";

function AccountDashboard() {
  //  get functions for fetching data
  const { getStakeBalance, getAvailableBalance } = useCosmjs();
  const { getRewardsByDelegator } = useDistributionApi();
  const { chainId, userAddress } = useWallet();

  // setup denom
  const coinDenom =
    (chainId && chainInfoMap[chainId].currencies[0].coinDenom) || "";

  // fetching available balance
  const {
    data: availableBalance,
    error: availableError,
    isLoading: availableLoading,
  } = useQuery({
    queryKey: ["availableBalance", userAddress, chainId],
    queryFn: getAvailableBalance,
    enabled: !!userAddress && !!chainId,
  });

  // fetching stake balance
  const {
    data: stakeBalance,
    error: stakeError,
    isLoading: stakeLoading,
  } = useQuery({
    queryKey: ["stakeBalance", userAddress, chainId],
    queryFn: getStakeBalance,
    enabled: !!userAddress && !!chainId,
  });

  // fetching rewards balance
  const {
    data: rewardsBalance,
    isLoading: rewardsLoading,
    error: rewardsError,
  } = useQuery({
    queryFn: getRewardsByDelegator,
    queryKey: ["rewardsBalance", userAddress, chainId],
    enabled: !!userAddress && !!chainId,
  });
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

  return (
    <>
      <div className="grid grid-cols-4 gap-5">
        <AccountBalanceCard
          amount={microCoinConverter(
            Number(totalBalance?.amount || 0),
            coinDenom,
          )}
          denom={coinDenom}
          loading={availableLoading || stakeLoading || rewardsLoading}
        />
        <AvailableBalanceCard
          amount={microCoinConverter(
            Number(availableBalance?.amount || 0),
            coinDenom,
          )}
          denom={coinDenom}
          loading={availableLoading}
        />
        <StakeBalanceCard
          amount={microCoinConverter(
            Number(stakeBalance?.amount || 0),
            coinDenom,
          )}
          denom={coinDenom}
          loading={stakeLoading}
        />
        <RewardBalanceCard
          amount={microCoinConverter(+rewardsAmount, coinDenom)}
          denom={coinDenom}
          loading={rewardsLoading}
        />
      </div>
    </>
  );
}

export default AccountDashboard;
