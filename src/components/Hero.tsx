// Hero.tsx
import React from "react";

type HeroProps = {
  src: string;
  alt: string;
};

const Hero: React.FC<HeroProps> = ({ src, alt }) => {
  return (
    <div className="relative h-screen w-screen mb-8">
      <img
        src={src}
        alt={alt}
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default Hero;
