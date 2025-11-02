import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Globe, Brain, Users } from "lucide-react";
import { soundManager } from "../utils/soundManager";
import { AnimatedBackground } from "./AnimatedBackground";
import logo from "figma:asset/828a75a8b87e649598a39cf68c44d4e2df07d779.png";

interface IntroAnimationProps {
  onComplete: () => void;
  language?: "en" | "ar";
}

export function IntroAnimation({
  onComplete,
  language = "en",
}: IntroAnimationProps) {
  const [stage, setStage] = useState(0);
  const [showPressPrompt, setShowPressPrompt] = useState(false);

  useEffect(() => {
    soundManager.playTransition();

    const timer1 = setTimeout(() => {
      setStage(1);
      soundManager.playNotification();
    }, 1000);

    const timer2 = setTimeout(() => {
      setStage(2);
      soundManager.playXPGain();
    }, 2500);

    const timer3 = setTimeout(() => {
      setStage(3);
      soundManager.playSuccess();
    }, 4000);

    const timer4 = setTimeout(() => {
      setShowPressPrompt(true);
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handlePressAnywhere = () => {
    if (showPressPrompt) {
      soundManager.playTransition();
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center game-background overflow-hidden cursor-pointer"
      onClick={handlePressAnywhere}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            duration: 1.2,
          }}
          className="relative"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-1 glow-red animate-glow-pulse">
            <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center p-3 sm:p-4">
              <img
                src={logo}
                alt="Upgradia Academy"
                className="w-full h-full object-contain"
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
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-2 gradient-text">
              UPGRADIA
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium">
              Academy
            </p>
          </motion.div>
        )}

        {/* Tagline */}
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-2xl bg-card/50 backdrop-blur-xl border-2 border-primary/30 glow-red"
          >
            <p className="text-base sm:text-lg md:text-xl text-center">
              <span className="text-glow-red">Learn.</span>{" "}
              <span className="text-glow-blue">Level Up.</span>{" "}
              <span className="text-glow-cyan">
                Unlock Your Potential.
              </span>
            </p>
          </motion.div>
        )}

        {/* Loading Bar */}
        {stage >= 3 && !showPressPrompt && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ duration: 0.4 }}
            className="h-2 bg-muted/30 rounded-full overflow-hidden w-48 sm:w-64 md:w-80"
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

        {/* Press Anywhere Prompt */}
        {showPressPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-3 sm:space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium"
            >
              {language === "en" ? "Press anywhere to enter" : "اضغط في أي مكان للدخول"}
            </motion.div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-3 h-3 mx-auto rounded-full bg-primary glow-red"
            />
          </motion.div>
        )}
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-br-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-full blur-2xl pointer-events-none" />
    </motion.div>
  );
}
