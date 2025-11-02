import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { soundManager } from "../utils/soundManager";
import logo from "figma:asset/828a75a8b87e649598a39cf68c44d4e2df07d779.png";

interface RoleSelectionProps {
  onRoleSelect: (
    role: "student" | "professor" | "ta" | "admin",
  ) => void;
  language: "en" | "ar";
}

export function RoleSelection({
  onRoleSelect,
  language,
}: RoleSelectionProps) {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [instructorSplit, setInstructorSplit] = useState(false);

  const handleRoleClick = (roleId: "student" | "professor" | "ta" | "admin") => {
    soundManager.playClick();
    setTimeout(() => {
      soundManager.playTransition();
      onRoleSelect(roleId);
    }, 200);
  };

  const handleInstructorClick = () => {
    if (!instructorSplit) {
      soundManager.playClick();
      soundManager.playUnlock(); // Energy/portal effect sound
      setInstructorSplit(true);
    }
  };

  const handleHover = (roleId: string) => {
    if (!instructorSplit) {
      soundManager.playHover();
      setHoveredRole(roleId);
    }
  };

  const roles = [
    {
      id: "student",
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
      id: "admin",
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

  const instructorSubRoles = [
    {
      id: "professor" as const,
      icon: BookOpen,
      titleEn: "Professor",
      titleAr: "أستاذ",
      descEn: "Teach and inspire",
      descAr: "علّم وألهم",
      gradient: "from-secondary via-secondary/80 to-secondary/60",
      glow: "glow-blue",
      iconColor: "text-white",
    },
    {
      id: "ta" as const,
      icon: Sparkles,
      titleEn: "Teaching Assistant",
      titleAr: "مساعد تدريس",
      descEn: "Support excellence",
      descAr: "ادعم التميز",
      gradient: "from-accent via-accent/80 to-accent/60",
      glow: "glow-cyan",
      iconColor: "text-background",
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden p-4">
      <div className="relative z-10 container max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ 
            opacity: instructorSplit ? 0 : 1, 
            y: instructorSplit ? -50 : 0 
          }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center mb-4 md:mb-6"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5 glow-red">
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center p-2 sm:p-3">
                <img
                  src={logo}
                  alt="Upgradia Academy"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-3 md:mb-4 gradient-text">
            {language === "en"
              ? "Choose Your Role"
              : "اختر دورك"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            {language === "en"
              ? "Select how you want to experience Upgradia Academy"
              : "حدد كيف تريد تجربة أكاديمية أبجراديا"}
          </p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
          {/* Student and Admin Roles */}
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isHovered = hoveredRole === role.id && !instructorSplit;
            const shouldFade = instructorSplit;

            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: shouldFade ? 0 : 1, 
                  y: 0, 
                  scale: isHovered ? 1.05 : shouldFade ? 0.8 : 1,
                  filter: shouldFade ? "blur(8px)" : "blur(0px)",
                  pointerEvents: shouldFade ? "none" : "auto",
                }}
                transition={{
                  delay: shouldFade ? 0 : 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRoleClick(role.id as any)}
                onMouseEnter={() => handleHover(role.id)}
                onMouseLeave={() => !instructorSplit && setHoveredRole(null)}
                className={`group relative p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${role.gradient} ${role.glow} overflow-hidden transition-all duration-300 btn-press`}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  {/* Icon Container */}
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Icon
                      className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${role.iconColor}`}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 text-white">
                      {language === "en" ? role.titleEn : role.titleAr}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80">
                      {language === "en" ? role.descEn : role.descAr}
                    </p>
                  </div>

                  {/* Enter Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute bottom-5 md:bottom-6 ${language === "ar" ? "left-5 md:left-6" : "right-5 md:right-6"}`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ transform: language === "ar" ? "rotate(180deg)" : "none" }}
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
              </motion.button>
            );
          })}

          {/* Instructor Role - Splits into Professor and TA */}
          <AnimatePresence mode="wait">
            {!instructorSplit ? (
              <motion.button
                key="instructor"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ 
                  opacity: 1,
                  y: 0, 
                  scale: hoveredRole === "instructor" ? 1.05 : 1,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.2,
                  filter: "blur(10px)",
                }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleInstructorClick}
                onMouseEnter={() => handleHover("instructor")}
                onMouseLeave={() => setHoveredRole(null)}
                className={`group relative p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-secondary via-accent to-secondary/80 glow-blue overflow-hidden transition-all duration-300 btn-press`}
                style={{
                  boxShadow: hoveredRole === "instructor" 
                    ? "0 0 60px rgba(30, 125, 214, 0.8), 0 0 100px rgba(0, 217, 255, 0.4)" 
                    : undefined
                }}
              >
                {/* Energy Shimmer Effect */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Portal/Energy Ring */}
                {hoveredRole === "instructor" && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl border-4 border-accent"
                  />
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  {/* Icon Container */}
                  <motion.div
                    animate={{ rotate: hoveredRole === "instructor" ? 360 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Users
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white"
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 text-white">
                      {language === "en" ? "Instructor" : "معلّم"}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80">
                      {language === "en" ? "Teaching & mentoring" : "التدريس والإرشاد"}
                    </p>
                  </div>

                  {/* Enter Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredRole === "instructor" ? 1 : 0, 
                      x: hoveredRole === "instructor" ? 0 : -10 
                    }}
                    transition={{ duration: 0.2 }}
                    className={`absolute bottom-5 md:bottom-6 ${language === "ar" ? "left-5 md:left-6" : "right-5 md:right-6"}`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{ transform: language === "ar" ? "rotate(180deg)" : "none" }}
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
              </motion.button>
            ) : (
              <motion.div
                key="instructor-split"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center z-20"
              >
                {/* Energy Split Effect */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/50 to-transparent blur-xl pointer-events-none"
                />

                {/* Centered Container for Both Cards */}
                <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4">
                {instructorSubRoles.map((subRole, index) => {
                  const Icon = subRole.icon;
                  const isHovered = hoveredRole === subRole.id;

                  return (
                    <motion.button
                      key={subRole.id}
                      initial={{ 
                        opacity: 0, 
                        scale: 0.3,
                        x: 0,
                        filter: "blur(10px)"
                      }}
                      animate={{ 
                        opacity: 1,
                        scale: isHovered ? 1.08 : 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                        delay: 0.3 + index * 0.15,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRoleClick(subRole.id)}
                      onMouseEnter={() => {
                        soundManager.playHover();
                        setHoveredRole(subRole.id);
                      }}
                      onMouseLeave={() => setHoveredRole(null)}
                      className={`group relative rounded-3xl bg-gradient-to-br ${subRole.gradient} ${subRole.glow} overflow-hidden transition-all duration-300 btn-press`}
                      style={{
                        width: '280px',
                        height: '360px',
                        padding: '2.5rem',
                        boxShadow: isHovered 
                          ? `0 0 60px ${index === 0 ? "rgba(30, 125, 214, 0.8)" : "rgba(0, 217, 255, 0.8)"}, 0 0 100px ${index === 0 ? "rgba(30, 125, 214, 0.4)" : "rgba(0, 217, 255, 0.4)"}` 
                          : undefined
                      }}
                    >
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Glow Border */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/30"
                      />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">
                        {/* Icon Container */}
                        <motion.div
                          animate={{ rotate: isHovered ? 360 : 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                        >
                          <Icon
                            className={`w-12 h-12 ${subRole.iconColor}`}
                            strokeWidth={2.5}
                          />
                        </motion.div>

                        {/* Text */}
                        <div className="text-center px-4">
                          <h3 className="text-3xl font-bold mb-3 text-white">
                            {language === "en" ? subRole.titleEn : subRole.titleAr}
                          </h3>
                          <p className="text-base text-white/80">
                            {language === "en" ? subRole.descEn : subRole.descAr}
                          </p>
                        </div>

                        {/* Enter Arrow */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute bottom-8 ${language === "ar" ? "left-8" : "right-8"}`}
                        >
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              style={{ transform: language === "ar" ? "rotate(180deg)" : "none" }}
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
                    </motion.button>
                  );
                })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Hint */}
        {!instructorSplit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8 md:mt-12"
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full bg-card/30 backdrop-blur-sm border border-border">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                {language === "en"
                  ? "Click on a card to continue"
                  : "انقر على بطاقة للمتابعة"}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-br-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary/10 to-transparent rounded-tl-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
