"use client";
import {
  AccountData,
  OfflineAminoSigner,
  OfflineDirectSigner,
} from "@keplr-wallet/types";
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

  const value: WalletContextType = {
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
