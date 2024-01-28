import { useEffect, useState, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Modal from "./Modal";
import { motion } from "framer-motion";
import Hero from "./Hero";

const fullImageModules = import.meta.glob("../assets/pics/*.{jpg,png,JPG}");
const blurredImageModules = import.meta.glob(
  "../assets/pics/blurred/*.{jpg,png,JPG}"
);
const heroImageModules = import.meta.glob("../assets/hero/*.{jpg,png,JPG}");

const ImgDisplay: React.FC = () => {
  const [images, setImages] = useState<{ full: string; blurred: string }[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrent] = useState<number>(0);
  const [visibleImages, setVisibleImages] = useState(9); // Initial number of images to display
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentHeroImage, setCurrentHeroImage] = useState<string>("");

  // Function to load more images
  const loadMoreImages = useCallback(() => {
    if (visibleImages < images.length) {
      setVisibleImages((prevVisibleImages) => prevVisibleImages + 3);
    }
  }, [visibleImages, images.length]);

  // Scroll event handler
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMoreImages();
    }
  }, [loadMoreImages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const loadImages = async () => {
      const fullPaths = Object.keys(fullImageModules);
      const blurredPaths = Object.keys(blurredImageModules);
      const paths = Object.keys(heroImageModules);

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
      const importedImages = await Promise.all(
        paths.map(
          (path) => heroImageModules[path]() as Promise<{ default: string }>
        )
      );
      const heroSrcs = importedImages.map((module) => module.default);
      setHeroImages(heroSrcs);
      setCurrentHeroImage(
        heroSrcs[Math.floor(Math.random() * heroSrcs.length)]
      );
    };
    console.log(currentHeroImage);
    loadImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(
        heroImages[Math.floor(Math.random() * heroImages.length)]
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const openModal = (index: number) => {
    setModalOpen(true);
    setCurrent(index);
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {currentHeroImage && (
        <Hero src={currentHeroImage} alt="Hero background image" />
      )}

      <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 sm:mx-0 mx-2">
        {images.slice(0, visibleImages).map((src, index) => (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full aspect-w-3 aspect-h-4 overflow-hidden relative"
          >
            <LazyLoadImage
              alt={`Image ${index}`}
              src={src.full}
              placeholderSrc={src.blurred}
              effect="blur"
              wrapperClassName="w-full h-full object-cover"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-0 left-0 hover:bg-black/10 hover:cursor-pointer w-full h-full"
              onClick={() => openModal(index)}
            ></div>
          </motion.div>
        ))}
      </div>
      <Modal
        checkStatus={modalOpen}
        onClose={() => setModalOpen(false)}
        currentImg={currentModal}
        imgArray={images}
      />
    </>
  );
};

export default ImgDisplay;
