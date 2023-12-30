import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Modal from "./Modal";

// Import both full and blurred images
const fullImageModules = import.meta.glob("../assets/pics/*.{jpg,png,JPG}");
const blurredImageModules = import.meta.glob(
  "../assets/pics/blurred/*.{jpg,png,JPG}"
);

const ImgDisplay: React.FC = () => {
  const [images, setImages] = useState<{ full: string; blurred: string }[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrent] = useState<string>("");

  useEffect(() => {
    const loadImages = async () => {
      const fullPaths = Object.keys(fullImageModules);
      const blurredPaths = Object.keys(blurredImageModules);

      const importedFullImages = await Promise.all(
        fullPaths.map(
          (path) => fullImageModules[path]() as Promise<{ default: string }>
        )
      );
      const importedBlurredImages = await Promise.all(
        blurredPaths.map(
          (path) => blurredImageModules[path]() as Promise<{ default: string }>
        )
      );

      const srcs = importedFullImages.map((module, index) => ({
        full: module.default,
        blurred: importedBlurredImages[index]?.default || module.default, // Fallback to full image if blurred image is not found
      }));

      setImages(srcs);
    };

    loadImages();
    console.log(images);
  }, []);
  const openModal = (srcLink: string) => {
    setModalOpen(true);
    setCurrent(srcLink);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 mx-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full aspect-w-3 aspect-h-4 overflow-hidden relative"
          >
            <LazyLoadImage
              alt={`Image ${index}`}
              src={src.full} // Make sure src.full is the correct path
              placeholderSrc={src.blurred}
              effect="blur"
              wrapperClassName="w-full h-full object-cover"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-0 left-0 hover:bg-black/10 hover:cursor-pointer w-full h-full "
              onClick={() => openModal(src.full)}
            ></div>
          </div>
        ))}
      </div>
      <Modal
        checkStatus={modalOpen}
        onClose={() => setModalOpen(false)}
        currentImg={currentModal}
      />
    </>
  );
};

export default ImgDisplay;
