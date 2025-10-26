import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { soundManager } from "../utils/soundManager";

interface AuthCardProps {
  role: "student" | "professor" | "ta" | "admin";
  onBack: () => void;
  onLogin: (credentials: any) => void;
  language: "en" | "ar";
}

export function AuthCard({
  role,
  onBack,
  onLogin,
  language,
}: AuthCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const roleConfig = {
    student: {
      titleEn: "Student Portal",
      titleAr: "بوابة الطلاب",
      gradient: "from-primary to-primary/60",
      glow: "glow-red",
      icon: "🎓",
    },
    professor: {
      titleEn: "Professor Portal",
      titleAr: "بوابة الأساتذة",
      gradient: "from-secondary to-secondary/60",
      glow: "glow-blue",
      icon: "📚",
    },
    ta: {
      titleEn: "TA Portal",
      titleAr: "بوابة المساعدين",
      gradient: "from-accent to-accent/60",
      glow: "glow-cyan",
      icon: "✨",
    },
    admin: {
      titleEn: "Admin Portal",
      titleAr: "بوابة المسؤول",
      gradient: "from-purple-500 to-purple-700",
      glow: "glow-cyan",
      icon: "🛡️",
    },
  };

  const config = roleConfig[role];

  const handleSubmit = async (
    e: React.FormEvent,
    mode: "login" | "register",
  ) => {
    e.preventDefault();
    setIsLoading(true);
    soundManager.playClick();

    // Simulate API call
    setTimeout(() => {
      soundManager.playSuccess();
      onLogin({
        ...formData,
        role,
        mode,
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleBackClick = () => {
    soundManager.playClick();
    onBack();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center game-background overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 web-pattern opacity-20" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBackClick}
        onMouseEnter={() => soundManager.playHover()}
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary/50 transition-all btn-press group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>{language === "en" ? "Back" : "رجوع"}</span>
      </motion.button>

      {/* Main Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        <div
          className={`rounded-3xl bg-card/80 backdrop-blur-2xl border-2 ${config.glow} overflow-hidden`}
        >
          {/* Header with Gradient */}
          <div
            className={`p-8 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}
          >
            <div className="absolute inset-0 shimmer opacity-30" />
            <div className="relative z-10 flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl"
              >
                {config.icon}
              </motion.div>
              <div>
                <h2 className="text-3xl font-black text-white mb-1">
                  {language === "en"
                    ? config.titleEn
                    : config.titleAr}
                </h2>
                <p className="text-white/80 text-sm">
                  {language === "en"
                    ? "Welcome back!"
                    : "مرحباً بعودتك!"}
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-lg"
                  onClick={() => soundManager.playTabSwitch()}
                >
                  {language === "en" ? "Login" : "تسجيل الدخول"}
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-lg"
                  onClick={() => soundManager.playTabSwitch()}
                >
                  {language === "en" ? "Register" : "تسجيل"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form
                  onSubmit={(e) => handleSubmit(e, "login")}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      {language === "en"
                        ? "Email"
                        : "البريد الإلكتروني"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={
                          language === "en"
                            ? "student@upgradia.academy"
                            : "طالب@upgradia.academy"
                        }
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="pl-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm"
                    >
                      {language === "en"
                        ? "Password"
                        : "كلمة المرور"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10 pr-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${config.gradient} hover:opacity-90 transition-all btn-press text-white shadow-lg`}
                    onMouseEnter={() =>
                      soundManager.playHover()
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>
                          {language === "en"
                            ? "Loading..."
                            : "جار التحميل..."}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>
                          {language === "en"
                            ? "Enter Academy"
                            : "دخول الأكاديمية"}
                        </span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form
                  onSubmit={(e) => handleSubmit(e, "register")}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="reg-name"
                      className="text-sm"
                    >
                      {language === "en"
                        ? "Full Name"
                        : "الاسم الكامل"}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder={
                          language === "en"
                            ? "Peter Parker"
                            : "بيتر باركر"
                        }
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="pl-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="reg-email"
                      className="text-sm"
                    >
                      {language === "en"
                        ? "Email"
                        : "البريد الإلكتروني"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder={
                          language === "en"
                            ? "student@upgradia.academy"
                            : "طالب@upgradia.academy"
                        }
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                        className="pl-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="reg-password"
                      className="text-sm"
                    >
                      {language === "en"
                        ? "Password"
                        : "كلمة المرور"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="reg-password"
                        type={
                          showPassword ? "text" : "password"
                        }
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10 pr-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${config.gradient} hover:opacity-90 transition-all btn-press text-white shadow-lg`}
                    onMouseEnter={() =>
                      soundManager.playHover()
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>
                          {language === "en"
                            ? "Creating..."
                            : "جار الإنشاء..."}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>
                          {language === "en"
                            ? "Create Account"
                            : "إنشاء حساب"}
                        </span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${config.gradient} blur-2xl opacity-30 pointer-events-none`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
          }}
          className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gradient-to-br ${config.gradient} blur-2xl opacity-20 pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
}