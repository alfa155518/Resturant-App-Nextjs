"use client";
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.div 
        className="w-16 h-16 rounded-full border-4 border-gray-300 border-t-primary-500"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.p 
        className="mt-4 text-xl font-medium text-gray-200"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}