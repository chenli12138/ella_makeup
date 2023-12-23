import React, { useEffect, useState } from "react";
// Dynamically import images
const imageModules = import.meta.glob("../assets/pics/*.{jpg,png,JPG}");

const ImgDisplay: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const paths = Object.keys(imageModules);
      const importedImages = await Promise.all(
        paths.map(
          (path) => imageModules[path]() as Promise<{ default: string }>
        )
      );
      // Cast each module to the correct type within the map function
      const srcs = importedImages.map(
        (module: { default: string }) => module.default
      );
      setImages(srcs);
    };

    loadImages();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-1 mx-4">
      {images.map((src, index) => (
        <div
          key={index}
          className="w-full aspect-w-3 aspect-h-4 overflow-hidden"
        >
          <img
            src={src}
            alt={`Dynamic ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImgDisplay;
