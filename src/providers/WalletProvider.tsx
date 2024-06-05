"use client";

import { chainInfoMap } from "@/constants/chainInfoMap";
import { WalletContext } from "@/hooks/useWallet";
import {
  AccountData,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<null | string>(null);
  const [userAddress, setUserAddress] = useState<null | string>(null);
  const [chainId, setChainId] = useState<null | string>(null);
  const [showConnectToWallet, setShowConnectToWallet] = useState(false);

  const network = chainInfoMap[chainId!] || {};
  const denom = chainId && chainInfoMap[chainId].currencies[0].coinDenom;

  useEffect(() => {
    const checkExistingUser = () => {
      const localWallet = localStorage.getItem("wallet");
      const localUserAddress = localStorage.getItem("userAddress");
      const localChainId = localStorage.getItem("chainId");

      if (localWallet && localUserAddress && localChainId) {
        setWallet(localWallet);
        setUserAddress(localUserAddress);
        setChainId(localChainId);
      } else {
        setShowConnectToWallet(true);
      }
    };

    checkExistingUser();
  }, []);

  const value = {
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
    chainId,
    setChainId,
    showConnectToWallet,
    setShowConnectToWallet,
    denom,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
