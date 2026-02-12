import React from 'react';
import { motion } from 'framer-motion';

const FloatingMessage = ({ text, position, delay = 0 }) => (
  <motion.div
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: [-20, 20, -20],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    className={`floating-element ${position} hidden lg:block`}
  >
    <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-[10px] tracking-wider uppercase font-bold">
      "{text}"
    </div>
  </motion.div>
);

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-background-dark">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Floating Messages */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingMessage text="Community is everything" position="top-[25%] left-[8%]" delay={0} />
        <FloatingMessage text="Secure your space in the orbit" position="top-[65%] right-[12%]" delay={2.5} />
        <FloatingMessage text="Verification successful" position="bottom-[12%] left-[15%]" delay={5} />
        <div className="floating-element bottom-[10%] right-[30%] opacity-20">@orbito_user joined</div>
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center">
        {children}
      </main>

      <footer class="relative z-10 p-10 flex justify-center">
        <p class="text-white/10 text-[10px] tracking-[0.4em] uppercase font-bold">OrBito Premium Experience • Est. 2024</p>
      </footer>
    </div>
  );
};

export default Layout;
