import React, { useEffect, useState } from "react";
import { motion, useViewportScroll } from "framer-motion";
import { HiArrowSmallUp } from "react-icons/hi2"; // Make sure to import from "react-icons/hi"

const ScrollToTop: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Determine the scroll position to start showing the button
  const startVisible = 0.1; // 10% of the page height

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      setIsVisible(value > startVisible);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed md:bottom-10 bottom-4 md:right-10 right-4 z-50 cursor-pointer"
      onClick={scrollToTop}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.7 }}
    >
      <svg className="w-24 h-24" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="30"
          className="text-gray-300"
          strokeWidth="1.5"
          fill="none"
          stroke="currentColor"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          className="text-gray-700"
          strokeWidth="1.5"
          fill="none"
          stroke="currentColor"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <HiArrowSmallUp className="text-gray-700 w-6 h-6" />
      </div>
    </motion.div>
  );
};

export default ScrollToTop;
