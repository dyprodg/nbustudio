"use client";
import { motion, spring } from "framer-motion";

interface FlybyTextProps {
  text: string;
  className?: string;
}

const FlybyText: React.FC<FlybyTextProps> = ({ text, className = "" }) => {
  const letters = text.split("");

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ delay: index * 0.1, anmation: spring, stiffness: 1000 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default FlybyText;
