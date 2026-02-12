import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full mb-10 group relative">
      <motion.div
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          y: isFocused ? -2 : 0
        }}
        className="relative"
      >
        <motion.label 
          initial={false}
          animate={{ 
            y: isFocused || value ? -32 : 0,
            x: isFocused || value ? 0 : 4,
            scale: isFocused || value ? 0.75 : 1,
            color: isFocused ? "#FF8C00" : "rgba(255,255,255,0.4)"
          }}
          className="absolute left-4 top-4 pointer-events-none text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-500 origin-left z-20"
        >
          {label}
        </motion.label>
        
        <input
          type={type}
          placeholder={isFocused ? placeholder : ""}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl px-5 py-5 text-white placeholder:text-neutral-700 outline-none transition-all duration-700 focus:bg-white/[0.07] focus:border-primary-accent/40 relative z-10"
        />

        {/* Dynamic Underline Shadow */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: isFocused ? 1 : 0, scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-[-2px] left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-primary-accent to-transparent z-20"
        />

        {/* Corner Accents */}
        <AnimatePresence>
          {isFocused && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary-accent rounded-tl-sm z-20" />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary-accent rounded-br-sm z-20" />
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < length - 1) inputRefs.current[index + 1].focus();
    if (newOtp.every(val => val !== "")) onComplete(newOtp.join(""));
  };

  return (
    <div className="flex justify-between gap-3 mb-10">
      {otp.map((data, index) => (
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
          className="relative w-full aspect-[2/3]"
        >
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            className="w-full h-full bg-white/[0.03] border-2 border-white/5 rounded-2xl text-center text-3xl font-black text-white focus:border-primary-accent focus:bg-primary-accent/5 outline-none transition-all duration-500"
          />
          {data && (
            <motion.div 
              layoutId="otp-ring"
              className="absolute inset-0 rounded-2xl border-2 border-primary-accent neon-glow-primary pointer-events-none"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const Button = ({ children, onClick, variant = "primary", loading = false }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98, y: 2 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className={`relative w-full py-6 rounded-3xl font-black tracking-[0.4em] text-[10px] uppercase overflow-hidden transition-all duration-500
        ${variant === 'primary' 
          ? 'bg-white text-black shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)]' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {loading ? <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : children}
      </span>
      
      {variant === 'primary' && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.button>
  );
};
