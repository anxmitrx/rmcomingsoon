import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram } from "lucide-react";
import logoWordmark from "@/assets/logo-wordmark.png";
import palmBg from "@/assets/luxury-beige-palm-bg.jpg";

/**
 * Launch Target Date Configuration:
 * Initialized for 60 Days, 11 Hours, 58 Minutes, 00 Seconds target.
 * Persists in localStorage to maintain continuous live countdown across page visits.
 */
const STORAGE_KEY = "one_of_none_launch_timestamp";
const DEFAULT_OFFSET_MS =
  60 * 24 * 60 * 60 * 1000 + // 60 days
  11 * 60 * 60 * 1000 +      // 11 hours
  58 * 60 * 1000;            // 58 mins

function getInitialLaunchTarget(): number {
  if (typeof window === "undefined") return Date.now() + DEFAULT_OFFSET_MS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }
  } catch {}

  const target = Date.now() + DEFAULT_OFFSET_MS;
  try {
    localStorage.setItem(STORAGE_KEY, target.toString());
  } catch {}
  return target;
}

function getRemainingTime(targetMs: number) {
  const difference = Math.max(0, targetMs - Date.now());
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function ComingSoonOverlay() {
  const [targetTime] = useState<number>(() => getInitialLaunchTarget());
  const [timeLeft, setTimeLeft] = useState(() => ({
    days: 60,
    hours: 11,
    minutes: 58,
    seconds: 0,
  }));

  useEffect(() => {
    setTimeLeft(getRemainingTime(targetTime));

    const interval = setInterval(() => {
      setTimeLeft(getRemainingTime(targetTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const countdownUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <div
      id="coming-soon-landing"
      aria-label="One of None — Coming Soon"
      className="fixed inset-0 z-50 min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 sm:py-8 md:py-10 select-none overflow-y-auto overflow-x-hidden text-[#50131D]"
    >
      {/* =========================================================================
          BACKGROUND LAYER: WARM BEIGE WITH DELICATE BOTANICAL PALM SHADOW
          - High-end warm creamy beige alabaster plaster surface
          - Gentle, out-of-focus botanical palm leaf shadow cast from lower left
          - Soft vignette with deep luxury burgundy typography
         ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Palm Shadow Background Image */}
        <div
          className="absolute inset-0 bg-[#F5EFE6] bg-cover bg-center sm:bg-bottom-left transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${palmBg})`,
          }}
        />

        {/* Ambient subtle warm tint wash to ensure typography has peak contrast */}
        <div className="absolute inset-0 bg-[#FAF6EE]/25 backdrop-blur-[0.5px]" />
      </div>

      {/* =========================================================================
          TOP: ANIMATED BRAND IDENTITY
          - Standalone geometric shapes with ZERO CONNECTIONS (no connecting lines)
          - Hypnotic luxury animation: shapes transition from BLANK to FILLED
            with signature burgundy color (#50131D)
          - High-resolution custom brand wordmark "ONE OF NONE PERFUME"
         ========================================================================= */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col items-center justify-center pt-2 pointer-events-auto group cursor-default"
      >
        {/* The 3 Geometric Shapes (Circle, Squircle, Rounded Hexagon) without connections */}
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 357 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 sm:w-24 md:w-28 h-auto text-[#50131D]"
            aria-label="One of None Geometric Mark"
          >
            {/* Shape 1: Circle (Blank to Filled Animation) */}
            <motion.circle
              cx="57"
              cy="57"
              r="47"
              stroke="#50131D"
              strokeWidth="15"
              initial={{ fill: "rgba(80, 19, 29, 0)" }}
              animate={{
                fill: [
                  "rgba(80, 19, 29, 0)",
                  "rgba(80, 19, 29, 1)",
                  "rgba(80, 19, 29, 1)",
                  "rgba(80, 19, 29, 0)",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.22, 0.78, 1],
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            />

            {/* Shape 2: Rounded Square / Squircle (Blank to Filled Animation) - NO CONNECTIONS */}
            <motion.rect
              x="133"
              y="9.5"
              width="95"
              height="95"
              rx="24"
              ry="24"
              stroke="#50131D"
              strokeWidth="15"
              initial={{ fill: "rgba(80, 19, 29, 0)" }}
              animate={{
                fill: [
                  "rgba(80, 19, 29, 0)",
                  "rgba(80, 19, 29, 1)",
                  "rgba(80, 19, 29, 1)",
                  "rgba(80, 19, 29, 0)",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.22, 0.78, 1],
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              }}
            />

            {/* Shape 3: Rounded Hexagon (Blank to Filled Animation) - NO CONNECTIONS */}
            <motion.polygon
              points="284,10 324,10 351,57 324,104 284,104 257,57"
              stroke="#50131D"
              strokeWidth="15"
              strokeLinejoin="round"
              initial={{ fill: "rgba(80, 19, 29, 0)" }}
              animate={{
                fill: [
                  "rgba(80, 19, 29, 0)",
                  "rgba(80, 19, 29, 1)",
                  "rgba(80, 19, 29, 1)",
                  "rgba(80, 19, 29, 0)",
                ],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                times: [0, 0.22, 0.78, 1],
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6,
              }}
            />
          </svg>
        </div>

        {/* Official Wordmark with unique geometric letterforms */}
        <img
          src={logoWordmark}
          alt="ONE OF NONE — PERFUME"
          className="w-28 sm:w-32 md:w-36 h-auto object-contain mx-auto mt-2 sm:mt-2.5 transition-transform duration-500 group-hover:scale-[1.01]"
          draggable={false}
        />
      </motion.header>

      {/* =========================================================================
          CENTER & LOWER CENTER: HERO TYPOGRAPHY & MINIMALIST COUNTDOWN
          - All-caps editorial headline: "COMING SOON" in high-contrast serif
          - Delicate Subtext: High readability, airy tracking
          - Understated Countdown Timer: Slim numbers, subtle dividers
         ========================================================================= */}
      <main className="w-full max-w-2xl flex flex-col items-center justify-center text-center my-auto py-6 sm:py-8 pointer-events-auto">
        {/* Hero Typography */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center space-y-2 sm:space-y-3 px-2"
        >
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-normal text-[#50131D] tracking-[0.14em] sm:tracking-[0.18em] uppercase leading-tight">
            Coming Soon
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#50131D]/75 font-light tracking-wide max-w-md mx-auto leading-relaxed pt-0.5">
            The essence of luxury is almost here. Prepare to discover your new
            signature scent.
          </p>
        </motion.div>

        {/* Minimalist Countdown Timer (Understated, Editorial Proportions) */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 md:mt-12 w-full max-w-lg px-2"
        >
          <div className="flex items-center justify-center w-full">
            {countdownUnits.map((unit, index) => (
              <div
                key={unit.label}
                className={`flex flex-col items-center justify-center px-3 sm:px-5 md:px-7 ${
                  index !== countdownUnits.length - 1
                    ? "border-r border-[#50131D]/18"
                    : ""
                }`}
              >
                {/* Lighter, Refined Serif Number */}
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#50131D] tabular-nums leading-none tracking-normal">
                  {String(unit.value).padStart(2, "0")}
                </span>

                {/* Delicate Tracked-out Label */}
                <span className="font-sans text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.22em] sm:tracking-[0.26em] font-medium text-[#50131D]/60 uppercase mt-1.5 sm:mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* =========================================================================
          BOTTOM: SOBER, ELEGANT CONTACT & SOCIAL BAR
          - Sleek inline row with icons and direct clickable links
          - Phone, Email, and Instagram separated by thin vertical dividers
          - Discreet hover opacity drop maintaining luxury quietude
         ========================================================================= */}
      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center pb-2 sm:pb-3 pointer-events-auto"
      >
        <nav
          aria-label="Contact and Social links"
          className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-[#FAF6EE]/75 border border-[#E5D7C3]/80 shadow-[0_4px_20px_rgba(80,19,29,0.03)] backdrop-blur-md text-[#50131D]"
        >
          {/* Phone Link */}
          <a
            href="tel:+919007496100"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-xs font-normal tracking-wide transition-opacity duration-300 hover:opacity-50"
            aria-label="Call +91 90074 96100"
          >
            <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>+91 90074 96100</span>
          </a>

          {/* Thin Hairline Divider */}
          <span
            className="h-2.5 sm:h-3 w-px bg-[#50131D]/20"
            aria-hidden="true"
          />

          {/* Email Link */}
          <a
            href="mailto:info@oneofnonecollective.com"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-xs font-normal tracking-wide transition-opacity duration-300 hover:opacity-50"
            aria-label="Email info@oneofnonecollective.com"
          >
            <Mail className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>info@oneofnonecollective.com</span>
          </a>

          {/* Thin Hairline Divider */}
          <span
            className="h-2.5 sm:h-3 w-px bg-[#50131D]/20"
            aria-hidden="true"
          />

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/oneofnonecollective?utm_source=qr&rpxt=MWRjanZlc3F2cGp2Mw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-[11px] sm:text-xs font-normal tracking-wide transition-opacity duration-300 hover:opacity-50"
            aria-label="Instagram @oneofnonecollective"
          >
            <Instagram className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>@oneofnonecollective</span>
          </a>
        </nav>
      </motion.footer>
    </div>
  );
}

export default ComingSoonOverlay;
