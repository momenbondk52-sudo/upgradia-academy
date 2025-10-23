import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import {
  GraduationCap,
  Users,
  Shield,
  BookOpen,
  UserCog,
} from "lucide-react";

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
  const [instructorExpanded, setInstructorExpanded] =
    useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(
    null,
  );

  const translations = {
    en: {
      title: "Select Your Role",
      student: "Student",
      instructor: "Instructor",
      admin: "Admin",
      professor: "Professor",
      ta: "Teaching Assistant",
      back: "Back",
      studentDesc: "Learn and earn XP",
      instructorDesc: "Teach and manage",
      adminDesc: "Platform management",
      professorDesc: "Course instructor",
      taDesc: "Teaching support",
    },
    ar: {
      title: "اختر دورك",
      student: "طالب",
      instructor: "مدرس",
      admin: "مسؤول",
      professor: "أستاذ",
      ta: "مساعد تدريس",
      back: "رجوع",
      studentDesc: "تعلم واكسب النقاط",
      instructorDesc: "علّم وأدر",
      adminDesc: "إدارة المنصة",
      professorDesc: "مدرس المقرر",
      taDesc: "دعم التدريس",
    },
  };

  const t = translations[language];

  const mainRoles = [
    {
      id: "student",
      icon: GraduationCap,
      title: t.student,
      desc: t.studentDesc,
      color: "primary",
    },
    {
      id: "instructor",
      icon: Users,
      title: t.instructor,
      desc: t.instructorDesc,
      color: "secondary",
    },
    {
      id: "admin",
      icon: Shield,
      title: t.admin,
      desc: t.adminDesc,
      color: "accent",
      disabled: true,
    },
  ];

  const instructorRoles = [
    {
      id: "professor",
      icon: BookOpen,
      title: t.professor,
      desc: t.professorDesc,
      color: "secondary",
    },
    {
      id: "ta",
      icon: UserCog,
      title: t.ta,
      desc: t.taDesc,
      color: "secondary",
    },
  ];

  const handleCardClick = (roleId: string) => {
    if (roleId === "instructor") {
      setInstructorExpanded(true);
    } else if (roleId === "admin") {
      // Admin is disabled at this stage
      return;
    } else {
      onRoleSelect(roleId as "student" | "professor" | "ta");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center web-background overflow-hidden p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <motion.h1
          className="text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h1>

        <AnimatePresence mode="wait">
          {!instructorExpanded ? (
            <motion.div
              key="main-roles"
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mainRoles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={
                    role.disabled ? {} : { scale: 1.05 }
                  }
                  onHoverStart={() =>
                    !role.disabled && setHoveredCard(role.id)
                  }
                  onHoverEnd={() => setHoveredCard(null)}
                  style={{
                    filter:
                      hoveredCard && hoveredCard !== role.id
                        ? "blur(2px)"
                        : "none",
                    opacity:
                      hoveredCard && hoveredCard !== role.id
                        ? 0.6
                        : 1,
                  }}
                  className="transition-all duration-300"
                >
                  <button
                    onClick={() => handleCardClick(role.id)}
                    disabled={role.disabled}
                    className={`w-full h-80 bg-card rounded-xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 relative overflow-hidden group ${
                      role.disabled
                        ? "cursor-not-allowed border border-muted/30 opacity-50"
                        : role.color === "primary"
                          ? "border border-primary/20 hover:border-primary/50 hover:glow-red"
                          : role.color === "secondary"
                            ? "border border-secondary/20 hover:border-secondary/50 hover:glow-blue"
                            : "border border-accent/20 hover:border-accent/50 hover:glow-accent"
                    }`}
                  >
                    {/* Clean gradient background on hover */}
                    {!role.disabled && (
                      <motion.div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                          role.color === "primary"
                            ? "bg-gradient-to-br from-primary to-transparent"
                            : role.color === "secondary"
                              ? "bg-gradient-to-br from-secondary to-transparent"
                              : "bg-gradient-to-br from-accent to-transparent"
                        }`}
                      />
                    )}

                    <motion.div
                      className="relative"
                      animate={
                        hoveredCard === role.id
                          ? { rotate: [0, -10, 10, -10, 0] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <role.icon
                        className={`w-24 h-24 ${
                          role.color === "primary"
                            ? "text-primary"
                            : role.color === "secondary"
                              ? "text-secondary"
                              : "text-accent"
                        }`}
                      />
                    </motion.div>

                    <div className="text-center">
                      <h3 className="mb-2">{role.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {role.desc}
                      </p>
                    </div>

                    {/* Corner accent line */}
                    <div
                      className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-xl ${
                        role.color === "primary"
                          ? "border-primary/30"
                          : role.color === "secondary"
                            ? "border-secondary/30"
                            : "border-accent/30"
                      } opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="instructor-roles"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                {instructorRoles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                    }}
                    whileHover={{ scale: 1.05 }}
                    onHoverStart={() => setHoveredCard(role.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    style={{
                      filter:
                        hoveredCard && hoveredCard !== role.id
                          ? "blur(2px)"
                          : "none",
                      opacity:
                        hoveredCard && hoveredCard !== role.id
                          ? 0.6
                          : 1,
                    }}
                    className="transition-all duration-300"
                  >
                    <button
                      onClick={() => handleCardClick(role.id)}
                      className="w-full h-80 bg-card border border-secondary/20 hover:border-secondary/50 hover:glow-blue rounded-xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-300 relative overflow-hidden group"
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-br from-secondary to-transparent opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                      <motion.div
                        className="relative"
                        animate={
                          hoveredCard === role.id
                            ? { rotate: [0, -10, 10, -10, 0] }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <role.icon className="w-24 h-24 text-secondary" />
                      </motion.div>

                      <div className="text-center">
                        <h3 className="mb-2">{role.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {role.desc}
                        </p>
                      </div>

                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 rounded-tr-xl border-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setInstructorExpanded(false)}
                className="px-8 py-3 border-2 border-muted-foreground/30 hover:border-accent text-muted-foreground hover:text-accent rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.back}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}