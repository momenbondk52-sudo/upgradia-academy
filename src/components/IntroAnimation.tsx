import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Zap, Globe, Brain, Users } from "lucide-react";
import { soundManager } from "../utils/soundManager";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({
  onComplete,
}: IntroAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    soundManager.playTransition();

    const timer1 = setTimeout(() => {
      setStage(1);
      soundManager.playNotification();
    }, 1500);

    const timer2 = setTimeout(() => {
      setStage(2);
      soundManager.playXPGain();
    }, 3000);

    const timer3 = setTimeout(() => {
      setStage(3);
      soundManager.playSuccess();
    }, 4500);

    const timer4 = setTimeout(() => {
      soundManager.playTransition();
      onComplete();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center game-background overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 web-pattern opacity-30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background:
                i % 3 === 0
                  ? "#ff2b36"
                  : i % 3 === 1
                    ? "#1e7dd6"
                    : "#00d9ff",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.8,
          }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-1 glow-red animate-glow-pulse">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <Zap
                className="w-16 h-16 text-primary"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Orbiting Icons */}
          {stage >= 1 && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center glow-blue"
              >
                <Globe className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -360 }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
                className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center glow-cyan"
              >
                <Brain className="w-5 h-5 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
                className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                style={{
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                }}
              >
                <Users className="w-5 h-5 text-white" />
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Title */}
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-2 gradient-text">
              UPGRADIA
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Academy
            </p>
          </motion.div>
        )}

        {/* Tagline */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-4 rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-primary/30 glow-red"
          >
            <p className="text-lg md:text-xl text-center">
              <span className="text-glow-red">Learn.</span>{" "}
              <span className="text-glow-blue">Level Up.</span>{" "}
              <span className="text-glow-cyan">
                Unlock Your Potential.
              </span>
            </p>
          </motion.div>
        )}

        {/* Loading Bar */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 300 }}
            className="h-2 bg-muted/30 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
              style={{
                boxShadow: "0 0 20px rgba(255, 43, 54, 0.6)",
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-full blur-2xl" />
    </motion.div>
  );
}