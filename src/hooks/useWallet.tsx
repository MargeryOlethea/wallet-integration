"use client";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface WalletContextType {
  wallet: string | null;
  setWallet: Dispatch<SetStateAction<null | string>>;
  userAddress: string | null;
  setUserAddress: Dispatch<SetStateAction<null | string>>;
  network: {
    rpcUrl: string;
    chain_id: string;
  };
  setNetwork: (network: { rpcUrl: string; chain_id: string }) => void;
  connectToWallet: (walletType: "keplr" | "leap") => void;
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
