import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Upload, Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface AuthCardProps {
  role: "student" | "professor" | "ta";
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null;
  }>({});

  const translations = {
    en: {
      login: "Login",
      signup: "Sign Up",
      username: "Username",
      password: "Password",
      email: "Email",
      phone: "Phone Number",
      fullName: "Full Name",
      nationalId: "National ID",
      studentCode: "Student Code",
      universityCard: "University Card",
      employmentProof: "Proof of Employment",
      createAccount: "Create Account",
      haveAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      back: "Back",
      upload: "Upload File",
      student: "Student",
      professor: "Professor",
      ta: "Teaching Assistant",
    },
    ar: {
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      fullName: "الاسم الكامل",
      nationalId: "الرقم القومي",
      studentCode: "كود الطالب",
      universityCard: "بطاقة الجامعة",
      employmentProof: "إثبات التوظيف",
      createAccount: "إنشاء الحساب",
      haveAccount: "لديك حساب بالفعل؟",
      noAccount: "ليس لديك حساب؟",
      back: "رجوع",
      upload: "رفع ملف",
      student: "طالب",
      professor: "أستاذ",
      ta: "مساعد تدريس",
    },
  };

  const t = translations[language];

  const roleTitle =
    role === "student"
      ? t.student
      : role === "professor"
        ? t.professor
        : t.ta;

  const handleFileUpload = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      setIsSignup(!isSignup);
    }, 150);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onLogin({ ...data, role, files: uploadedFiles });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center web-background overflow-hidden p-4">
      <motion.button
        onClick={onBack}
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        {t.back}
      </motion.button>

      <div
        className="relative w-full max-w-md"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          className="relative w-full"
          initial={{ scale: 0, rotateY: 0 }}
          animate={{
            scale: 1,
            rotateY: isFlipped ? 180 : 0,
          }}
          transition={{
            scale: { duration: 0.5, ease: "backOut" },
            rotateY: { duration: 0.6, ease: "easeInOut" },
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Front/Back */}
          <div
            className="relative bg-card border border-primary/30 hover:border-primary/50 glow-red rounded-xl overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              minHeight: isSignup ? "600px" : "500px",
            }}
          >
            {/* Clean gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            {/* Content */}
            <div className="relative p-8">
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {isSignup ? t.signup : t.login}
                </h2>
                <p className="text-muted-foreground">
                  {roleTitle}
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={isSignup ? "signup" : "login"}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {!isSignup ? (
                    <>
                      {/* Login Form */}
                      <div className="space-y-2">
                        <Label htmlFor="username">
                          {t.username}
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          placeholder={t.username}
                          className="bg-input-background border-border focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">
                          {t.password}
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={
                              showPassword ? "text" : "password"
                            }
                            placeholder={t.password}
                            className="bg-input-background border-border focus:border-primary pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-red mt-6"
                      >
                        {t.login}
                      </Button>

                      <div className="text-center mt-4">
                        <button
                          type="button"
                          onClick={handleFlip}
                          className="text-sm text-accent hover:text-accent/80 transition-colors"
                        >
                          {t.noAccount}{" "}
                          <span className="underline">
                            {t.signup}
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Signup Form */}
                      <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">
                            {t.fullName}
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder={t.fullName}
                            className="bg-input-background border-border focus:border-primary"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nationalId">
                            {t.nationalId}
                          </Label>
                          <Input
                            id="nationalId"
                            name="nationalId"
                            type="text"
                            placeholder={t.nationalId}
                            className="bg-input-background border-border focus:border-primary"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {t.email}
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t.email}
                            className="bg-input-background border-border focus:border-primary"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            {t.phone}
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder={t.phone}
                            className="bg-input-background border-border focus:border-primary"
                            required
                          />
                        </div>

                        {role === "student" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="studentCode">
                                {t.studentCode}
                              </Label>
                              <Input
                                id="studentCode"
                                name="studentCode"
                                type="text"
                                placeholder={t.studentCode}
                                className="bg-input-background border-border focus:border-primary"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="universityCard">
                                {t.universityCard}
                              </Label>
                              <div className="relative">
                                <input
                                  id="universityCard"
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) =>
                                    handleFileUpload(
                                      "universityCard",
                                      e,
                                    )
                                  }
                                  className="hidden"
                                />
                                <label
                                  htmlFor="universityCard"
                                  className="flex items-center gap-2 px-4 py-2 bg-input-background border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                  <span className="text-sm">
                                    {uploadedFiles
                                      .universityCard?.name ||
                                      t.upload}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </>
                        )}

                        {(role === "professor" ||
                          role === "ta") && (
                          <div className="space-y-2">
                            <Label htmlFor="employmentProof">
                              {t.employmentProof}
                            </Label>
                            <div className="relative">
                              <input
                                id="employmentProof"
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) =>
                                  handleFileUpload(
                                    "employmentProof",
                                    e,
                                  )
                                }
                                className="hidden"
                              />
                              <label
                                htmlFor="employmentProof"
                                className="flex items-center gap-2 px-4 py-2 bg-input-background border border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                              >
                                <Upload className="w-4 h-4" />
                                <span className="text-sm">
                                  {uploadedFiles.employmentProof
                                    ?.name || t.upload}
                                </span>
                              </label>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="signupPassword">
                            {t.password}
                          </Label>
                          <div className="relative">
                            <Input
                              id="signupPassword"
                              name="password"
                              type={
                                showPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder={t.password}
                              className="bg-input-background border-border focus:border-primary pr-10"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword(!showPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-red mt-6"
                      >
                        {t.createAccount}
                      </Button>

                      <div className="text-center mt-4">
                        <button
                          type="button"
                          onClick={handleFlip}
                          className="text-sm text-accent hover:text-accent/80 transition-colors"
                        >
                          {t.haveAccount}{" "}
                          <span className="underline">
                            {t.login}
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.form>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}