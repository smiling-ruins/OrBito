import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardPage = () => {
  const [view, setView] = useState('spaces'); // 'pings' or 'spaces'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMemberListOpen, setIsMemberListOpen] = useState(true);
  const [inputText, setInputText] = useState("");

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'Sarah Jenkins', 
      text: "Hey! The new prototype for the spatial interface is ready for review. Focus on the glowing state transitions. 🚀 \nWe really need to make sure the 'lock-in' effect feels premium and precise. Let's audit the contrast ratios today.",
      time: '10:45 AM',
      type: 'received',
      isSecure: true
    },
    { 
      id: 2, 
      sender: 'Nomad_One', 
      text: "Understood! I'll dive into the codebase right now. I'm especially interested in how the kinetic motion interacts with the glow layers. \nWill send over the audit reports by EOD.",
      time: '11:02 AM',
      type: 'sent',
      isVerified: true
    }
  ]);

  const conversations = [
    { id: 1, name: 'Sarah Jenkins', lastMsg: 'That sounds like a great plan! See you then.', time: 'Active', active: true, avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 2, name: 'Leo Thompson', lastMsg: 'Did you check the latest design updates?', time: '2h', avatar: 'https://i.pravatar.cc/150?u=leo' },
    { id: 3, name: 'Maya Patel', lastMsg: 'Sent a photo', time: 'Yesterday', unread: true, avatar: 'https://i.pravatar.cc/150?u=maya' },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, view]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'Nomad_One',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
      isVerified: true
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText("");
  };

  const channels = [
    { id: 1, name: 'strategy', type: 'text', active: true, unread: false, category: 'CORE SQUAD' },
    { id: 2, name: 'announcements', type: 'text', active: false, unread: true, category: 'CORE SQUAD' },
    { id: 3, name: 'Scrum Standup', type: 'voice', active: false, unread: false, category: 'CORE SQUAD', members: 2 },
    { id: 4, name: 'general', type: 'text', active: false, unread: false, category: 'HANGOUTS' },
    { id: 5, name: 'Watercooler', type: 'voice', active: false, unread: false, category: 'HANGOUTS' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-dark text-slate-300 font-display">
      {/* Unified Navigation Rail */}
      <nav className="w-[84px] bg-background-dark border-r border-border-accent flex flex-col items-center py-6 shrink-0 z-50">
        <div className="mb-8 relative group cursor-pointer">
          <div className="size-14 bg-primary rounded-2xl flex items-center justify-center glow-orange transform group-hover:scale-105 transition-all">
            <span className="material-symbols-outlined text-background-dark font-bold text-3xl">bolt</span>
          </div>
          <div className="absolute -bottom-1 -right-1 size-5 bg-background-dark border border-border-accent rounded-full flex items-center justify-center">
            <div className="size-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <button 
            onClick={() => setView('pings')}
            className={`size-12 rounded-xl flex items-center justify-center transition-all group cursor-pointer ${view === 'pings' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-surface-accent'}`}
          >
            <span className={`material-symbols-outlined text-2xl ${view === 'pings' ? 'fill-1 animate-pulse' : 'group-hover:text-primary'}`}>chat_bubble</span>
          </button>
          
          <div className="relative flex flex-col items-center gap-1">
            <button 
              onClick={() => setView('spaces')}
              className={`size-12 rounded-xl flex items-center justify-center transition-all group cursor-pointer ${view === 'spaces' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-surface-accent'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${view === 'spaces' ? 'fill-1' : 'group-hover:text-primary'}`}>group_work</span>
            </button>
            {view === 'spaces' && <div className="w-1.5 h-1.5 rounded-full bg-primary glow-orange"></div>}
          </div>

          <button className="size-12 rounded-xl flex items-center justify-center text-slate-500 hover:bg-surface-accent transition-all group cursor-pointer">
            <span className="material-symbols-outlined text-2xl group-hover:text-primary transition-colors">explore</span>
          </button>

          <div className="w-8 h-px bg-border-accent my-2"></div>

          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`size-12 rounded-xl flex items-center justify-center transition-all group cursor-pointer ${!isSidebarOpen ? 'bg-primary/20 text-primary shadow-[0_0_15px_rgba(255,123,0,0.3)]' : 'text-slate-500 hover:bg-surface-accent'}`}
          >
            <span className="material-symbols-outlined text-2xl">{isSidebarOpen ? 'menu_open' : 'side_navigation'}</span>
          </button>

          {/* Server Icons (Mock) */}
          <div className="flex flex-col gap-4">
            <div className="energy-ring cursor-pointer">
              <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-background-dark">
                <span className="material-symbols-outlined text-2xl font-bold">category</span>
              </div>
            </div>
            <div className="size-12 rounded-xl bg-surface-accent border border-border-accent flex items-center justify-center hover:border-primary/50 cursor-pointer group transition-all">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-slate-200">terminal</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <button className="size-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-2xl">settings</span>
          </button>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5, borderColor: '#ff7b00' }}
            whileTap={{ scale: 0.9 }}
            className="size-12 rounded-2xl overflow-hidden border-2 border-primary/30 p-0.5 cursor-pointer transition-colors relative group"
          >
            <img alt="User avatar" className="w-full h-full object-cover rounded-xl" src="https://i.pravatar.cc/150?u=me"/>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
      </nav>

      {/* Sidebar: Conversation List or Channel List */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: 280, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-background-dark border-r border-border-accent flex flex-col shrink-0 overflow-hidden relative m-2 rounded-2xl shadow-[20px_0_40px_rgba(0,0,0,0.3)] z-40"
          >
            <div className="h-16 flex items-center px-4 border-b border-border-accent justify-between shrink-0">
              <h2 className="font-bold text-white tracking-tight uppercase">
                {view === 'pings' ? 'Pings' : 'DESIGN ALPHA'}
              </h2>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="size-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
              {view === 'pings' ? (
                <div className="space-y-4">
                  {conversations.map((conv, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ x: 5, backgroundColor: 'rgba(255, 123, 0, 0.05)' }}
                        transition={{ delay: i * 0.1 }}
                        key={conv.id} 
                        onClick={() => setView('pings')}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all relative group overflow-hidden ${conv.active ? 'ping-item-active' : ''}`}
                      >
                        {conv.active && (
                          <motion.div 
                            layoutId="active-pill"
                            className="absolute left-0 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_15px_rgba(255,123,0,0.5)]"
                          />
                        )}
                        <div className="relative shrink-0">
                          <div className={`size-12 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${conv.active ? 'border-primary rotate-3' : 'border-white/10 group-hover:border-primary/50'}`}>
                            <img src={conv.avatar} className="w-full h-full object-cover" alt="" />
                          </div>
                          {conv.active && (
                            <div className="absolute -bottom-1 -right-1 size-4 bg-primary border-2 border-background-dark rounded-full flex items-center justify-center">
                              <div className="size-1.5 bg-white rounded-full animate-pulse" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <p className={`text-sm font-black tracking-tight ${conv.unread ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>{conv.name}</p>
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{conv.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate font-bold group-hover:text-slate-400">{conv.lastMsg}</p>
                        </div>
                      </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  {['CORE SQUAD', 'HANGOUTS'].map(cat => (
                    <div key={cat}>
                      <button className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest mb-2 w-full">
                        <span className="material-symbols-outlined text-[14px]">expand_more</span>
                        {cat}
                      </button>
                      <div className="space-y-0.5">
                        {channels.filter(c => c.category === cat).map(ch => (
                          <div key={ch.id} className={`flex items-center justify-between px-2 py-1.5 rounded-lg group cursor-pointer transition-colors ${ch.active ? 'bg-primary/10 text-primary' : 'text-slate-400 hover:bg-surface-accent hover:text-slate-200'}`}>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-lg opacity-70">
                                {ch.type === 'text' ? 'tag' : 'volume_up'}
                              </span>
                              <span className="text-sm font-medium">{ch.name}</span>
                            </div>
                            {ch.unread && <div className="size-1.5 rounded-full bg-primary glow-orange"></div>}
                            {ch.members && <div className="size-4 rounded-full bg-surface-accent flex items-center justify-center text-[8px]">{ch.members}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background-dark relative">
        <header className="h-16 border-b border-border-accent flex items-center justify-between px-6 bg-background-dark/80 backdrop-blur-md sticky top-0 z-10 font-bold">
          <div className="flex items-center gap-3">
            {view === 'pings' ? (
              <div className="size-11 rounded-xl overflow-hidden border border-primary/20 rotate-3 glow-orange">
                <img src="https://i.pravatar.cc/150?u=sarah" alt="" />
              </div>
            ) : (
              <span className="material-symbols-outlined text-slate-500">tag</span>
            )}
            <div>
              <h2 className="text-lg text-white font-black italic tracking-tight">
                {view === 'pings' ? 'Sarah Jenkins' : 'strategy'}
              </h2>
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#ff7b00]" />
                <p className="text-[10px] text-primary/80 font-black uppercase tracking-widest">
                  {view === 'pings' ? 'Active Link' : 'Secure Core'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            {view === 'pings' && (
              <>
                <button className="hover:text-primary transition-all cursor-pointer p-2 hover:bg-primary/10 rounded-xl"><span className="material-symbols-outlined text-xl">videocam</span></button>
                <button className="hover:text-primary transition-all cursor-pointer p-2 hover:bg-primary/10 rounded-xl"><span className="material-symbols-outlined text-xl">call</span></button>
                <div className="w-px h-6 bg-border-accent mx-1"></div>
              </>
            )}
            <button className="hover:text-white transition-colors cursor-pointer p-2"><span className="material-symbols-outlined">push_pin</span></button>
            <button 
              onClick={() => setIsMemberListOpen(!isMemberListOpen)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${isMemberListOpen ? 'text-primary bg-primary/10' : 'text-slate-500 hover:text-white'}`}
            >
              <span className="material-symbols-outlined">group</span>
            </button>
          </div>
        </header>

        <div className={`flex-1 flex min-w-0 relative overflow-hidden ${view === 'spaces' && isMemberListOpen ? 'xl:pr-0' : ''}`}>
          <div className="flex-1 flex flex-col min-w-0 relative">
            {view === 'pings' ? (
              <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 scroll-smooth">
                <div className="flex justify-center my-8">
                  <span className="px-5 py-1.5 bg-primary/5 text-[9px] text-primary font-black rounded-full uppercase tracking-[0.3em] border border-primary/10 shadow-[0_0_20px_rgba(255,123,0,0.05)]">Decrypted Stream: Today</span>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, rotateX: 90, y: 100, scale: 0.8 }} 
                      animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.5, y: -50 }}
                      transition={{ 
                        type: 'spring', 
                        damping: 15, 
                        stiffness: 100,
                        mass: 0.6
                      }}
                      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
                      className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'} relative z-10 origin-bottom`}
                    >
                      <div className={`max-w-[75%] p-4 rounded-3xl ${msg.type === 'sent' ? 'bg-primary/20 rounded-tr-none shadow-[0_20px_50px_rgba(255,123,0,0.2)]' : 'bg-surface-accent rounded-tl-none shadow-[0_30px_60px_rgba(0,0,0,0.6)]'} message-bubble border-none relative z-10 group/msg`}>
                         {msg.type === 'sent' && <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full -mr-12 -mt-12" />}
                         <p className={`text-[15px] leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-wrap ${msg.type === 'sent' ? 'text-white font-bold' : 'text-slate-200 font-medium'}`}>
                          {msg.text}
                         </p>
                         <motion.div 
                           initial={{ opacity: 0, x: msg.type === 'sent' ? 10 : -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.3 }}
                           className="flex justify-end mt-2 gap-2 items-center"
                         >
                            <span className={`${msg.type === 'sent' ? 'text-primary/60' : 'text-slate-500'} text-[9px] font-black uppercase tracking-tighter`}>
                              {msg.time} {msg.isSecure ? '// SECURE' : ''}
                            </span>
                            {msg.isVerified && <span className="material-symbols-outlined text-[16px] text-primary font-black">verified</span>}
                         </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 scroll-smooth">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-primary/10"></div>
                  <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase">Security Log: Today</span>
                  <div className="flex-1 h-px bg-primary/10"></div>
                </div>

                <AnimatePresence mode="popLayout" initial={false}>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, rotateX: 90, y: 100, scale: 0.8 }} 
                      animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }} 
                      transition={{ 
                        type: 'spring', 
                        damping: 15, 
                        stiffness: 100,
                        mass: 0.6
                      }}
                      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
                      className="flex gap-4 group origin-bottom z-10"
                    >
                      <div className="size-12 rounded-2xl overflow-hidden shrink-0 border-none rotate-2 shadow-2xl">
                        <img alt="" className="w-full h-full object-cover shadow-lg" src={msg.type === 'sent' ? "https://i.pravatar.cc/150?u=me" : "https://i.pravatar.cc/150?u=sarah"}/>
                      </div>
                      <div className="flex-1 flex flex-col gap-2 min-w-0">
                        <div className="flex items-center gap-3">
                           <span className="text-sm font-black text-white group-hover:text-primary transition-colors cursor-pointer italic">{msg.sender}</span>
                           {msg.type === 'received' && <span className="px-2 py-0.5 rounded-lg text-[8px] bg-primary/20 text-primary border-none font-black uppercase tracking-tighter">Architect</span>}
                           <span className="text-[9px] font-black text-slate-700">{msg.time}</span>
                        </div>
                        <div className={`${msg.type === 'sent' ? 'bg-primary/5 border-l-2 border-primary/20 shadow-[0_30px_60px_rgba(255,123,0,0.1)]' : 'bg-surface-accent shadow-[0_30px_60px_rgba(0,0,0,0.6)]'} p-4 rounded-2xl rounded-tl-none message-bubble border-none`}>
                          <div className={`text-[15px] leading-relaxed break-words [overflow-wrap:anywhere] ${msg.type === 'sent' ? 'text-slate-100' : 'text-slate-200'}`}>
                            {msg.text}
                          </div>
                        </div>
                        {msg.type === 'received' && (
                          <div className="mt-2 flex items-center gap-4 bg-surface-accent/40 p-3 rounded-2xl border-none hover:bg-surface-accent/60 transition-all cursor-pointer w-fit max-w-sm group/file">
                            <div className="size-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover/file:bg-primary group-hover/file:text-background-dark transition-all shadow-inner">
                              <span className="material-symbols-outlined">draw</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-black text-slate-200 truncate font-space">v2-spatial-design.figma</h4>
                              <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">14.2 MB // ENCRYPTED</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-500 group-hover/file:text-white transition-colors">download</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="h-32 shrink-0" />
              </div>
            )}
            {/* Floating Unified Chat Input Area */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
              <form 
                onSubmit={handleSend}
                className={`bg-background-dark/40 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] p-2 flex items-center gap-2 focus-within:border-primary/30 transition-all ${view === 'pings' ? '' : 'shadow-[0_40px_100px_rgba(255,123,0,0.1)]'}`}
              >
                {view === 'pings' ? (
                  <>
                    <button type="button" className="size-12 rounded-2xl text-slate-500 hover:text-primary transition-all cursor-pointer hover:rotate-12 transform shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-2xl">add_circle</span></button>
                    <div className="flex-1 flex items-center px-2">
                      <input 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
                        className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-[15px] placeholder:text-slate-600 text-slate-200 font-bold" 
                        placeholder="Transmission node active... Type here" 
                        type="text"
                      />
                      <div className="flex gap-4 text-slate-500 mx-2">
                         <button type="button" className="hover:text-primary transition-colors cursor-pointer outline-none"><span className="material-symbols-outlined text-xl">mood</span></button>
                         <button type="button" className="hover:text-primary transition-colors cursor-pointer outline-none"><span className="material-symbols-outlined text-xl">attach_file</span></button>
                      </div>
                    </div>
                    <motion.button 
                      type="submit"
                      onClick={handleSend}
                      whileHover={{ scale: 1.05, rotate: -5 }}
                      whileTap={{ scale: 0.9, y: 5 }}
                      className="size-12 rounded-2xl bg-primary text-background-dark flex items-center justify-center shadow-[0_10px_20px_rgba(255,123,0,0.3)] cursor-pointer outline-none border-none shrink-0"
                    >
                      <span className="material-symbols-outlined font-black text-2xl">rocket_launch</span>
                    </motion.button>
                  </>
                ) : (
                  <div className="w-full flex items-center gap-2 px-1">
                    <button type="button" className="size-12 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-background-dark transition-all cursor-pointer border-none shadow-inner group outline-none flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined group-hover:scale-125 transition-transform">bolt</span>
                    </button>
                    <input 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
                      className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm font-black placeholder:text-slate-700 text-white tracking-tight px-2" 
                      placeholder="BROADCAST TO #STRATEGY" 
                      type="text"
                    />
                    <motion.button 
                      type="submit"
                      onClick={handleSend}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,123,0,0.4)" }}
                      whileTap={{ scale: 0.95, y: 5 }}
                      className="size-12 rounded-2xl bg-primary text-background-dark flex items-center justify-center cursor-pointer border-none outline-none shrink-0"
                    >
                      <span className="material-symbols-outlined font-black text-2xl">send</span>
                    </motion.button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* User Sidebar (Only in Spaces) */}
        <AnimatePresence>
          {view === 'spaces' && isMemberListOpen && (
            <motion.aside 
              initial={{ width: 0, opacity: 0, x: 20 }}
              animate={{ width: 280, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-background-dark border-l border-border-accent flex flex-col shrink-0 overflow-hidden relative m-2 rounded-2xl shadow-[-20px_0_40px_rgba(0,0,0,0.3)] z-40"
            >
              <div className="h-16 flex items-center px-4 border-b border-border-accent justify-between shrink-0">
                <h3 className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">Members</h3>
                <button 
                  onClick={() => setIsMemberListOpen(false)}
                  className="size-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4">ONLINE — 2</h3>
                  <div className="space-y-4">
                    {[1, 2].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all"
                      >
                        <div className="relative">
                          <img alt="" className="size-9 rounded-xl" src={i === 0 ? "https://i.pravatar.cc/150?u=sarah" : "https://i.pravatar.cc/150?u=leo"}/>
                          <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 border-2 border-background-dark rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-primary truncate italic">{i === 0 ? 'Sarah Jenkins' : 'Leo Thompson'}</span>
                            <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                          </div>
                          <p className="text-[10px] text-slate-500 truncate font-medium">Core Member</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4">OFFLINE — 12</h3>
                  <div className="space-y-4">
                     {[1, 2, 3].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex items-center gap-3 grayscale hover:grayscale-0 cursor-pointer p-2 -mx-2 rounded-xl transition-all"
                      >
                        <img alt="" className="size-9 rounded-xl" src={`https://i.pravatar.cc/150?u=${i + 10}`}/>
                        <p className="text-xs font-bold text-slate-300">Offline_User_{i}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
      </main>

      {/* Spatial Background Orbs */}
      <div className="fixed top-1/2 -right-20 size-64 bg-primary rounded-full blur-[120px] opacity-[0.03] pointer-events-none" />
      <div className="fixed bottom-0 -left-20 size-80 bg-primary rounded-full blur-[140px] opacity-[0.05] pointer-events-none" />
    </div>
  );
};

export default DashboardPage;
