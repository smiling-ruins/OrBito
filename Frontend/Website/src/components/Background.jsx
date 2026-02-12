import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ChatBubble = ({ text, type, x, y, delay }) => {
  const isSent = type === 'sent';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: y + 50 }}
      animate={{ 
        opacity: [0.1, 0.25, 0.1],
        y: [y - 40, y + 40, y - 40],
        x: [x - 15, x + 15, x - 15],
        rotate: isSent ? [0, 2, 0] : [0, -2, 0]
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      className={`absolute pointer-events-none group max-w-[180px] z-0`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={`relative px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10
        ${isSent 
          ? 'bg-orange-600/10 text-primary-accent rounded-tr-none' 
          : 'bg-white/5 text-white/40 rounded-tl-none'}`}>
        
        {/* WhatsApp Tail */}
        <div className={`absolute top-0 w-3 h-3 
          ${isSent 
            ? '-right-2 bg-orange-600/10 chat-tail-sent border-t border-white/10' 
            : '-left-2 bg-white/5 chat-tail-received border-t border-white/10'}`} />
        
        <p className="text-[11px] font-bold leading-tight tracking-wide uppercase italic">
          {text}
        </p>

        <div className="mt-1 flex justify-end">
           <span className="text-[7px] opacity-30">12:00 PM {isSent ? '✓✓' : ''}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Background = () => {
  const bubbles = useMemo(() => [
    { text: "Yo, orbito is actually insane.", type: "received", x: 12, y: 18, delay: 0 },
    { text: "Ngl the UI hits hard ⚡", type: "sent", x: 78, y: 12, delay: 2 },
    { text: "No cap, best chat ever", type: "sent", x: 82, y: 82, delay: 5 },
    { text: "Encryption level: God Tier 🛡️", type: "received", x: 8, y: 85, delay: 1 },
    { text: "Vibing in the metaverse", type: "sent", x: 85, y: 45, delay: 4 },
    { text: "Sheeesh, so smooth!", type: "received", x: 18, y: 48, delay: 3 },
    { text: "Orbito > Everything 🧡", type: "sent", x: 55, y: 6, delay: 6 },
    { text: "Waiting for the drop...", type: "received", x: 42, y: 92, delay: 7 },
  ], []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202] overflow-hidden">
      {/* Morphing Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] morph-blob bg-orange-600/5" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] morph-blob bg-white/5" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Scanning Line */}
      <div className="scanning-line opacity-30" />

      {/* Chat Bubbles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {bubbles.map((b, i) => (
          <ChatBubble key={i} {...b} />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default Background;
