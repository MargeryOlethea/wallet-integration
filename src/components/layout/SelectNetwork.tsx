import { chainInfoMap } from "@/constants/chainInfoMap";
import { useWallet } from "@/hooks/useWallet";
import React from "react";

function SelectNetwork() {
  const { setChainId } = useWallet();

  return (
    <>
      <select
        onChange={(e) => {
          setChainId(e.target.value);
        }}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors"
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select network...
        </option>
        {Object.keys(chainInfoMap).map((chainId) => {
          const chain = chainInfoMap[chainId];
          return (
            <option key={chain.chainId} value={chain.chainId}>
              {chain.chainName}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default SelectNetwork;
