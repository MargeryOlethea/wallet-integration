"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountDashboard from "@/components/staking-page/AccountDashboard";
import MyValidators from "@/components/staking-page/MyValidators";
import ValidatorsList from "@/components/staking-page/ValidatorsList";
import { useWallet } from "@/hooks/useWallet";
import { useEffect } from "react";

function Staking() {
  const { wallet, userAddress, setWallet, setUserAddress, setChainId } =
    useWallet();

  useEffect(() => {
    const checkExistingUser = () => {
      const localWallet = localStorage.getItem("wallet");
      const localUserAddress = localStorage.getItem("userAddress");
      const localChainId = localStorage.getItem("network");

      if (localWallet && localUserAddress && localChainId) {
        setWallet(localWallet);
        setUserAddress(localUserAddress);
        setChainId(localChainId);
      }
    };

    checkExistingUser();
  }, []);

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
