"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountBalanceCard from "@/components/staking-page/AccountBalanceCard";
import AvailableBalanceCard from "@/components/staking-page/AvailableBalanceCard";
import RewardBalanceCard from "@/components/staking-page/RewardBalanceCard";
import StakeBalanceCard from "@/components/staking-page/StakeBalanceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWallet } from "@/providers/WalletProvider";

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
