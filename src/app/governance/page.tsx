import NoConnectedWalletHeader from "@/components/NoConnectedWalletHeader";
import { useWallet } from "@/hooks/useWallet";

function Governance() {
  const { wallet, userAddress } = useWallet();
  if (!wallet || !userAddress) {
    return <NoConnectedWalletHeader />;
  } else return <>ini governance</>;
}

export default Governance;
