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

  const network = chainInfoMap[chainId!] || {};

  useEffect(() => {
    const checkExistingUser = () => {
      const localWallet = localStorage.getItem("wallet");
      const localUserAddress = localStorage.getItem("userAddress");
      const localChainId = localStorage.getItem("chainId");

      if (localWallet && localUserAddress && localChainId) {
        setWallet(localWallet);
        setUserAddress(localUserAddress);
        setChainId(localChainId);
      }
    };

    checkExistingUser();
  }, []);

  // connect to wallet
  const connectToWallet = async (walletType: "keplr" | "leap") => {
    try {
      if (!chainId) {
        throw new Error("Please select network");
      }

      if (!window.keplr && !window.leap) {
        throw new Error("Please install Keplr or Leap wallet");
      }

      let offlineSigner: (OfflineAminoSigner & OfflineDirectSigner) | null =
        null;
      if (walletType === "keplr" && window.keplr) {
        await window.keplr!.experimentalSuggestChain(network);
        offlineSigner = window.getOfflineSigner!(chainId!);
        setWallet("keplr");
      }

      if (
        walletType === "leap" &&
        window.leap &&
        chainId == "froopyland_100-1"
      ) {
        await window.leap.experimentalSuggestChain(network);
        offlineSigner = window.leap!.getOfflineSigner!("froopyland-100-1");
        setWallet("leap");
      } else {
        await window.leap.experimentalSuggestChain(network);
        offlineSigner = window.leap!.getOfflineSigner!(chainId);
        setWallet("leap");
      }

      if (offlineSigner) {
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        setUserAddress(account.address);
        localStorage.setItem("wallet", walletType);
        localStorage.setItem("userAddress", account.address);
        localStorage.setItem("chainId", chainId);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const value = {
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
    chainId,
    setChainId,
    connectToWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
