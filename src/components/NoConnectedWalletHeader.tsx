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
import { useWallet } from "@/providers/WalletProvider";

function NoConnectedWalletHeader() {
  const { connectToWallet } = useWallet();
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
