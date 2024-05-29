"use client";

import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import AccountDashboard from "@/components/staking-page/AccountDashboard";
import { useWallet } from "@/hooks/useWallet";
import { useEffect } from "react";

function Staking() {
  const { wallet, userAddress, setWallet, setUserAddress, setNetwork } =
    useWallet();

  useEffect(() => {
    const checkExistingUser = () => {
      const localWallet = localStorage.getItem("wallet");
      const localUserAddress = localStorage.getItem("userAddress");
      const localNetwork = localStorage.getItem("network");

      if (localWallet && localUserAddress && localNetwork) {
        setWallet(localWallet);
        setUserAddress(localUserAddress);
        setNetwork(JSON.parse(localNetwork));
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
      </>
    );
  }
}

export default Staking;
