"use client";
import { WalletContext } from "@/hooks/useWallet";
import {
  AccountData,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
import React, { useState } from "react";

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<null | string>(null);
  const [userAddress, setUserAddress] = useState<null | string>(null);
  const [network, setNetwork] = useState({
    rpcUrl: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
    chain_id: "theta-testnet-001",
  });

  // connect to wallet
  const connectToWallet = async (walletType: "keplr" | "leap") => {
    try {
      let offlineSigner: (OfflineAminoSigner & OfflineDirectSigner) | null =
        null;

      if (walletType === "keplr" && window.keplr) {
        await window.keplr.enable(network.chain_id);
        offlineSigner = window.getOfflineSigner!(network.chain_id);
        setWallet("keplr");
      } else if (walletType === "leap" && window.leap) {
        await window.leap.enable(network.chain_id);
        offlineSigner = window.leap!.getOfflineSigner!(network.chain_id);
        setWallet("leap");
      }

      if (offlineSigner) {
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        setUserAddress(account.address);
        localStorage.setItem("wallet", walletType);
        localStorage.setItem("userAddress", account.address);
      }
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
    }
  };

  const value = {
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
    network,
    setNetwork,
    connectToWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
