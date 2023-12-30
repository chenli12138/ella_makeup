import { useEffect, useState } from "react";

interface ModalProps {
  checkStatus: boolean;
  onClose: () => void;
  currentImg: string;
}

const Modal = (props: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBodyScroll = (state: boolean) => {
    document.body.style.overflow = state ? "hidden" : "visible";
  };

  useEffect(() => {
    if (props.checkStatus) {
      setIsVisible(true); // Trigger the fade-in effect
      handleBodyScroll(true);
    } else {
      handleBodyScroll(false);
    }
  }, [props.checkStatus]);

  // Function to handle closing the modal and fade out effect
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => props.onClose(), 300); // Wait for fade-out to complete before closing
  };

  if (!isVisible && !props.checkStatus) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed top-0 right-0 w-screen h-screen z-10 flex justify-center items-center transition-opacity ease-in duration-300 ${
        isVisible ? "bg-white opacity-100 " : "opacity-0"
      }`}
    >
      <div className="z-20 p-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={props.currentImg}
          alt="NFT Preview"
          className="max-h-[85vh] max-w-[80vw] h-auto w-auto mx-auto"
        />
      </div>
    </div>
  );
};

export default Modal;
