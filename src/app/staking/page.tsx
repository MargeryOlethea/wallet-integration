"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";
import AccountDashboard from "./_components/AccountDashboard";
import MyValidators from "./_components/MyValidators";
import ValidatorsList from "./_components/ValidatorsList";

function Staking() {
  const { showConnectToWallet } = useWallet();
  if (showConnectToWallet) {
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
