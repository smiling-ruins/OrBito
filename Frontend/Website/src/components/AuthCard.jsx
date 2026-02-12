import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthCard = ({ children, keyId }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={keyId}
          initial={{ opacity: 0, scale: 0.9, rotateX: 10, y: 50 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotateX: -10, y: -50 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="w-full max-w-md glass-panel p-10 md:p-12 relative z-10 perspective-[1000px]"
        >
          {/* Internal Staggered Layout */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative Glow behind the card */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.3 }}
         transition={{ duration: 2 }}
         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-accent/20 rounded-full blur-[100px] pointer-events-none" 
      />
    </div>
  );
};

export default AuthCard;
