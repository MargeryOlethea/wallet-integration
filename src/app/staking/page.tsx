"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountDashboard from "@/components/stakingPage/AccountDashboard";
import MyValidators from "@/components/stakingPage/MyValidators";
import ValidatorsList from "@/components/stakingPage/ValidatorsList";
import { useWallet } from "@/hooks/useWallet";

function Staking() {
  const { wallet, userAddress } = useWallet();

  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  }
  return (
    <>
      <AccountDashboard />

      <MyValidators />

      <ValidatorsList />
    </>
  );
}

export default Staking;
