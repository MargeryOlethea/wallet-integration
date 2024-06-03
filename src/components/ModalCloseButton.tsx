import { IoClose } from "react-icons/io5";

function ModalCloseButton({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  return (
    <>
      <button
        className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
        onClick={handleCloseModal}
      >
        <IoClose size="25" />
      </button>
    </>
  );
}

export default ModalCloseButton;
