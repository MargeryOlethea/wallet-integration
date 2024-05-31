import { ModalContext } from "@/hooks/useModal";
import { useState } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

function ModalProvider({ children }: ModalProviderProps) {
  const [isWalletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const [isDelegateModalOpen, setDelegateModalOpen] = useState<boolean>(false);
  const [isManageModalOpen, setManageModalOpen] = useState<boolean>(false);

  const value = {
    isWalletModalOpen,
    setWalletModalOpen,
    isDelegateModalOpen,
    setDelegateModalOpen,
    isManageModalOpen,
    setManageModalOpen,
  };
  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    </>
  );
}

export default ModalProvider;
