"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountDashboard from "@/components/staking-page/AccountDashboard";
import MyValidators from "@/components/staking-page/MyValidators";
import ValidatorsList from "@/components/staking-page/ValidatorsList";
import { useWallet } from "@/hooks/useWallet";

function Staking() {
  const wallet = localStorage.getItem("wallet");
  const userAddress = localStorage.getItem("userAddress");

  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  } else {
    return (
      <>
        <AccountDashboard />

        <MyValidators />

        <ValidatorsList />
      </>
    );
  }
}

export default Staking;
