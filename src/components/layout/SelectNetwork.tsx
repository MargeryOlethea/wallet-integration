import { chainDatas } from "@/constants/chainDatas";

function SelectNetwork({
  network,
  setNetwork,
}: {
  network: string;
  setNetwork: (network: string) => void;
}) {
  return (
    <>
      <select
        defaultValue={network}
        onChange={(e) => {
          setNetwork(e.target.value);
        }}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors"
      >
        {chainDatas.map((chain) => (
          <option key={chain.name} value={chain.rpcUrl}>
            {chain.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectNetwork;
