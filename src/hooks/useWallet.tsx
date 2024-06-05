"use client";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface WalletContextType {
  wallet: string | null;
  setWallet: Dispatch<SetStateAction<null | string>>;
  userAddress: string | null;
  setUserAddress: Dispatch<SetStateAction<null | string>>;
  chainId: string | null;
  setChainId: (chainId: string) => void;
  setShowConnectToWallet: Dispatch<SetStateAction<boolean>>;
  showConnectToWallet: boolean;
  denom: string | null;
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined,
);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
