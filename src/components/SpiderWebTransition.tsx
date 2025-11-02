import { motion } from "motion/react";

export function SpiderWebTransition() {
  return (
    <motion.div
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={{ clipPath: "circle(0% at 50% 50%)" }}
      exit={{ clipPath: "circle(150% at 50% 50%)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, 
            rgba(255, 43, 54, 0.3) 0%,
            rgba(30, 125, 214, 0.2) 50%,
            transparent 100%
          )
        `,
      }}
    >
      {/* Spider Web Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Radial Lines */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={`radial-${i}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            className="absolute bg-gradient-to-r from-primary/50 via-secondary/30 to-transparent"
            style={{
              left: "50%",
              top: "50%",
              width: "100%",
              height: "2px",
              transformOrigin: "0 50%",
              transform: `rotate(${i * 22.5}deg)`,
            }}
          />
        ))}
        
        {/* Concentric Circles */}
        {[20, 40, 60, 80, 100].map((size, i) => (
          <motion.div
            key={`circle-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="absolute border-2 border-accent/30 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              width: `${size}%`,
              height: `${size}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
