import { HiChevronDoubleDown } from "react-icons/hi2";
import { useState } from "react";

type HeroProps = {
  src: string;
  alt: string;
};

const Hero: React.FC<HeroProps> = ({ src, alt }) => {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  // Function to scroll down one viewport height
  const scrollToNextScreen = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth", // smooth scroll
    });
  };
  return (
    <div className="relative h-screen w-full">
      <div className={`${!hasLoaded && "skeleton"} w-full h-full`}>
        <img
          src={src}
          alt={alt}
          className="absolute top-0 left-0 h-full w-full object-cover"
          onLoad={() => setHasLoaded(true)}
        />
      </div>
      <div className="absolute inset-x-0 md:bottom-10 bottom-28 flex justify-center items-center z-40">
        <HiChevronDoubleDown
          className="text-white cursor-pointer animate-bounce"
          onClick={scrollToNextScreen}
          size={30}
        />
      </div>
    </div>
  );
};

export default Hero;
