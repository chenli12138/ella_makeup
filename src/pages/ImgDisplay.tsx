import { useEffect, useState, useCallback } from "react";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import ScrollToTop from "../components/ScrollBar";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import Preloader from "../components/Preloader";

interface ImageData {
  url: string;
  id: string;
  order: number;
}

const heroImageModules = import.meta.glob(
  "../assets/hero-landscape/*.{jpg,png,JPG}"
);

const ImgDisplay: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentModal, setCurrent] = useState<number>(0);
  const [visibleImages, setVisibleImages] = useState(30); // Initial number of images to display
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentHeroImage, setCurrentHeroImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Load hero images separately and prioritize them
  useEffect(() => {
    const loadHeroImages = async () => {
      const paths = Object.keys(heroImageModules);
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
      setIsLoading(false); // Mark loading as complete after hero images are loaded
    };
    loadHeroImages();
  }, []);

  // Hero pictures changing time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(
        heroImages[Math.floor(Math.random() * heroImages.length)]
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const openModal = (index: number) => {
    setModalOpen(true);
    setCurrent(index);
  };

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

  // Load showcase images
  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(
          "https://getphotos-3w3sueupsa-uc.a.run.app"
        );
        const data: ImageData[] = await response.json();
        if (data && data.length > 0) {
          data.sort((a, b) => a.order - b.order);
          setImages(data);
        } else {
          console.log("json empty");
        }
      } catch (error) {
        console.error("Error fetching initial order:", error);
      }
    };
    loadImages();
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Preloader isLoading={isLoading} />
      {currentHeroImage && (
        <Hero src={currentHeroImage} alt="Hero background image" />
      )}
      <div className="text-center text-2xl md:text-6xl md:my-40 my-10 font-play text-gray-800">
        Gallery
      </div>
      <div className="container md:mx-auto grid gap-4 md:grid-cols-3 sm:grid-cols-1 min-h-screen">
        {images.slice(0, visibleImages).map(({ url, order }, index) => (
          <motion.div
            key={index}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full relative"
          >
            <ImageWithSkeleton
              alt={`Image ${order}`}
              src={url}
              className="w-full h-full"
              imgClass="w-full h-full object-cover"
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
        imgArray={images.map((image) => image.url)}
      />
      <ScrollToTop />
    </>
  );
};

export default ImgDisplay;
