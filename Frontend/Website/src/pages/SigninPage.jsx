import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const SigninPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Mouse tracking for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the blobs
  const springConfig = { damping: 25, stiffness: 150 };
  const blob1X = useSpring(mouseX, springConfig);
  const blob1Y = useSpring(mouseY, springConfig);
  const blob2X = useSpring(mouseX, springConfig);
  const blob2Y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background-dark text-white overflow-hidden font-display">
      {/* Interactive Wave Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ 
            x: blob1X, 
            y: blob1Y, 
            translateX: '-50%', 
            translateY: '-50%',
            left: '20%',
            top: '30%'
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="wave-blob w-[600px] h-[600px] absolute" 
        />
        <motion.div 
          style={{ 
            x: blob2X, 
            y: blob2Y, 
            translateX: '-50%', 
            translateY: '-50%',
            left: '80%',
            top: '70%'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="wave-blob w-[500px] h-[500px] absolute" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Header Overlay */}
      <header className="relative z-20 flex items-center justify-between px-6 md:px-20 py-4 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="size-8 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
              <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight">ICONIC Chat</h2>
        </div>
        <Link 
          to="/signup" 
          className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer"
        >
          New here?
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent to-black/20 overflow-y-auto custom-scrollbar">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-[480px] bg-surface-dark p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/5 relative overflow-hidden my-auto"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Good to see you again.</h1>
            <p className="text-[#bcaa9a] text-base font-medium">Your friends are waiting in the lounge.</p>
          </div>

          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group group flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 group-focus-within:text-primary transition-colors">
                How should we call you?
              </label>
              <div className={`input-underline relative ${username ? 'has-data' : ''}`}>
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg font-bold focus:ring-0 focus:outline-none placeholder:text-white/5" 
                  placeholder="USERNAME @ ICONIC.NET" 
                  type="text"
                />
              </div>
            </div>

            <div className="input-group group flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/30 group-focus-within:text-primary transition-colors">
                  Your Secret Code
                </label>
                <a className="text-[10px] uppercase font-black tracking-widest text-primary/70 hover:text-primary transition-colors cursor-pointer" href="#">Forgot?</a>
              </div>
              <div className={`input-underline relative ${password ? 'has-data' : ''}`}>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-white/10 px-0 py-4 text-lg font-bold focus:ring-0 focus:outline-none placeholder:text-white/5" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 0.98, borderRadius: "1rem", boxShadow: "0 0 60px rgba(255,123,0,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.cookie = "auth_token=valid_session; path=/";
                navigate('/dashboard');
              }}
              className="mt-4 w-full h-16 bg-primary text-background-dark text-lg font-black rounded-[1.2rem] flex items-center justify-center gap-3 transition-shadow shadow-[0_20px_40px_rgba(255,123,0,0.2)] group overflow-hidden relative cursor-pointer"
            >
              <span className="relative z-10">Join the Conversation</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 relative z-10">arrow_forward</span>
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-[#bcaa9a]">
              Not part of the circle yet? 
              <Link to="/signup" className="text-primary font-bold hover:underline underline-offset-8 ml-2 cursor-pointer">Create nodal account</Link>
            </p>
          </div>
        </motion.div>

        {/* Brand Slogan */}
        <div className="mt-10 flex items-center gap-4 text-white/10 text-[10px] font-black tracking-[0.6em] uppercase">
          <span className="w-12 h-[1px] bg-current"></span>
          People First • Chat Always
          <span className="w-12 h-[1px] bg-current"></span>
        </div>
      </main>

      {/* Floating Side Icons */}
      <div className="fixed bottom-10 left-10 hidden xl:flex flex-col gap-6 text-white/20">
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">public</span>
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">forum</span>
        <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">diversity_3</span>
      </div>

      <div className="fixed bottom-10 right-10 hidden xl:flex items-center gap-5 text-white/20">
        <span className="text-[10px] font-black tracking-widest">EST. 2024</span>
        <div className="size-12 rounded-full border border-current flex items-center justify-center text-[10px] font-black tracking-widest">ICONIC</div>
      </div>
    </div>
  );
};

export default SigninPage;
