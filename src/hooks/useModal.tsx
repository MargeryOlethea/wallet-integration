"use client";
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface ModalContextType {
  isWalletModalOpen: boolean;
  setWalletModalOpen: Dispatch<SetStateAction<boolean>>;
  isDelegateModalOpen: boolean;
  setDelegateModalOpen: Dispatch<SetStateAction<boolean>>;
  isManageModalOpen: boolean;
  setManageModalOpen: Dispatch<SetStateAction<boolean>>;
  isRedelegateModalOpen: boolean;
  setRedelegateModalOpen: Dispatch<SetStateAction<boolean>>;
  isProposalModalOpen: boolean;
  setProposalModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
