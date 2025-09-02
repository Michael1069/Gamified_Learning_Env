// src/components/PageWrapper.jsx
import { motion } from "framer-motion";

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
