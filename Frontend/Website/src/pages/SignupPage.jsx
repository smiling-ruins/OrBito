import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

const KineticMessages = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="bubble" style={{ top: '15%', animationDuration: '4s', animationDelay: '0s' }}>U ready?</div>
    <div className="bubble" style={{ top: '45%', animationDuration: '3.2s', animationDelay: '1.5s' }}>LFG 🚀</div>
    <div className="bubble" style={{ top: '75%', animationDuration: '5.5s', animationDelay: '0.5s' }}>No cap.</div>
    <div className="bubble" style={{ top: '25%', animationDuration: '6s', animationDelay: '2s' }}>ICONIC_V2.0</div>
    <div className="ping-dot" style={{ top: '30%', animationDuration: '2s', animationDelay: '0.2s' }}>PING</div>
    <div className="ping-dot" style={{ top: '60%', animationDuration: '2.5s', animationDelay: '1s' }}>SYNC</div>
    <div className="ping-dot" style={{ top: '85%', animationDuration: '1.8s', animationDelay: '0.5s' }}>LIVE</div>
    <div className="skibble w-[300px]" style={{ top: '20%', animationDuration: '1.2s' }}></div>
    <div className="skibble w-[500px]" style={{ top: '50%', animationDuration: '0.8s', animationDelay: '0.3s' }}></div>
    <div className="skibble w-[400px]" style={{ top: '80%', animationDuration: '1.5s', animationDelay: '0.6s' }}></div>
    <div className="skibble w-[600px]" style={{ top: '35%', animationDuration: '0.5s', opacity: 0.2 }}></div>
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const totalSteps = 4;

  const progress = (step / totalSteps) * 100;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Mouse tracking for interactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
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
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#030303] text-white font-display overflow-hidden">
      {/* Interactive Wave Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ 
            x: blob1X, 
            y: blob1Y, 
            translateX: '-50%', 
            translateY: '-50%',
            left: '25%',
            top: '35%'
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="wave-blob w-[600px] h-[600px] absolute" 
        />
        <motion.div 
          style={{ 
            x: blob2X, 
            y: blob2Y, 
            translateX: '-50%', 
            translateY: '-50%',
            left: '75%',
            top: '65%'
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="wave-blob w-[500px] h-[500px] absolute" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#030303] backdrop-blur-[1px]" />
      </div>

      <KineticMessages />

      <main className="relative z-10 w-full max-w-[520px] px-6">
        <motion.div 
          layout
          className="glass-morphic rounded-[3rem] p-10 md:p-12 relative overflow-hidden"
        >
          {/* Progress Charge */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="h-full bg-primary shadow-[0_0_20px_rgba(255,123,0,0.6)]" 
            />
          </div>

          <div className="flex flex-col items-center mb-10 mt-4">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(255,123,0,0.4)] mb-5"
            >
              <span className="material-symbols-outlined text-black text-4xl font-black">bolt</span>
            </motion.div>
            <h2 className="streetwear-text text-[10px] font-black tracking-[0.5em] text-white/30">Iconic Architecture</h2>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h1 className="text-5xl font-black italic tracking-tighter streetwear-text leading-[0.9]">
                    Enter the <br/><span className="text-primary">Stream.</span>
                  </h1>
                  <p className="text-white/40 text-[11px] font-black tracking-widest uppercase">Drop your terminal email node.</p>
                </div>
                <div className={`input-underline-signup ${isFocused ? 'focused' : ''} ${email ? 'has-data' : ''}`}>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent border-none px-0 py-6 text-2xl font-black placeholder:text-white/5 focus:ring-0 transition-all outline-none tracking-tighter" 
                    placeholder="user@iconic.net" 
                    type="email"
                    autoFocus
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 0.98, borderRadius: "1rem", boxShadow: "0 0 60px rgba(255,123,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="w-full group bg-primary hover:bg-orange-500 text-black font-black text-sm uppercase tracking-[0.3em] py-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,123,0,0.3)] cursor-pointer"
                >
                  Connect
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">east</span>
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h1 className="text-5xl font-black italic tracking-tighter streetwear-text leading-[0.9]">
                    Claim your <br/><span className="text-primary">Alias.</span>
                  </h1>
                  <p className="text-white/40 text-[11px] font-black tracking-widest uppercase">How shall the orbit see you?</p>
                </div>
                <div className={`input-underline-signup ${isFocused ? 'focused' : ''} ${alias ? 'has-data' : ''}`}>
                  <input 
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent border-none px-0 py-6 text-2xl font-black placeholder:text-white/5 focus:ring-0 transition-all outline-none tracking-tighter" 
                    placeholder="nomad_one" 
                    type="text"
                    autoFocus
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 0.98, borderRadius: "1rem", boxShadow: "0 0 60px rgba(255,123,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="w-full group bg-primary hover:bg-orange-500 text-black font-black text-sm uppercase tracking-[0.3em] py-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,123,0,0.3)] cursor-pointer"
                >
                  Reserve
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">east</span>
                </motion.button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 text-center"
              >
                <div className="space-y-4 text-left">
                  <h1 className="text-5xl font-black italic tracking-tighter streetwear-text leading-[0.9]">
                    Visual <br/><span className="text-primary">Identity.</span>
                  </h1>
                  <p className="text-white/40 text-[11px] font-black tracking-widest uppercase">Upload your digital streetwear.</p>
                </div>
                <div className="relative w-40 h-40 mx-auto group">
                   <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-700" />
                   
                   <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setSelectedImage(url);
                          setIsUploading(true);
                          setUploadProgress(0);
                          let p = 0;
                          const interval = setInterval(() => {
                             p += 4;
                             setUploadProgress(p);
                             if (p >= 100) {
                                clearInterval(interval);
                                setIsUploading(false);
                                setUploadComplete(true);
                             }
                          }, 40);
                        }
                      }}
                   />

                   <motion.div 
                     onClick={() => {
                        if (uploadComplete || isUploading) return;
                        fileInputRef.current.click();
                     }}
                     className="relative w-full h-full bg-black/40 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center cursor-pointer group-hover:border-primary/50 transition-all overflow-hidden"
                   >
                      {selectedImage && (
                        <img src={selectedImage} alt="Preview" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isUploading ? 'opacity-40' : 'opacity-100'}`} />
                      )}

                      {isUploading ? (
                        <div className="relative w-full h-full flex items-center justify-center z-10">
                           <svg className="w-full h-full -rotate-90 p-2" viewBox="0 0 100 100">
                              <circle 
                                className="text-white/10" 
                                strokeWidth="4" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="45" 
                                cx="50" 
                                cy="50" 
                              />
                              <motion.circle 
                                className="text-primary" 
                                strokeWidth="4" 
                                strokeDasharray={283}
                                strokeDashoffset={283 - (283 * uploadProgress) / 100}
                                strokeLinecap="round" 
                                stroke="currentColor" 
                                fill="transparent" 
                                r="45" 
                                cx="50" 
                                cy="50" 
                              />
                           </svg>
                           <span className="absolute text-[10px] font-black text-primary drop-shadow-lg">{uploadProgress}%</span>
                        </div>
                      ) : uploadComplete ? (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex flex-col items-center gap-1 z-10 bg-black/40 w-full h-full justify-center"
                        >
                           <span className="material-symbols-outlined text-5xl text-primary font-black">check_circle</span>
                           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Identity Verified</span>
                        </motion.div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-5xl text-white/20 group-hover:text-primary transition-colors">add_a_photo</span>
                          <span className="text-[9px] font-black text-white/10 uppercase tracking-widest group-hover:text-primary/50">Select Node Image</span>
                        </div>
                      )}
                      
                      {/* Google-like Ripple on Complete */}
                      <AnimatePresence>
                        {uploadComplete && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute inset-0 bg-primary/60 rounded-full pointer-events-none z-20"
                          />
                        )}
                      </AnimatePresence>
                   </motion.div>
                </div>
                <motion.button 
                  whileHover={{ scale: 0.98, borderRadius: "1rem", boxShadow: "0 0 60px rgba(255,123,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="w-full group bg-primary hover:bg-orange-500 text-black font-black text-sm uppercase tracking-[0.3em] py-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,123,0,0.3)] cursor-pointer"
                >
                  Finalize
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">east</span>
                </motion.button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-black italic tracking-tighter streetwear-text leading-[0.9]">
                      Verify your <br/><span className="text-primary">Vibes.</span>
                    </h1>
                    <p className="text-white/40 text-[11px] font-black tracking-widest uppercase">Enter the 6-digit pulse.</p>
                  </div>
                  <div className="relative size-16">
                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                      <circle className="stroke-current text-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="2" />
                      <motion.circle 
                        animate={{ strokeDashoffset: [100, 20] }}
                        className="stroke-current text-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeLinecap="round" strokeWidth="2" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white/80">80%</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2 no-scrollbar">
                  {[...Array(6)].map((_, i) => (
                    <input 
                      key={i}
                      className="w-12 h-16 md:w-14 md:h-20 bg-white/5 border border-white/10 rounded-xl text-center text-3xl font-black text-white focus:border-primary focus:outline-none transition-all" 
                      maxLength={1} 
                      type="text" 
                      onFocus={(e) => e.target.classList.add('border-primary', 'shadow-[0_0_15px_rgba(255,123,0,0.3)]')}
                      onBlur={(e) => !e.target.value && e.target.classList.remove('border-primary', 'shadow-[0_0_15px_rgba(255,123,0,0.3)]')}
                    />
                  ))}
                </div>
                <motion.button 
                  whileHover={{ scale: 0.98, borderRadius: "1rem", boxShadow: "0 0 60px rgba(255,123,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="w-full group bg-primary hover:bg-orange-500 text-black font-black text-sm uppercase tracking-[0.3em] py-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,123,0,0.3)] cursor-pointer"
                >
                  Confirm
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">done_all</span>
                </motion.button>
              </motion.div>
            )}

            {step > 4 && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center shadow-[0_0_80px_rgba(255,123,0,0.6)]">
                   <span className="material-symbols-outlined text-black text-5xl font-black">verified</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl font-black streetwear-text italic">LINK STABLE.</h1>
                  <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">Node verified on iconic network.</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 0.98, borderRadius: "1rem", boxShadow: "0 0 60px rgba(255,123,0,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.cookie = "auth_token=valid_session; path=/";
                    navigate('/dashboard');
                  }}
                  className="w-full bg-white text-black font-black text-sm uppercase tracking-[0.4em] py-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer"
                >
                  Launch Interface
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {step <= totalSteps && (
            <div className="mt-14 flex items-center justify-between border-t border-white/5 pt-8">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className="text-[10px] font-black text-white/30 hover:text-white transition-colors uppercase tracking-[0.3em] flex items-center gap-2 disabled:opacity-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">keyboard_backspace</span>
                Back
              </button>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                Joined? <Link to="/signin" className="text-primary hover:brightness-125 underline decoration-2 underline-offset-8 ml-2 cursor-pointer">Sign In</Link>
              </p>
            </div>
          )}
        </motion.div>

        {/* System Logs */}
        <div className="mt-10 text-center">
          <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.6em] leading-loose">
            Data Stream: Active // Buffer: 0ms <br/>
            © 2024 Iconic Labs Global [V2.0]
          </p>
        </div>
      </main>

      {/* Decorative Overlays */}
      <div className="fixed top-12 left-12 hidden lg:block opacity-20">
        <div className="text-[10px] font-black text-white uppercase tracking-[1em] [writing-mode:vertical-lr] rotate-180">
          Digital Streetwear Architecture / 001
        </div>
      </div>
      <div className="fixed bottom-12 right-12 hidden lg:block">
        <div className="flex gap-4 items-center">
          <div className="text-[10px] font-black text-white/20 uppercase tracking-[1em] [writing-mode:vertical-lr]">
            High Velocity Motion
          </div>
          <div className="w-[2px] h-20 bg-gradient-to-t from-primary to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
