import { IoClose } from "react-icons/io5";
import { Card } from "../ui/card";
import { useModal } from "@/hooks/useModal";

function ProposalDetailModal() {
  // modal handling
  const { isProposalModalOpen, setProposalModalOpen } = useModal();
  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setProposalModalOpen(false);
  };
  if (!isProposalModalOpen) {
    return null;
  }
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={handleBackgroundClick}
      >
        <Card className="relative w-1/3 h-2/3 p-5 flex flex-col justify-between">
          {/* close button */}
          <button
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
            onClick={handleCloseModal}
          >
            <IoClose size="25" />
          </button>
          ISI DI SINI
        </Card>
      </div>
    </>
  );
}

export default ProposalDetailModal;
