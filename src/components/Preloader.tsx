import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";

type PreloaderProps = {
  isLoading: boolean;
};

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          style={{ pointerEvents: "none" }}
        >
          <BeatLoader
            color="#787878"
            margin="10"
            size={15}
            speedMultiplier={0.5}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
