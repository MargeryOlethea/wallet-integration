import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SelectNetwork from "./layout/SelectNetwork";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import { AccountData } from "@cosmjs/proto-signing";
import toast from "react-hot-toast";
import { chainInfoMap } from "@/constants/chainInfoMap";
import { OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";

function NoConnectedWalletHeader() {
  const { chainId, setWallet, setUserAddress, setShowConnectToWallet } =
    useWallet();
  const network = chainInfoMap[chainId!] || {};
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
      if (
        typeof window !== undefined &&
        walletType === "keplr" &&
        window.keplr
      ) {
        await window.keplr!.experimentalSuggestChain(network);
        offlineSigner = window.getOfflineSigner!(chainId!);
        setWallet("keplr");
      }

      if (typeof window !== undefined && walletType === "leap" && window.leap) {
        await window.leap.experimentalSuggestChain(network);
        offlineSigner = window.leap.getOfflineSigner!(chainId!);
        setWallet("leap");
      }

      if (offlineSigner) {
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        setUserAddress(account.address);
        localStorage.setItem("wallet", walletType);
        localStorage.setItem("userAddress", account.address);
        localStorage.setItem("chainId", chainId);
      }

      setShowConnectToWallet(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <header>
      <Card className="bg-gradient-to-r from-blue-100">
        <CardHeader>
          <CardTitle className="text-center">
            You haven&apos;t connected your wallet.
          </CardTitle>
          <CardDescription className="text-center">
            connect using Keplr or Leap!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white p-5 rounded-xl max-w-xs mx-auto shadow-md flex flex-col items-center">
            <SelectNetwork />
            <div className="flex mt-5 gap-5">
              <div
                className=" w-[7em] rounded-xl flex flex-col items-center justify-center group"
                onClick={() => {
                  connectToWallet("keplr");
                }}
              >
                <Image
                  src="/keplr_icon.png"
                  alt="Keplr"
                  width={150}
                  height={150}
                  className="group-hover:shadow-md rounded-3xl group-hover:scale-105"
                />
                <p className="text-xs text-center font-bold group-hover:text-primary-foreground/9 group-hover:scale-110">
                  Keplr
                </p>
              </div>

              <div
                className=" w-[7em] rounded-xl flex-col flex items-center justify-center group"
                onClick={() => {
                  connectToWallet("leap");
                }}
              >
                <Image
                  src="/leap_icon.png"
                  alt="Leap"
                  width={150}
                  height={150}
                  className="group-hover:shadow-md rounded-3xl group-hover:scale-105"
                />
                <p className="text-xs text-center font-bold group-hover:text-primary-foreground/9 group-hover:scale-110">
                  Leap
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}

export default NoConnectedWalletHeader;
