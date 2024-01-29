import { HiChevronDoubleDown } from "react-icons/hi2";
import React from "react";

type HeroProps = {
  src: string;
  alt: string;
};

const Hero: React.FC<HeroProps> = ({ src, alt }) => {
  // Function to scroll down one viewport height
  const scrollToNextScreen = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth", // smooth scroll
    });
  };
  return (
    <div className="relative h-screen w-screen">
      <img
        src={src}
        alt={alt}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <HiChevronDoubleDown
        className="absolute z-40 text-white bottom-20 left-1/2 animate-bounce cursor-pointer"
        onClick={scrollToNextScreen}
        size={30}
      />
    </div>
  );
};

export default Hero;
