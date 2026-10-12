import { motion } from "framer-motion";
import { Mail, Phone, Instagram } from "lucide-react";
import logoWordmark from "@/assets/logo-wordmark.png";

export function ComingSoonOverlay() {
  return (
    <div
      id="coming-soon-landing"
      aria-label="One of None"
      className="fixed inset-0 z-50 min-h-screen w-full flex items-center justify-center px-4 select-none overflow-hidden text-[#50131D]"
    >
      {/* =========================================================================
          BACKGROUND LAYER: PURE LUXURY WARM BEIGE (NO SHADOWS)
          - Clean, smooth luxury warm cream / alabaster beige surface
          - Completely free of shadows, purely serene and minimalist
         ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[#F7F3EA]"
          style={{
            backgroundColor: "#F7F3EA",
            backgroundImage:
              "radial-gradient(circle at 50% 35%, #FAF7F0 0%, #F5EFE4 55%, #ECE3D2 100%)",
          }}
        />
        {/* Soft, gentle ambient illumination */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,253,248,0.7),transparent_70%)] blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
          CENTERPIECE: BRAND LOGO + THREE ICONS DIRECTLY BELOW
          - Perfectly centered vertically & horizontally
          - Three standalone geometric shapes (Circle, Squircle, Rounded Hexagon)
            with zero connecting lines
          - Smooth blank-to-filled animation with burgundy color (#50131D)
          - Official custom brand wordmark "ONE OF NONE PERFUME"
          - Three minimal luxury icon links placed directly below
         ========================================================================= */}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center text-center z-10 pointer-events-auto group cursor-default"
      >
        {/* The 3 Geometric Shapes (Circle, Squircle, Rounded Hexagon) without connections */}
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 357 114"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 sm:w-36 md:w-44 h-auto text-[#50131D]"
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
          className="w-40 sm:w-48 md:w-56 h-auto object-contain mx-auto mt-4 sm:mt-5 transition-transform duration-500 group-hover:scale-[1.01]"
          draggable={false}
        />

        {/* Three Burgundy Icons Placed Directly on the Background (No Container Background) */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Contact and Social links"
          className="mt-7 sm:mt-9 md:mt-11 flex items-center justify-center gap-x-4 sm:gap-x-5 text-[#50131D]"
        >
          {/* Phone Icon Link */}
          <a
            href="tel:+919007496100"
            title="+91 90074 96100"
            className="p-1.5 transition-all duration-300 hover:opacity-50 hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#50131D]/40 text-[#50131D]"
            aria-label="Call +91 90074 96100"
          >
            <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
          </a>

          {/* Thin Hairline Burgundy Divider */}
          <span
            className="h-3.5 sm:h-4 w-px bg-[#50131D]/25"
            aria-hidden="true"
          />

          {/* Email Icon Link */}
          <a
            href="mailto:info@oneofnonecollective.com"
            title="info@oneofnonecollective.com"
            className="p-1.5 transition-all duration-300 hover:opacity-50 hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#50131D]/40 text-[#50131D]"
            aria-label="Email info@oneofnonecollective.com"
          >
            <Mail className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
          </a>

          {/* Thin Hairline Burgundy Divider */}
          <span
            className="h-3.5 sm:h-4 w-px bg-[#50131D]/25"
            aria-hidden="true"
          />

          {/* Instagram Icon Link */}
          <a
            href="https://www.instagram.com/oneofnonecollective?utm_source=qr&rpxt=MWRjanZlc3F2cGp2Mw=="
            target="_blank"
            rel="noopener noreferrer"
            title="@oneofnonecollective"
            className="p-1.5 transition-all duration-300 hover:opacity-50 hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#50131D]/40 text-[#50131D]"
            aria-label="Instagram @oneofnonecollective"
          >
            <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
          </a>
        </motion.nav>
      </motion.main>
    </div>
  );
}

export default ComingSoonOverlay;
