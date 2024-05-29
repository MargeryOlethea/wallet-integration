import { chainDatas } from "@/constants/chainDatas";
import { useWallet } from "@/hooks/useWallet";

function SelectNetwork() {
  const { setNetwork } = useWallet();
  return (
    <>
      <select
        onChange={(e) => {
          setNetwork(JSON.parse(e.target.value));
        }}
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2 rounded-md text-sm font-medium ring-offset-background transition-colors"
      >
        {chainDatas.map((chain) => (
          <option key={chain.name} value={JSON.stringify(chain.data)}>
            {chain.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectNetwork;
