import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Mail, Anchor, Compass, Award, BookOpen, Bike, MapPin, 
  Volume2, VolumeX, Maximize2, Play, Pause, Linkedin, 
  Instagram, Facebook, Youtube, Github, ExternalLink, 
  ChevronLeft, ChevronRight, Calendar, Zap, Sparkles, 
  ShieldAlert, Send, Heart, Eye, ArrowRight, Book, CheckCircle, Music
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { profileData, Slide } from "./data";

// Custom "白色自刪除訊息" (White Disappearing Message) representing "為為夢夢"
function DisappearingMessage() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  const fullText = "為為夢夢 💖";
  
  useEffect(() => {
    if (isDeleted) return;
    
    let timer: NodeJS.Timeout;
    const speed = isDeleting ? 120 : 200;
    
    const handleType = () => {
      if (!isDeleting) {
        if (displayText.length < fullText.length) {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        } else {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
      timer = setTimeout(handleType, speed);
    };
    
    timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isDeleted]);

  if (isDeleted) {
    return (
      <div className="flex items-center justify-between bg-slate-950/60 border border-slate-900 rounded-lg p-2 text-xs">
        <span className="text-slate-500 italic">🔒 訊息《為為夢夢》已自動安全銷毀 (Self-destructed)</span>
        <button 
          onClick={() => {
            setIsDeleted(false);
            setDisplayText("");
            setIsDeleting(false);
          }}
          className="text-pink-400 hover:text-pink-300 font-bold underline transition-colors"
        >
          重新讀取
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/20 hover:border-white/40 rounded-lg p-2.5 text-xs text-white transition-all duration-300 shadow-md">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        <strong className="text-white">限時自讀密令：</strong>
        <span className="font-mono text-white text-xs tracking-wide bg-white/10 px-2 py-0.5 rounded border border-white/15 min-h-[24px] inline-flex items-center">
          {displayText}
          <span className="w-1.5 h-3.5 bg-white ml-0.5 animate-pulse"></span>
        </span>
      </div>
      <button 
        onClick={() => setIsDeleted(true)}
        className="bg-white/15 hover:bg-red-500/20 text-white hover:text-red-400 border border-white/20 hover:border-red-500/30 px-2 py-1 rounded text-[10px] transition-all font-bold"
        title="手動自我刪除 (Self-destruct)"
      >
        立刻自刪 💥
      </button>
    </div>
  );
}

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [isOceanPlaying, setIsOceanPlaying] = useState(false);
  const [highlightBio, setHighlightBio] = useState<"all" | "motor" | "discipline" | "future">("all");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{ name: string; text: string; time: string }[]>([
    { name: "航海科老學長", text: "宥為這份個人檔案做得太狂了！真的把航海跟重機完美結合，加油！", time: "2026-05-25" },
    { name: "高科大美術系教授", text: "聽聞我們博士班有如此跨領域的奇才，在藝術跟航海、重機改裝上都有如此深造，令人驚嘆。", time: "2026-05-24" }
  ]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isStretching, setIsStretching] = useState(true);

  // HTML5 Audio Player for "吃藥的孩子不會壞，但會變趴帶"
  const audioRef = useRef<HTMLAudioElement | null>(null);

useEffect(() => {
  // 網頁一載入，直接把播放器網址換成你的音樂
  if (audioRef.current) {
    audioRef.current.src = "https://files.catbox.moe/huy6wo.mp3";
  
  }

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
}, []);

  const toggleOceanWaves = () => {
    if (isOceanPlaying) {
      stopSeaWaves();
    } else {
      startSeaWaves();
    }
  };

 

  const startSeaWaves = () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().then(() => {
          setIsOceanPlaying(true);
        }).catch((err) => {
          console.error("Failed to play audio", err);
        });
      }
    } catch (err) {
      console.error("Failed to play audio", err);
    }
  };

  const stopSeaWaves = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsOceanPlaying(false);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    const newComment = {
      name: commentName,
      text: commentText,
      time: new Date().toISOString().split("T")[0]
    };
    setComments([newComment, ...comments]);
    setCommentName("");
    setCommentText("");
  };

  // Profile highlighting filter mapping
  const getHighlightedBio = () => {
    const text = profileData.autobiography;
    if (highlightBio === "all") {
      return (
        <p className="text-slate-300 leading-relaxed text-base tracking-wide whitespace-pre-line font-sans">
          {text}
        </p>
      );
    }

    const keywords: Record<string, string[]> = {
      motor: ["機車", "單車", "車款", "引擎", "改車", "外觀設計", "改裝"],
      discipline: ["運動日記", "訓練身體", "自律", "魄力", "自我克制", "生活誘惑"],
      future: ["探索", "語文能力", "克服", "進步的力量", "多元、更有挑戰性的世界"]
    };

    const targetWords = keywords[highlightBio] || [];
    let parts = [text];

    // Simple structural regex replacement to highlight target groups beautifully
    targetWords.forEach(word => {
      const nextParts: any[] = [];
      parts.forEach(part => {
        if (typeof part === "string") {
          const splitText = part.split(word);
          splitText.forEach((t, index) => {
            nextParts.push(t);
            if (index < splitText.length - 1) {
              nextParts.push(
                <span key={index + word} className="bg-yellow-500/20 text-yellow-300 border-b border-yellow-400 py-0.5 px-1 font-medium rounded-sm">
                  {word}
                </span>
              );
            }
          });
        } else {
          nextParts.push(part);
        }
      });
      parts = nextParts;
    });

    return (
      <p className="text-slate-300 leading-relaxed text-base tracking-wide whitespace-pre-line font-sans">
        {parts.map((p, i) => <span key={i}>{p}</span>)}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-[#03010b] text-slate-100 selection:bg-pink-500 selection:text-slate-900 overflow-x-hidden font-sans relative">
      
      {/* Hidden background music player with omitted referrer headers to safely stream the song */}
      <audio 
        ref={audioRef} 
        src="https://music.163.com/song/media/outer/url?id=1444167389.mp3" 
        loop 
        preload="auto"
        referrerPolicy="no-referrer"
      />
      
      {/* 炫炮 Cyberpunk & Nightclub Strobe Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Cyberpunk Grid Overlay with Hot Magenta/Cyan Tint */}
        <div className="absolute inset-0 cyber-grid opacity-35 mix-blend-color-dodge"></div>

        {/* Cyber Dot Matrix for Strobe Ambient */}
        <div className="absolute inset-0 cyber-dot-matrix opacity-25"></div>
        
        {/* Futuristic Scanning Line Overlay simulating Disco Lasers */}
        <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#ff007f] to-transparent top-0 animate-scanline"></div>
        <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent top-1/2 animate-scanline" style={{ animationDelay: '5s' }}></div>

        {/* Dynamic Vignette Depth Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#03010b_95%)]"></div>

        {/* Rotating Holographic Marine Compass Dial Ring - Left */}
        <div className="absolute top-[10%] left-[-180px] md:left-[-120px] w-[550px] h-[550px] border border-teal-500/10 rounded-full flex items-center justify-center animate-spin-slow opacity-30">
          <div className="w-[470px] h-[470px] border border-dashed border-pink-500/10 rounded-full flex items-center justify-center">
            <div className="w-[410px] h-[410px] border border-indigo-500/10 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-mono text-teal-400/25 tracking-widest absolute uppercase rotate-0 transform translate-y-[-185px]">000° N</span>
              <span className="text-[10px] font-mono text-teal-400/30 tracking-widest absolute uppercase rotate-90 transform translate-x-[185px] rotate-[-90deg]">090° E</span>
              <span className="text-[10px] font-mono text-teal-400/25 tracking-widest absolute uppercase rotate-180 transform translate-y-[185px] rotate-[-180deg]">180° S</span>
              <span className="text-[10px] font-mono text-teal-400/30 tracking-widest absolute uppercase rotate-270 transform translate-x-[-185px] rotate-[-270deg]">270° W</span>
              <Compass className="w-16 h-16 text-teal-500/5 rotate-12" />
            </div>
          </div>
        </div>

        {/* Rotating Holographic Tech Circle - Right */}
        <div className="absolute top-[45%] right-[-180px] md:right-[-120px] w-[600px] h-[600px] border border-indigo-500/10 rounded-full flex items-center justify-center animate-spin-slow-reverse opacity-25">
          <div className="w-[520px] h-[520px] border border-dashed border-teal-500/10 rounded-full flex items-center justify-center">
            <div className="w-[450px] h-[450px] border border-pink-500/10 rounded-full flex items-center justify-center">
              <Compass className="w-20 h-20 text-pink-500/5 rotate-45" />
            </div>
          </div>
        </div>

        {/* Ambient Marine Bioluminescent Micro-Particles / Drifting Speed Sparks */}
        <div className="absolute inset-0 opacity-50">
          {/* Drifting Sparks in outer sky */}
          <div className="absolute top-[15%] left-[12%] w-2 h-2 bg-teal-400 rounded-full blur-[1px] animate-pulse"></div>
          <div className="absolute top-[35%] left-[88%] w-2.5 h-2.5 bg-pink-500 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-[58%] left-[22%] w-2 h-2 bg-yellow-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-[82%] left-[72%] w-2.5 h-2.5 bg-indigo-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '4.5s' }}></div>
          
          {/* Tactical crosshair pings */}
          <div className="absolute top-[48%] left-[10%] w-1 h-1 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-[22%] left-[63%] w-1 h-1 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-[78%] left-[88%] w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '3.8s' }}></div>
        </div>

      </div>
      
      {/* Dynamic Sea Waves Header Overlay Canvas or Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0 opacity-15">
        <svg className="absolute bottom-0 w-[200%] h-full text-teal-500/20 fill-current" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <path d="M0,352L48,346.7C96,341,192,331,288,293.3C384,256,480,192,576,186.7C672,181,768,235,864,256C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z" />
        </svg>
      </div>

      {/* Extreme Nightclub Neon Ambient Backdrop Spotlights */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[#ff007f]/25 via-pink-500/20 via-[#00f0ff]/25 to-purple-800/20 rounded-full blur-[125px] pointer-events-none z-0 animate-rainbow"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-gradient-to-r from-[#00ff00]/20 via-[#00f0ff]/25 via-[#ff007f]/25 to-yellow-500/15 rounded-full blur-[110px] pointer-events-none z-0 animate-rainbow" style={{ animationDelay: '-4s' }}></div>
      <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-gradient-to-r from-fuchsia-600/20 via-pink-200/15 via-[#00ff00]/15 to-[#00f0ff]/25 rounded-full blur-[145px] pointer-events-none z-0 animate-rainbow" style={{ animationDelay: '-8s' }}></div>

      {/* Floating Interactive Ocean Sound Control Drawer */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2">
        <motion.button
          onClick={toggleOceanWaves}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all shadow-lg backdrop-blur-md ${
            isOceanPlaying 
              ? "bg-gradient-to-r from-[#ff007f]/30 via-[#ffff00]/30 to-[#00f0ff]/30 border-pink-400 text-pink-300 shadow-[#ff007f]/40 animate-pulse animate-club-strobe" 
              : "bg-slate-950/90 border-[#ff007f]/30 text-pink-400 hover:border-pink-500/80 hover:shadow-pink-500/20"
          }`}
          id="ocean-synth-btn"
          title="播放陳宥為最愛的背景神曲 －《吃藥的孩子不會壞，但會變趴帶》"
        >
          {isOceanPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-pink-400 animate-bounce animate-pulse" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-yellow-300 to-teal-350 font-bold font-sans text-xs md:text-sm">音樂播放中《吃藥的孩子不會壞，但會變趴帶》</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 font-bold" />
              <span className="font-sans text-xs md:text-sm">播放音樂《吃藥的孩子不會壞，但會變趴帶》</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Top Banner with dynamic elements */}
      <header className="relative z-10 pt-20 pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Hero Avatar on the Left (lg:col-span-4) - EXTREMELY FLASHY NEON WORK */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative group">
              {/* Ultra Shimmering Strobe Club Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff007f] via-[#00f0ff] via-[#00ff00] via-[#ffff00] via-[#ff007f] to-[#ff007f] rounded-2xl blur-lg opacity-95 animate-club-strobe group-hover:opacity-100 transition duration-500 shadow-[0_0_55px_rgba(255,0,127,0.9)]"></div>
              
              {/* Overlay Laser grid effects */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-10 opacity-80">
                <div className="disco-laser-beam scale-150"></div>
                <div className="disco-laser-beam scale-125 rotate-90" style={{ animationDelay: '2.4s' }}></div>
              </div>

              {/* Extra flashing strobe pulse line ring */}
              <div className="absolute -inset-2 bg-transparent rounded-2xl border-4 border-dashed border-[#00f0ff] animate-spin-slow opacity-95 z-20 pointer-events-none"></div>

              {/* High precision avatar image with blinking shadow borders */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 bg-black rounded-2xl border-4 border-white animate-club-strobe overflow-hidden flex items-center justify-center shadow-[0_0_50px_#ff007f] z-10">
                <img 
                  src={profileData.avatar} 
                  alt="陳宥為" 
                  className="w-full h-full object-cover brightness-[1.15] contrast-[1.1] group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  id="user-avatar-img"
                />
                
                {/* Visual Laser layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-cyan-500/10 mix-blend-overlay pointer-events-none"></div>

                <div className="absolute bottom-3 left-3 bg-black/95 backdrop-blur-md border border-[#ff007f] px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs shadow-[0_0_15px_rgba(255,0,127,0.7)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  <span className="text-[#ff007f] font-mono font-black tracking-widest uppercase">⚡ 19歲 • RAVE DJ</span>
                </div>
              </div>
            </div>

            {/* Sub Profile details beneath the image with glowing hover borders */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="bg-slate-950/90 hover:border-[#ff007f]/80 hover:shadow-[#ff007f]/30 transition-all border border-[#ff007f]/40 px-3 py-2 rounded-full text-[22px] text-pink-300 font-bold shadow-[0_0_8px_rgba(255,0,127,0.3)]">
                星座：{profileData.constellation}
              </span>
              <span className="bg-slate-950/90 hover:border-yellow-500/80 hover:shadow-yellow-500/30 transition-all border border-yellow-500/40 px-3 py-2 rounded-full text-[22px] text-yellow-300 font-bold shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                血型：{profileData.bloodType}
              </span>
              <span className="bg-slate-950/90 hover:border-[#00f0ff]/80 hover:shadow-[#00f0ff]/30 transition-all border border-[#00f0ff]/40 px-3 py-2 rounded-full text-[22px] text-cyan-300 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)] font-mono">
                生日：{profileData.birthday}
              </span>
            </div>
          </div>

          {/* Hero Bio Information on the Right (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-3 w-full flex flex-col items-center lg:items-start relative z-20 overflow-hidden py-6 px-4 md:px-8 bg-black/45 rounded-3xl border border-white/5 shadow-[inset_0_0_40px_rgba(255,0,127,0.05)]">
              
              <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-teal-500/10 border border-teal-500/30 px-3 py-2 rounded-md text-[20px] text-teal-350 font-bold font-mono uppercase tracking-wider shadow-inner w-[300px] mx-auto lg:mx-0">
                <Anchor className="w-5 h-5 text-teal-400 rotate-12 shrink-0 animate-pulse" /> 國立高雄科技大學 博士班
              </div>
              
              {/* Dynamic Rainbow text heading */}
              <h1 className="text-5xl md:text-[76px] font-black tracking-tight animate-club-text-flicker py-1 font-display w-full text-center relative z-10" id="profile-name">
                {profileData.name}
              </h1>
              
              <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-450 via-teal-350 to-indigo-350 relative z-10">
                {profileData.title}
              </p>
            </div>

            {/* Horizontal Rider Container directly between Name Box and Motto Box */}
            <div className="w-full h-0 relative overflow-visible pointer-events-none z-10">
              <motion.div
                className="absolute -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-[#ff007f] overflow-hidden shadow-[0_0_35px_#ff007f] flex items-center justify-center bg-black"
                initial={{ left: "-50%", rotate: 0 }}
                animate={{
                  left: ["-50%", "150%"],
                  rotate: [12, -8, 15, -12, 12],
                }}
                transition={{
                  duration: 3.8,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              >
                <img 
                  src="https://cdn.phototourl.com/free/2026-05-25-db10f4e7-7745-4003-8f9f-fbc21ff3e722.jpg" 
                  alt="Rider Moving" 
                  className="w-full h-full object-cover brightness-[1.12] contrast-[1.15]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/30 to-transparent mix-blend-color-dodge"></div>
              </motion.div>

              {/* Hypersonic neon smoke trailing behind the bike */}
              <motion.div
                className="absolute h-1 bg-gradient-to-r from-transparent via-[#ff007f] to-transparent w-44 -translate-y-1/2"
                initial={{ left: "-50%" }}
                animate={{
                  left: ["-50%", "150%"],
                }}
                transition={{
                  duration: 3.8,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              />
            </div>

            {/* Rainbow-styled customized motto quote box with beautiful left stripe */}
            <div className="bg-slate-950/90 border-l-4 border-pink-500 p-6 rounded-r-xl shadow-2xl relative z-20 overflow-hidden group/motto rainbow-glow">
              
              <div className="absolute top-0 right-0 p-3 text-pink-500/10 group-hover/motto:text-pink-500/20 group-hover/motto:rotate-45 transition-all duration-700">
                <Compass className="w-24 h-24" />
              </div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-yellow-100 to-teal-200 italic text-base md:text-lg font-bold leading-relaxed relative z-10 font-display">
                「{profileData.motto}」
              </p>
            </div>

            {/* Email Contact bar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full">
              <div className="flex items-center gap-2 text-slate-300 bg-slate-950/90 border border-slate-800 px-4 py-3 rounded-xl w-full sm:w-auto overflow-hidden shadow-md">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="font-mono text-sm font-bold break-all text-slate-100">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={copyEmailToClipboard}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-400 hover:to-yellow-400 text-slate-950 text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  id="copy-email-btn"
                >
                  {copiedEmail ? "複製成功！" : "複製電子郵件"}
                </button>
                <div className="flex items-center gap-1.5">
                  <a href={profileData.socials.instagram} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors shadow">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href={profileData.socials.linkedin} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-yellow-400 hover:border-yellow-500/40 transition-colors shadow">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={profileData.socials.facebook} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:border-teal-500/40 transition-colors shadow">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Warning intro callout with crimson glows */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto pb-12">
        <div className="bg-gradient-to-r from-red-950/40 via-slate-950 to-red-950/40 border border-red-500/30 p-6 md:p-8 rounded-2xl shadow-xl shadow-red-950/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 shrink-0 mt-1 shadow-inner shadow-red-500/5">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-red-400 font-bold font-display tracking-wider text-sm flex items-center gap-2 uppercase">
                宥為警告宣言 • Warning Declaration
              </h3>
              <p className="text-slate-350 text-base md:text-lg leading-relaxed font-sans font-medium">
                {profileData.warningIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core split content grid */}
      <main className="relative z-10 px-6 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (lg:col-span-8) for Experiece, Projects & Autobiography */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Work Experience */}
          <section className="relative overflow-hidden bg-black/90 border-4 border-[#ff007f] p-6 md:p-8 rounded-2xl space-y-6 shadow-[0_0_40px_rgba(255,0,127,0.7)] animate-club-strobe group" id="work-experience-section">
            
            {/* Visual Disco Laser layer within card */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0 opacity-40">
              <div className="disco-laser-beam scale-150 rotate-45" style={{ animationDuration: '3s', background: 'linear-gradient(90deg, transparent, #ff007f, transparent)' }}></div>
              <div className="disco-laser-beam scale-150 -rotate-45" style={{ animationDuration: '5s', animationDelay: '1.5s', background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)' }}></div>
            </div>

            {/* Glowing neon spotlight backdrop gradient blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/20 transition-all duration-700"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-b-2 border-[#ff007f]/40 pb-5 gap-4">
              <div className="flex items-center gap-3">
                <Music className="w-8 h-8 text-[#ff007f] animate-bounce shrink-0 shadow-[0_0_15px_#ff007f]" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-black font-display tracking-widest club-neon-text text-white uppercase italic">
                    工作經歷 WORK EXPERIENCE
                  </h2>
                  <p className="text-xs font-mono text-cyan-400 font-bold tracking-widest mt-0.5 uppercase">
                    ✨ CURRENT TRACK: DEEPHOUSE / EXPERIMENTAL
                  </p>
                </div>
              </div>

              {/* REAL-TIME DYNAMIC VISUAL CLUB EQUALIZER */}
              <div className="flex items-end gap-1 px-3 py-1.5 bg-black/80 rounded-lg border border-[#00f0ff]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)] h-10 w-fit">
                {[12, 28, 48, 16, 42, 32, 10, 36, 24, 46, 18, 38, 22].map((height, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 rounded-t-sm ${
                      i % 3 === 0 
                        ? "bg-[#ff007f]" 
                        : i % 3 === 1 
                        ? "bg-[#00f0ff]" 
                        : "bg-[#00ff00]"
                    }`}
                    animate={{
                      height: [
                        `${i * 2 + 6}px`, 
                        `${Math.min(36, height)}px`, 
                        `${i * 1.5 + 4}px`, 
                        "36px", 
                        `${i * 2 + 6}px`
                      ]
                    }}
                    transition={{
                      duration: 0.6 + (i * 0.05),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </div>
            
            {profileData.workExperience.map((exp, index) => (
              <div key={index} className="relative z-10 space-y-4 p-5 rounded-xl border border-white/10 bg-slate-950/85 hover:border-[#00f0ff] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                
                {/* Floating fluorescent speaker mesh graphic */}
                <div className="absolute right-4 top-4 opacity-5 pointer-events-none font-black text-6xl text-[#00f0ff]">
                  🔊
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-white flex items-center gap-2 group-hover:text-pink-300">
                      <span className="text-[#ff007f] text-lg">💿</span> {exp.company}
                    </h3>
                    <p className="text-xs font-mono font-black text-cyan-300 mt-1.5 inline-block bg-cyan-950/60 border border-cyan-400/50 px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      ⚡ {exp.tag}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-black text-yellow-300 border border-yellow-500/40 bg-black/90 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-center shadow-[0_0_8px_rgba(234,179,8,0.2)]">
                    🎧 {exp.period}
                  </span>
                </div>
                
                <ul className="space-y-3.5 pl-1">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3 text-slate-200 text-sm md:text-base leading-relaxed hover:text-white transition-colors">
                      <span className="text-[#00ff00] mt-1.5 font-bold animate-ping text-xs shrink-0 select-none">⚡</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Interactive Project Slide deck */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 md:p-8 rounded-2xl space-y-6 shadow-md rainbow-glow" id="project-portfolio-section">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <Bike className="w-6 h-6 text-pink-500" />
                <div>
                  <h2 className="text-2xl font-black font-display text-rainbow">{profileData.project.title}</h2>
                  <p className="text-sm text-slate-400">{profileData.project.subtitle}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full self-start sm:self-center flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                {profileData.project.date}
              </span>
            </div>

            {/* Simulated Slide deck UI */}
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-850 shadow-inner relative group">
              
              {/* Dynamic image viewer with fade animation */}
              <div className="relative aspect-video w-full bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeSlide}
                    src={profileData.project.slides[activeSlide].image}
                    alt={profileData.project.slides[activeSlide].title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Visual gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                {/* Live GPS positioning indicator representing Hualien Ride */}
                {activeSlide > 0 && (
                  <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono space-y-0.5 pointer-events-none">
                    <p className="text-teal-400 font-semibold">📍 GPS ACTIVE</p>
                    <p className="text-slate-400">
                      {activeSlide === 1 ? "24.0158° N, 121.6184° E" : 
                       activeSlide === 2 ? "23.7954° N, 121.4398° E" : 
                       activeSlide === 3 ? "23.2842° N, 121.3958° E" : 
                       "22.7560° N, 121.1507° E"}
                    </p>
                  </div>
                )}

                <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-800 px-3 py-1.5 rounded-md text-xs font-mono text-teal-400">
                  Slide {activeSlide + 1} of {profileData.project.slides.length}
                </div>
              </div>

              {/* Slide text details wrapper */}
              <div className="p-6 md:p-8 space-y-3 bg-slate-950">
                <h3 className="text-xl font-bold text-slate-100 font-display">
                  {profileData.project.slides[activeSlide].title}
                </h3>
                <p className="text-sm text-teal-400 font-medium">
                  {profileData.project.slides[activeSlide].subtitle || "探索秘境慢活旅程"}
                </p>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed pt-2">
                  {profileData.project.slides[activeSlide].description}
                </p>
              </div>

              {/* Slider Navigation controllers */}
              <div className="flex items-center justify-between border-t border-slate-900 p-4 bg-slate-950">
                <button
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? profileData.project.slides.length - 1 : prev - 1))}
                  className="p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {/* Mini dots selector */}
                <div className="flex items-center gap-1.5">
                  {profileData.project.slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? "w-6 bg-teal-400" : "w-2 bg-slate-700 hover:bg-slate-600"}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveSlide((prev) => (prev === profileData.project.slides.length - 1 ? 0 : prev + 1))}
                  className="p-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          </section>

          {/* Autobiography highlighting exploration */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 md:p-8 rounded-2xl space-y-6 shadow-md rainbow-glow" id="autobiography-section">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-pink-500" />
                <h2 className="text-2xl font-black font-display text-rainbow">自傳 Autobiography</h2>
              </div>
              
              {/* Interactive Bio Filters */}
              <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 border border-slate-850 rounded-lg">
                <button 
                  onClick={() => setHighlightBio("all")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${highlightBio === "all" ? "bg-teal-500 text-slate-950" : "text-slate-400 hover:text-slate-200"}`}
                >
                  完整自傳
                </button>
                <button 
                  onClick={() => setHighlightBio("motor")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${highlightBio === "motor" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "text-slate-400 hover:text-slate-200"}`}
                >
                  🏍️ 機車熱情
                </button>
                <button 
                  onClick={() => setHighlightBio("discipline")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${highlightBio === "discipline" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "text-slate-400 hover:text-slate-200"}`}
                >
                  💪 自律修身
                </button>
                <button 
                  onClick={() => setHighlightBio("future")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${highlightBio === "future" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "text-slate-400 hover:text-slate-200"}`}
                >
                  🚀 未來探索
                </button>
              </div>
            </div>

            <div className="p-1 min-h-[180px]">
              {getHighlightedBio()}
            </div>
          </section>

        </div>

        {/* Right column (lg:col-span-4) for Education, Languages, Certificates & interactive 3D Model */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Education Block */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 rounded-2xl space-y-4 shadow-sm hover:border-pink-500/30 transition-colors">
            <h3 className="text-lg font-black font-display border-b border-slate-805 border-b border-slate-800 pb-2 text-rainbow flex items-center gap-2">
              <Book className="w-4 h-4 text-pink-500" /> 學歷 Education
            </h3>
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 border border-slate-800 bg-slate-950 px-2 py-0.5 rounded">
                  {profileData.education.period}
                </span>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                  博士研究生
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-base">{profileData.education.school}</h4>
                <p className="text-sm text-slate-350 mt-1">
                  {profileData.education.department} — {profileData.education.degree}
                </p>
              </div>
            </div>
          </section>

          {/* Language Proficiency */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 rounded-2xl space-y-4 shadow-sm hover:border-yellow-500/30 transition-colors">
            <h3 className="text-lg font-black font-display border-b border-slate-800 pb-2 text-rainbow flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-500" /> 語言能力 Languages
            </h3>
            
            <div className="space-y-4 pt-2">
              {profileData.languages.map((lang, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-250">{lang.name}</span>
                    <span className="text-xs bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded font-bold font-mono">
                      {lang.level} ({lang.detail})
                    </span>
                  </div>
                  {/* Styled minimalist progress line with Staggered Vortex Dance on Loop */}
                  <div className="h-4 bg-slate-950 rounded-full border border-slate-900 overflow-visible flex items-center px-0.5 relative">
                    <motion.div 
                      className="h-2 bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-[#00f0ff] to-pink-500 rounded-full shadow-[0_0_12px_rgba(255,0,127,0.8)] relative"
                      title={`熟練度: ${lang.progress}%`}
                      initial={{ width: "0%", rotate: 0, scaleY: 1, skewX: 0 }}
                      animate={{
                        width: ["0%", "115%", "15%", "95%", "55%", `${lang.progress}%`],
                        rotate: [0, 180, -180, 360, 0],
                        scaleY: [1, 3.2, 0.4, 2.0, 0.7, 1],
                        skewX: [0, 30, -30, 15, -10, 0],
                        filter: [
                          "hue-rotate(0deg) drop-shadow(0 0 4px #ff007f)",
                          "hue-rotate(120deg) drop-shadow(0 0 15px #00f0ff)",
                          "hue-rotate(240deg) drop-shadow(0 0 20px #00ff00)",
                          "hue-rotate(365deg) drop-shadow(0 0 15px #ffff00)",
                          "hue-rotate(180deg) drop-shadow(0 0 6px #ff007f)",
                          "hue-rotate(0deg) drop-shadow(0 0 8px #ff007f)"
                        ]
                      }}
                      transition={{
                        duration: 4.2,
                        ease: "easeInOut",
                        times: [0, 0.22, 0.45, 0.68, 0.85, 1],
                        repeat: Infinity,
                        repeatDelay: 5.5,
                        delay: index * 0.45,
                      }}
                    >
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-ping"></span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Certifications */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 rounded-2xl space-y-4 shadow-sm hover:border-green-500/30 transition-colors">
            <h3 className="text-lg font-black font-display border-b border-slate-800 pb-2 text-rainbow flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" /> 專業證照 Certifications
            </h3>
            
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {profileData.certifications.map((certs, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    key={index} 
                    className="bg-slate-950 border border-[#ff007f]/20 hover:border-[#ff007f]/60 p-3 rounded-xl flex items-start gap-2.5 hover:border-slate-700 transition-colors h-fit relative z-10"
                    animate={{
                      y: isEven 
                        ? [0, -32, 32, -18, 18, -8, 8, 0] 
                        : [0, 32, -32, 18, -18, 8, -8, 0],
                      scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
                      filter: [
                        "drop-shadow(0 0 0px rgba(0,0,0,0))",
                        "drop-shadow(0 0 12px rgba(255,0,127,0.4))",
                        "drop-shadow(0 0 16px rgba(0,240,255,0.4))",
                        "drop-shadow(0 0 10px rgba(0,255,0,0.3))",
                        "drop-shadow(0 0 8px rgba(234,179,8,0.3))",
                        "drop-shadow(0 0 0px rgba(0,0,0,0))"
                      ],
                    }}
                    transition={{
                      duration: 4.8,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 3.5,
                      delay: index * 0.4,
                    }}
                  >
                    <div className="p-1.5 bg-indigo-500/10 rounded-lg text-[#00f0ff] shrink-0 mt-0.5 shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                      <Award className="w-4 h-4 animate-pulse" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                        <span className="text-xs text-pink-400">⚡</span> {certs.name}
                      </p>
                      <p className="text-xs text-cyan-400 font-medium">{certs.issuedBy}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 3D Model interactive controller and display */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 rounded-2xl space-y-4 shadow-sm hover:border-blue-500/30 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-lg font-black font-display text-rainbow flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" /> 3D 個人化公仔
              </h3>
              <span className="text-[10px] font-mono bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/15">TRIPO3D</span>
            </div>

            <div className="pt-2 space-y-4">
              <a 
                href={profileData.tripoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-850 group flex items-center justify-center cursor-pointer hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300"
              >
                <img 
                  src={profileData.avatar3D} 
                  alt="3D Clay Character Model" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </a>
              <motion.p 
                className="text-[32px] font-black tracking-wider text-pink-400 text-center select-none cursor-pointer"
                style={{ originX: 0.5, originY: 0.5 }}
                animate={{
                  scale: [1, 1.8, 0.3, 2.5, 0.6, 1],
                  rotate: [0, 360, -360, 720, -180, 0],
                  skewX: [0, 25, -25, 12, -12, 0],
                  skewY: [0, -12, 12, -6, 6, 0],
                  color: ["#ff007f", "#00f0ff", "#00ff00", "#ffff00", "#a855f7", "#ff007f"],
                  textShadow: [
                    "0 0 10px #ff007f, 0 0 20px #ff007f",
                    "0 0 20px #00f0ff, 0 0 40px #00f0ff",
                    "0 0 15px #00ff00, 0 0 30px #00ff00",
                    "0 0 20px #ffff00, 0 0 40px #ffff00",
                    "0 0 25px #a855f7, 0 0 50px #a855f7",
                    "0 0 10px #ff007f, 0 0 20px #ff007f"
                  ]
                }}
                transition={{
                  duration: 5.5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 1.5
                }}
              >
                一想到你，哪裡都是你
              </motion.p>
            </div>
          </section>

          {/* Marine Science Skill video component */}
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-850 p-6 rounded-2xl space-y-4 shadow-sm animate-pulse-slow hover:border-pink-500/30 transition-colors">
            <h3 className="text-lg font-black font-display border-b border-slate-800 pb-2 text-rainbow flex items-center gap-2">
              <Anchor className="w-4 h-4 text-pink-500" /> 專長技能 Section
            </h3>
            
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-400 font-bold tracking-wider font-mono">航海科博學多</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              </div>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                專精航海大氣物理學、船艦基本操舵安全與生命防護演練。
              </p>

              <button
                onClick={() => setShowVideoModal(true)}
                className="w-full mt-2 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 text-slate-300 transition-colors"
                id="view-radar-btn"
              >
                <Play className="w-3.5 h-3.5 text-teal-400 fill-teal-400/20" /> 啟動航海雷達系統模擬
              </button>
            </div>

            {/* Added Embedded YouTube Portfolio Video with Hints */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-850 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-pink-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-mono">陳宥為 精選技能發表影片</span>
                </div>
                <span className="text-[10px] bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded-full font-mono border border-pink-500/20">VIDEO PROTOCOL</span>
              </div>

              <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-850 bg-black">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/uXAdOaKDTCs"
                  title="陳宥為 專長技能發表影片"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Tips/prompts area (邊提示影片) */}
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping"></span>
                  💡 影片賞析與核心看點提醒：
                </div>
                <ul className="text-xs text-slate-350 space-y-1.5 pl-3 list-disc font-sans leading-relaxed">
                  <li>
                    <strong className="text-pink-400">精彩操舵：</strong> 影片展示了航海模擬器的精細操作，展現嚴謹學術與實戰合一的技術。
                  </li>
                  <li>
                    <strong className="text-pink-400">重機與航海：</strong> 高速追風、乘風破浪，兩者對速度與專注力的要求是一脈相承的。
                  </li>
                  <li className="list-none pt-1">
                    <DisappearingMessage />
                  </li>
                </ul>
              </div>
            </div>
          </section>

        </div>

      </main>

      {/* Guestbook comment interaction panel */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto pb-16">
        <div className="bg-slate-900/20 border border-slate-850 p-6 md:p-8 rounded-2xl shadow-lg space-y-8 rainbow-glow">
          
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-black font-display flex items-center gap-2 text-rainbow">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500/10" /> 留言板 & 訪客簽到
            </h2>
            <p className="text-sm text-slate-400 mt-1">給陳宥為博士班、重機或航海科一封傾心留言</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Input Form (col 5) */}
            <form onSubmit={handleAddComment} className="md:col-span-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">訪客大名 / 暱稱</label>
                <input 
                  type="text" 
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="卓越的雲則同事 / 探險家"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">留言內容</label>
                <textarea 
                  rows={4}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="與宥為同行，海浪一定會幫你..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-400 hover:to-yellow-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition-all shadow-md shadow-pink-500/10 flex items-center justify-center gap-2"
                id="comment-submit-btn"
              >
                <Send className="w-4 h-4" /> 送出留言
              </button>
            </form>

            {/* List of comments (col 7) */}
            <div className="md:col-span-7 space-y-4 max-h-[350px] overflow-y-auto pr-2">
              <AnimatePresence>
                {comments.map((comment, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 bg-slate-950/80 border border-slate-900 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-teal-400 font-display">{comment.name}</span>
                      <span className="text-slate-500 font-mono">{comment.time}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">{comment.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* Navigation Radar Video Modal Overlay simulator */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b101d] border border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="border-b border-slate-800 p-4 flex justify-between items-center bg-[#090d18]">
                <div className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-teal-400 animate-spin-slow" />
                  <span className="font-bold text-slate-100 font-display">航海雷達與操舵儀模擬系統</span>
                </div>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="text-slate-400 hover:text-white text-xs border border-slate-800 hover:border-slate-700 px-3 py-1 rounded-md bg-slate-900"
                >
                  關閉
                </button>
              </div>

              {/* Simulated Live Radar Scanner */}
              <div className="aspect-video w-full bg-slate-950 p-6 relative flex flex-col items-center justify-center select-none overflow-hidden">
                {/* Radial radar grid background */}
                <div className="absolute w-[300px] h-[300px] rounded-full border border-teal-500/10 flex items-center justify-center">
                  <div className="absolute w-[200px] h-[200px] rounded-full border border-teal-500/20 flex items-center justify-center">
                    <div className="absolute w-[100px] h-[100px] rounded-full border border-teal-500/35"></div>
                  </div>
                </div>

                {/* Rotating scanner swept line */}
                <div className="absolute w-[150px] h-[2px] bg-gradient-to-r from-transparent via-pink-500/20 via-yellow-500/40 to-pink-550 top-1/2 left-1/2 origin-left animate-[spin_3s_linear_infinite]"></div>

                {/* Blips */}
                <div className="absolute w-3.5 h-3.5 bg-pink-500 rounded-full blur-[2px] opacity-75 top-1/3 left-1/4 animate-ping"></div>
                <div className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-[2px] opacity-60 top-[55%] left-2/3 animate-pulse"></div>

                <div className="relative text-center z-10 space-y-4">
                  <Compass className="w-16 h-16 text-pink-400 mx-auto animate-[spin_12s_linear_infinite]" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono tracking-widest font-bold text-rainbow">RADAR SWEEPING ACTIVE</p>
                    <p className="text-xs font-mono text-slate-400">HEADING: 142.5° SE | GPS: CO-ORD LOCKED</p>
                  </div>
                </div>

                {/* Video controls bottom bar */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-slate-850 px-3 py-2 rounded-lg flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">專長技能：航海科博學多</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
                    航海技術核心演練中
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-xs text-slate-500 leading-relaxed text-center border-t border-slate-850">
                本模擬儀代表陳宥為於國立高雄科技大學航海科博士班之研究成果：極端海況避碰與抗風浪操舵學。
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="border-t border-slate-900 relative z-10 bg-[#05080e] py-8 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-6 space-y-3">
          <p className="font-display">
            Designed for <span className="text-slate-300 font-bold">{profileData.name}</span>. All content from original reports and video portfolios.
          </p>
          <div className="flex justify-center gap-4 text-slate-600 font-mono">
            <span>來源: youtube.com/shruonguagu-class</span>
            <span>•</span>
            <span>www.yourator.co</span>
            <span>•</span>
            <span>www.freepik.com</span>
          </div>
          <p className="text-slate-700">© 2026 You-wei Chen. 航海與重旅的精神永垂不朽。</p>
        </div>
      </footer>

    </div>
  );
}

// Inline fallback for custom icon since briefcase isn't destructure-imported or has minor discrepancy
function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}
