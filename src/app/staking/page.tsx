"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountBalanceCard from "@/components/staking-page/AccountBalanceCard";
import AvailableBalanceCard from "@/components/staking-page/AvailableBalanceCard";
import RewardBalanceCard from "@/components/staking-page/RewardBalanceCard";
import StakeBalanceCard from "@/components/staking-page/StakeBalanceCard";
import { useWallet } from "@/hooks/useWallet";

function Staking() {
  const { wallet, userAddress } = useWallet();

  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  } else
    return (
      <>
        <div className="grid grid-cols-9 gap-5">
          <AccountBalanceCard />
          <AvailableBalanceCard />
          <StakeBalanceCard />
          <RewardBalanceCard />
        </div>
      </>
    );
}

export default Staking;
