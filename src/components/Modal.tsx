import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface ModalProps {
  checkStatus: boolean;
  onClose: () => void;
  currentImg: number;
  imgArray: {
    full: string;
    blurred: string;
  }[];
}

const Modal = (props: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(props.currentImg);

  useEffect(() => {
    setCurrentIndex(props.currentImg); // Update currentIndex when props.currentImg changes
  }, [props.currentImg]);

  useEffect(() => {
    if (props.checkStatus) {
      setIsVisible(true);
    }
  }, [props.checkStatus]);

  if (isVisible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const showPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNext = () => {
    if (currentIndex < props.imgArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => props.onClose(), 300);
  };

  if (!isVisible && !props.checkStatus) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-10 flex justify-between items-center transition-opacity ease-in duration-300 ${
        isVisible ? " bg-white bg-opacity-100" : "opacity-0"
      }`}
    >
      <HiChevronLeft
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          showPrev();
        }}
        className={`ml-2 sm:ml-4 cursor-pointer z-20 scale-90 opacity-60 ${
          currentIndex > 0 ? "opacity-100" : "opacity-0"
        }`}
        size={40}
      />

      <div className="z-20 px-4">
        <img
          src={props.imgArray[currentIndex].full}
          alt="Image Preview"
          className="max-h-[85vh] max-w-[80vw] h-auto w-auto mx-auto"
        />
      </div>

      <HiChevronRight
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          showNext();
        }}
        className={`mr-2 sm:mr-4 cursor-pointer z-20 scale-90 opacity-60 ${
          currentIndex < props.imgArray.length - 1 ? "opacity-100" : "opacity-0"
        }`}
        size={40}
      />
    </div>
  );
};

export default Modal;
