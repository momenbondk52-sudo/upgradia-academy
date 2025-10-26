import { motion } from "motion/react";
import {
  GraduationCap,
  BookOpen,
  Shield,
  Sparkles,
} from "lucide-react";
import { soundManager } from "../utils/soundManager";

interface RoleSelectionProps {
  onRoleSelect: (
    role: "student" | "professor" | "ta" | "admin",
  ) => void;
  language: "en" | "ar";
}

const roles = [
  {
    id: "student" as const,
    icon: GraduationCap,
    titleEn: "Student",
    titleAr: "طالب",
    descEn: "Start your learning journey",
    descAr: "ابدأ رحلتك التعليمية",
    gradient: "from-primary via-primary/80 to-primary/60",
    glow: "glow-red",
    iconColor: "text-white",
  },
  {
    id: "professor" as const,
    icon: BookOpen,
    titleEn: "Professor",
    titleAr: "أستاذ",
    descEn: "Teach and inspire students",
    descAr: "علّم وألهم الطلاب",
    gradient: "from-secondary via-secondary/80 to-secondary/60",
    glow: "glow-blue",
    iconColor: "text-white",
  },
  {
    id: "ta" as const,
    icon: Sparkles,
    titleEn: "Teaching Assistant",
    titleAr: "مساعد تدريس",
    descEn: "Support learning excellence",
    descAr: "ادعم التميز التعليمي",
    gradient: "from-accent via-accent/80 to-accent/60",
    glow: "glow-cyan",
    iconColor: "text-background",
  },
  {
    id: "admin" as const,
    icon: Shield,
    titleEn: "Administrator",
    titleAr: "مسؤول",
    descEn: "Manage the academy",
    descAr: "أدر الأكاديمية",
    gradient: "from-purple-500 via-purple-600 to-purple-700",
    glow: "glow-cyan",
    iconColor: "text-white",
  },
];

export function RoleSelection({
  onRoleSelect,
  language,
}: RoleSelectionProps) {
  const handleRoleClick = (roleId: (typeof roles)[0]["id"]) => {
    soundManager.playClick();
    setTimeout(() => {
      soundManager.playTransition();
      onRoleSelect(roleId);
    }, 200);
  };

  const handleHover = () => {
    soundManager.playHover();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center game-background overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 hex-pattern opacity-20" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? "#ff2b36" : "#1e7dd6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 gradient-text">
            {language === "en"
              ? "Choose Your Role"
              : "اختر دورك"}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {language === "en"
              ? "Select how you want to experience Upgradia Academy"
              : "حدد كيف تريد تجربة أكاديمية أبجراديا"}
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleClick(role.id)}
                onMouseEnter={handleHover}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${role.gradient} ${role.glow} overflow-hidden transition-all duration-300 btn-press`}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Icon
                      className={`w-10 h-10 ${role.iconColor}`}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {language === "en"
                        ? role.titleEn
                        : role.titleAr}
                    </h3>
                    <p className="text-sm text-white/80">
                      {language === "en"
                        ? role.descEn
                        : role.descAr}
                    </p>
                  </div>

                  {/* Enter Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                </div>

                {/* Glow Border Animation */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)`,
                  }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Footer Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/30 backdrop-blur-sm border border-border">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Click on a card to continue"
                : "انقر على بطاقة للمتابعة"}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-tl-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}