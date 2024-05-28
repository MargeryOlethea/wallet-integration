import { Dispatch, SetStateAction, useState } from "react";
import SelectNetwork from "./SelectNetwork";
import { chainDatas } from "@/constants/chainDatas";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function WalletModal({
  setOpenModal,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  // select network
  const cosmoshubTestnetRpcUrl = chainDatas.find(
    (chain) => chain.name === "Cosmoshub Testnet",
  )?.rpcUrl;
  const [network, setNetwork] = useState(cosmoshubTestnetRpcUrl || "");
  return (
    <>
      <div className="z-10 absolute shadow-lg border-slate-100 border my-2 rounded-xl flex-col flex-1 gap-5 p-5 justify-end right-0">
        {/* select network */}
        <SelectNetwork network={network} setNetwork={setNetwork} />

        {/* select wallet */}
        <div className="flex mt-5 gap-5">
          <div className="h-[6em] w-[6em] bg-secondary rounded-md flex-col items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>Keplr</AvatarFallback>
            </Avatar>
            <p className="text-xs text-center">Keplr</p>
          </div>
          <div className="h-[6em] w-[6em] bg-secondary rounded-xl">leap</div>
        </div>
      </div>
    </>
  );
}

export default WalletModal;
