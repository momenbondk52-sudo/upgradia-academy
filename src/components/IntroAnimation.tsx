import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({
  onComplete,
}: IntroAnimationProps) {
  const [typingComplete, setTypingComplete] = useState(false);
  const text = "Initializing Upgradia Academy_";

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingComplete(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center web-background overflow-hidden">
      {/* Clean Geometric Web Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="webGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#E31B23"
              stopOpacity="0.2"
            />
            <stop
              offset="50%"
              stopColor="#0B57A4"
              stopOpacity="0.2"
            />
            <stop
              offset="100%"
              stopColor="#007ACC"
              stopOpacity="0.2"
            />
          </linearGradient>
        </defs>
        {/* Clean concentric circles */}
        {[150, 250, 350].map((r, i) => (
          <motion.circle
            key={r}
            cx="50%"
            cy="50%"
            r={r}
            fill="none"
            stroke="url(#webGradient)"
            strokeWidth="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
          />
        ))}
        {/* Radial lines - cleaner */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const x1 = 50;
          const y1 = 50;
          const x2 =
            50 + 35 * Math.cos((angle * Math.PI) / 180);
          const y2 =
            50 + 35 * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.line
              key={angle}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#webGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                delay: 0.6 + i * 0.08,
                duration: 0.6,
              }}
            />
          );
        })}
      </svg>

      {/* Logo Drawing Animation */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Logo - Upgradia Text with Neon Effect */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <svg
              width="400"
              height="120"
              viewBox="0 0 400 120"
              className="drop-shadow-2xl"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#E31B23" />
                  <stop offset="100%" stopColor="#0B57A4" />
                </linearGradient>
              </defs>
              <motion.text
                x="200"
                y="70"
                textAnchor="middle"
                fill="url(#logoGradient)"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "52px",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                UPGRADIA
              </motion.text>
            </svg>
          </motion.div>
        </motion.div>

        {/* Typing Text Animation */}
        <motion.div
          className="relative h-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="relative overflow-hidden">
            <motion.p
              className="text-accent whitespace-nowrap tracking-wider"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                delay: 1.5,
                duration: 1,
                ease: "steps(30)",
              }}
            >
              {text}
            </motion.p>
          </div>
        </motion.div>

        {/* Initialize Button */}
        {typingComplete && (
          <motion.button
            onClick={onComplete}
            className="px-12 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg border border-primary/30 transition-all relative overflow-hidden group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="relative z-10 font-semibold tracking-wide">
              INITIALIZE
            </span>

            {/* Clean shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 2.5,
                ease: "linear",
              }}
            />
          </motion.button>
        )}
      </div>
    </div>
  );
}