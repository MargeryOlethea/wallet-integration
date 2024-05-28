"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

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

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallet, setWallet] = useState<null | string>(null);
  const [userAddress, setUserAddress] = useState<null | string>(null);
  const [network, setNetwork] = useState({
    rpcUrl: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
    chain_id: "theta-testnet-001",
  });

  const value: WalletContextType = {
    wallet,
    setWallet,
    userAddress,
    setUserAddress,
    network,
    setNetwork,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};
