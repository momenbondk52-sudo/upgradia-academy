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
  Upload,
  Camera,
  CreditCard,
  FileText,
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
import { toast } from "sonner@2.0.3";
import { AnimatedBackground } from "./AnimatedBackground";

interface AuthCardProps {
  role: "student" | "professor" | "ta" | "admin";
  onBack: () => void;
  onLogin: (credentials: any) => void;
  onRegister?: (registrationData: any) => void;
  language: "en" | "ar";
}

export function AuthCard({
  role,
  onBack,
  onLogin,
  onRegister,
  language,
}: AuthCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    universityCode: "",
    nationalId: "",
    idPhoto: null as File | null,
    proofDocument: null as File | null,
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

    // Validate registration fields
    if (mode === "register") {
      if (role === "student") {
        if (!formData.universityCode || !formData.nationalId || !formData.idPhoto) {
          toast.error(
            language === "en"
              ? "Please fill all required fields and upload your ID"
              : "الرجاء ملء جميع الحقول المطلوبة وتحميل هويتك"
          );
          setIsLoading(false);
          return;
        }
      } else if (role === "professor" || role === "ta") {
        if (!formData.nationalId || !formData.proofDocument) {
          toast.error(
            language === "en"
              ? "Please fill all required fields and upload proof document"
              : "الرجاء ملء جميع الحقول المطلوبة وتحميل مستند الإثبات"
          );
          setIsLoading(false);
          return;
        }
      }
    }

    // Simulate API call
    setTimeout(() => {
      soundManager.playSuccess();
      
      if (mode === "register" && onRegister) {
        // Send to admin for approval
        onRegister({
          ...formData,
          role,
          timestamp: new Date().toISOString(),
          status: "pending",
        });
        toast.success(
          language === "en"
            ? "Registration request submitted! Waiting for admin approval."
            : "تم إرسال طلب التسجيل! في انتظار موافقة المسؤول."
        );
        // Go back to role selection
        setTimeout(() => onBack(), 1000);
      } else {
        onLogin({
          ...formData,
          role,
          mode,
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "idPhoto" | "proofDocument",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, [fieldName]: file });
      soundManager.playSuccess();
      toast.success(
        language === "en"
          ? `File uploaded: ${file.name}`
          : `تم تحميل الملف: ${file.name}`
      );
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center game-background overflow-hidden overflow-y-auto"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleBackClick}
        onMouseEnter={() => soundManager.playHover()}
        className="fixed top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 z-20 flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary/50 transition-all btn-press group"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm sm:text-base">{language === "en" ? "Back" : "رجوع"}</span>
      </motion.button>

      {/* Main Auth Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 180,
          damping: 18,
        }}
        className="relative z-10 w-full max-w-md mx-4 sm:mx-6 my-20 sm:my-8"
      >
        <div
          className={`rounded-3xl bg-card/80 backdrop-blur-2xl border-2 ${config.glow} overflow-hidden`}
        >
          {/* Header with Gradient */}
          <div
            className={`p-5 sm:p-6 md:p-8 bg-gradient-to-br ${config.gradient} relative overflow-hidden`}
          >
            <div className="absolute inset-0 shimmer opacity-30" />
            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-4xl sm:text-5xl"
              >
                {config.icon}
              </motion.div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-1">
                  {language === "en"
                    ? config.titleEn
                    : config.titleAr}
                </h2>
                <p className="text-white/80 text-xs sm:text-sm">
                  {language === "en"
                    ? "Welcome back!"
                    : "مرحباً بعودتك!"}
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-6 md:p-8">
            <Tabs defaultValue="login" className="w-full">
              {role !== "admin" && (
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
              )}

              <TabsContent value="login">
                <form
                  onSubmit={(e) => handleSubmit(e, "login")}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm">
                      {language === "en"
                        ? "Username"
                        : "اسم المستخدم"}
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder={
                          language === "en"
                            ? role === "admin" ? "20102010" : "Enter your username"
                            : role === "admin" ? "20102010" : "أدخل اسم المستخدم"
                        }
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            username: e.target.value,
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

                  {/* Student-specific fields */}
                  {role === "student" && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="university-code"
                          className="text-sm"
                        >
                          {language === "en"
                            ? "University Code"
                            : "الكود الجامعي"}
                        </Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="university-code"
                            type="text"
                            placeholder={
                              language === "en"
                                ? "e.g., STU2024001"
                                : "مثال: STU2024001"
                            }
                            value={formData.universityCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                universityCode: e.target.value,
                              })
                            }
                            className="pl-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="national-id"
                          className="text-sm"
                        >
                          {language === "en"
                            ? "National ID"
                            : "الرقم القومي"}
                        </Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="national-id"
                            type="text"
                            placeholder={
                              language === "en"
                                ? "14 digits"
                                : "14 رقم"
                            }
                            value={formData.nationalId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nationalId: e.target.value,
                              })
                            }
                            className="pl-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">
                          {language === "en"
                            ? "University ID Card Photo"
                            : "صورة بطاقة الجامعة"}
                        </Label>
                        <div className="flex gap-2">
                          <label
                            htmlFor="id-upload"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center justify-center gap-2 h-12 rounded-xl bg-input-background border-2 border-dashed border-border hover:border-primary/50 transition-all">
                              <Upload className="w-4 h-4" />
                              <span className="text-sm">
                                {formData.idPhoto
                                  ? formData.idPhoto.name
                                  : language === "en"
                                    ? "Upload Photo"
                                    : "تحميل صورة"}
                              </span>
                            </div>
                            <input
                              id="id-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileUpload(e, "idPhoto")
                              }
                              className="hidden"
                            />
                          </label>
                          <label
                            htmlFor="id-camera"
                            className="cursor-pointer"
                          >
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-input-background border-2 border-dashed border-border hover:border-primary/50 transition-all">
                              <Camera className="w-4 h-4" />
                            </div>
                            <input
                              id="id-camera"
                              type="file"
                              accept="image/*"
                              capture="environment"
                              onChange={(e) =>
                                handleFileUpload(e, "idPhoto")
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Professor/TA-specific fields */}
                  {(role === "professor" || role === "ta") && (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="national-id-staff"
                          className="text-sm"
                        >
                          {language === "en"
                            ? "National ID"
                            : "الرقم القومي"}
                        </Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="national-id-staff"
                            type="text"
                            placeholder={
                              language === "en"
                                ? "14 digits"
                                : "14 رقم"
                            }
                            value={formData.nationalId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                nationalId: e.target.value,
                              })
                            }
                            className="pl-10 h-12 rounded-xl bg-input-background border-border focus:border-primary/50 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">
                          {language === "en"
                            ? "Proof of Academic Position"
                            : "إثبات الوظيفة الأكاديمية"}
                        </Label>
                        <label
                          htmlFor="proof-upload"
                          className="block cursor-pointer"
                        >
                          <div className="flex items-center justify-center gap-2 h-12 rounded-xl bg-input-background border-2 border-dashed border-border hover:border-primary/50 transition-all">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">
                              {formData.proofDocument
                                ? formData.proofDocument.name
                                : language === "en"
                                  ? "Upload Faculty Card/Document"
                                  : "تحميل بطاقة هيئة التدريس"}
                            </span>
                          </div>
                          <input
                            id="proof-upload"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              handleFileUpload(e, "proofDocument")
                            }
                            className="hidden"
                          />
                        </label>
                      </div>
                    </>
                  )}

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
                            ? "Submitting..."
                            : "جار الإرسال..."}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        <span>
                          {language === "en"
                            ? "Submit Request"
                            : "إرسال الطلب"}
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
            ease: "easeInOut",
          }}
          className={`absolute -top-4 sm:-top-6 -right-4 sm:-right-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${config.gradient} blur-2xl opacity-30 pointer-events-none`}
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
            ease: "easeInOut",
          }}
          className={`absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${config.gradient} blur-2xl opacity-20 pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
}