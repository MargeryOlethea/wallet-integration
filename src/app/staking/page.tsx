"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountBalanceCard from "@/components/staking-page/AccountBalanceCard";
import AvailableBalanceCard from "@/components/staking-page/AvailableBalanceCard";
import RewardBalanceCard from "@/components/staking-page/RewardBalanceCard";
import StakeBalanceCard from "@/components/staking-page/StakeBalanceCard";
import { useCosmjs } from "@/hooks/useCosmJs";
import { useWallet } from "@/hooks/useWallet";
import { useEffect, useState } from "react";

function Staking() {
  const { wallet, userAddress } = useWallet();

  const [balances, setBalances] = useState();
  const { getBalances } = useCosmjs();

  useEffect(() => {
    const getBalance = async () => {
      const data = await getBalances();
      console.log(data, "ini data yg didapetin");
    };

    getBalance();
  }, [wallet, userAddress, getBalances]);

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
