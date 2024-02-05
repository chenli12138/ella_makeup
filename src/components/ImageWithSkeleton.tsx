import { useState, FC } from "react";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  imgClass?: string;
};
const ImageWithSkeleton: FC<ImgProps> = ({
  src,
  alt,
  className,
  imgClass,
  ...props
}) => {
  // State to hold whether the image has loaded
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  return (
    <div className={className}>
      <div className={`${!hasLoaded && "skeleton"} w-full h-full`}>
        <img
          src={src}
          alt={alt}
          className={imgClass}
          style={{ visibility: hasLoaded ? undefined : "hidden" }}
          onLoad={() => setHasLoaded(true)}
          {...props}
        />
      </div>
    </div>
  );
};

export default ImageWithSkeleton;
