import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const COUNTDOWN_STORAGE_KEY = "one_of_none_launch_target";
// 2 months = 60 days (+ 12 hours buffer so it displays 60 days)
const TWO_MONTHS_MS = 60 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000;

function getLaunchTarget(): number {
  if (typeof window === "undefined") return Date.now() + TWO_MONTHS_MS;
  const stored = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
  if (stored) {
    const val = parseInt(stored, 10);
    if (!isNaN(val) && val > Date.now()) return val;
  }
  const newTarget = Date.now() + TWO_MONTHS_MS;
  try {
    localStorage.setItem(COUNTDOWN_STORAGE_KEY, newTarget.toString());
  } catch {}
  return newTarget;
}

function calculateRemaining(targetMs: number) {
  const diff = Math.max(0, targetMs - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function ComingSoonOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [targetTimestamp] = useState(() => getLaunchTarget());
  const [timeLeft, setTimeLeft] = useState({
    days: 60,
    hours: 12,
    minutes: 0,
    seconds: 0,
  });

  // Track scroll progress across the 9000+ px underlying page
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live countdown timer ticking down towards 2 months
  useEffect(() => {
    const updateCountdown = () => {
      setTimeLeft(calculateRemaining(targetTimestamp));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetTimestamp]);


  return (
    <>
      {/* 
        Full-Screen Fixed Position Bright Glassmorphic Overlay:
        - fixed inset-0 z-50 w-screen h-screen
        - Bright luminous glassmorphic wash (bg-white/35 backdrop-blur-[15px])
        - Backdrop blur allows underlying animations, videos, and scroll transforms to be visibly active
        - Stays fixed over the entire website as user scrolls from top to bottom
        - Allows native wheel/touch scroll to pass through while keeping background clicks disabled
      */}
      <div
        id="coming-soon-overlay"
        aria-label="Coming Soon Overlay"
        className="fixed inset-0 z-50 h-screen w-screen overflow-hidden flex items-center justify-center select-none pointer-events-none bg-white/35 backdrop-blur-[15px] backdrop-saturate-[170%] backdrop-brightness-[1.04]"
        style={{
          WebkitBackdropFilter: "blur(15px) saturate(170%) brightness(104%)",
          backdropFilter: "blur(15px) saturate(170%) brightness(104%)",
        }}
      >
        {/* Subtle top scroll indicator showing user progress through the site */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/5 z-30">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Ambient subtle light wash */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),rgba(255,255,255,0.1),transparent_70%)] blur-2xl" />
        </div>


        {/* PERFECTLY CENTERED HIGH-CONTRAST COMING SOON CARD */}
        <main className="w-full max-w-2xl px-5 flex flex-col items-center justify-center text-center z-10 py-6 pointer-events-auto">
          {/* ONE OF NONE Brand Logo */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-5 sm:mb-6"
          >
            <img
              src={logo}
              alt="ONE OF NONE"
              className="h-5 sm:h-6 md:h-7 w-auto object-contain mx-auto"
            />
          </motion.div>

          {/* High-Contrast Bold Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-neutral-900 leading-[0.95] drop-shadow-[0_4px_16px_rgba(255,255,255,0.8)]">
              Coming{" "}
              <span className="font-normal italic bg-gradient-to-r from-amber-600 via-rose-600 to-emerald-600 bg-clip-text text-transparent">
                Soon
              </span>
            </h1>

            <p className="max-w-lg mx-auto text-sm sm:text-base md:text-lg font-medium text-neutral-700 tracking-wide leading-relaxed pt-1">
              The essence of luxury is almost here. Prepare to discover your new signature scent.
            </p>
          </motion.div>

          {/* Live Countdown Counter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mt-5 sm:mt-7 max-w-sm w-full"
          >
            {[
              { label: "DAYS", val: timeLeft.days },
              { label: "HOURS", val: timeLeft.hours },
              { label: "MINS", val: timeLeft.minutes },
              { label: "SECS", val: timeLeft.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-2 sm:py-3 px-2 rounded-2xl bg-white/75 border border-white/90 backdrop-blur-md shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
              >
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tabular-nums">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-neutral-500 mt-0.5 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Professional Contact Us Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 sm:mt-8 w-full max-w-lg"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 px-5 py-2.5 rounded-2xl sm:rounded-full bg-white/80 border border-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase shrink-0">
                Contact Us
              </span>

              <div className="hidden sm:block h-3.5 w-px bg-neutral-300/80" />

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                <a
                  href="mailto:info@oneofnonecollective.com"
                  className="inline-flex items-center gap-1.5 font-medium text-neutral-800 hover:text-neutral-950 transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                  <span>info@oneofnonecollective.com</span>
                </a>

                <span className="text-neutral-300">·</span>

                <a
                  href="tel:9007406100"
                  className="inline-flex items-center gap-1.5 font-medium text-neutral-800 hover:text-neutral-950 transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                  <span>9007406100</span>
                </a>
              </div>
            </div>
          </motion.div>

        </main>

      </div>
    </>
  );
}

export default ComingSoonOverlay;
