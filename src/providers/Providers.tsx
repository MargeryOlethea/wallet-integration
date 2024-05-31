"use client";
import ModalProvider from "./ModalProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { WalletProvider } from "./WalletProvider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <WalletProvider>
          <ModalProvider>{children}</ModalProvider>
        </WalletProvider>
      </ReactQueryProvider>
    </>
  );
}

export default Providers;
