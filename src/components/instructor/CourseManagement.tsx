import { motion } from "motion/react";
import { useState } from "react";
import {
  Upload,
  Video,
  FileText,
  Edit,
  Trash2,
  Plus,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { soundManager } from "../../utils/soundManager";
import { toast } from "sonner@2.0.3";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CourseManagementProps {
  language: "en" | "ar";
}

export function CourseManagement({ language }: CourseManagementProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [videoQuestions, setVideoQuestions] = useState<any[]>([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    timestamp: "",
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    points: 5,
  });

  const contentTypes = [
    {
      id: "lecture",
      icon: Video,
      titleEn: "Lecture Videos",
      titleAr: "محاضرات فيديو",
      descEn: "Upload video lessons with interactive questions",
      descAr: "ارفع دروس فيديو مع أسئلة تفاعلية",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "document",
      icon: FileText,
      titleEn: "Documents & PDFs",
      titleAr: "مستندات و PDFs",
      descEn: "Upload course materials and reading materials",
      descAr: "ارفع مواد الدورة ومواد القراءة",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "exercise",
      icon: Edit,
      titleEn: "Exercises",
      titleAr: "تمارين",
      descEn: "Create practice exercises for students",
      descAr: "أنشئ تمارين تدريبية للطلاب",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "quiz",
      icon: Award,
      titleEn: "Quizzes & Exams",
      titleAr: "اختبارات وامتحانات",
      descEn: "Create assessments and exams",
      descAr: "أنشئ تقييمات وامتحانات",
      color: "from-orange-500 to-red-500",
    },
  ];

  const questionTypes = [
    { value: "multiple-choice", labelEn: "Multiple Choice", labelAr: "اختيار متعدد" },
    { value: "true-false", labelEn: "True/False", labelAr: "صح/خطأ" },
    { value: "scientific-term", labelEn: "Scientific Term", labelAr: "مصطلح علمي" },
  ];

  const handleAddQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.timestamp) {
      toast.error(
        language === "en"
          ? "Please fill all required fields"
          : "يرجى ملء جميع الحقول المطلوبة"
      );
      return;
    }

    soundManager.playSuccess();
    setVideoQuestions([...videoQuestions, { ...currentQuestion, id: Date.now() }]);
    setCurrentQuestion({
      timestamp: "",
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 5,
    });
    setShowQuestionForm(false);
    toast.success(
      language === "en"
        ? "Question added successfully!"
        : "تمت إضافة السؤال بنجاح!"
    );
  };

  const handleDeleteQuestion = (id: number) => {
    soundManager.playClick();
    setVideoQuestions(videoQuestions.filter((q) => q.id !== id));
    toast.success(
      language === "en" ? "Question deleted" : "تم حذف السؤال"
    );
  };

  const formatTimestamp = (seconds: string) => {
    const num = parseInt(seconds);
    const mins = Math.floor(num / 60);
    const secs = num % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Content Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          const isActive = activeSection === type.id;

          return (
            <motion.button
              key={type.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundManager.playClick();
                setActiveSection(type.id);
              }}
              className={`p-5 rounded-xl bg-gradient-to-br ${type.color} text-white transition-all btn-press ${
                isActive ? "ring-2 ring-white ring-offset-2 ring-offset-background" : ""
              }`}
            >
              <Icon className="w-8 h-8 mb-3" strokeWidth={2.5} />
              <h3 className="font-bold mb-1">
                {language === "en" ? type.titleEn : type.titleAr}
              </h3>
              <p className="text-xs opacity-90">
                {language === "en" ? type.descEn : type.descAr}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Upload Section */}
      {activeSection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border"
        >
          {/* Video Lecture Section */}
          {activeSection === "lecture" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  {language === "en" ? "Upload Video Lecture" : "رفع محاضرة فيديو"}
                </h3>

                {/* Video Upload */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">
                    {language === "en" ? "Video File" : "ملف الفيديو"}
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      {language === "en"
                        ? "Click to upload or drag and drop"
                        : "انقر للرفع أو اسحب وأفلت"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === "en"
                        ? "MP4, MOV, AVI (max. 500MB)"
                        : "MP4, MOV, AVI (الحد الأقصى 500 ميجابايت)"}
                    </p>
                  </div>
                </div>

                {/* Video Title & Description */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <Label htmlFor="video-title" className="text-sm font-medium mb-2 block">
                      {language === "en" ? "Video Title" : "عنوان الفيديو"}
                    </Label>
                    <Input
                      id="video-title"
                      placeholder={
                        language === "en"
                          ? "Enter video title"
                          : "أدخل عنوان الفيديو"
                      }
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="video-desc" className="text-sm font-medium mb-2 block">
                      {language === "en" ? "Description" : "الوصف"}
                    </Label>
                    <Textarea
                      id="video-desc"
                      placeholder={
                        language === "en"
                          ? "Enter video description"
                          : "أدخل وصف الفيديو"
                      }
                      className="rounded-xl min-h-24"
                    />
                  </div>
                </div>

                {/* Interactive Questions Section */}
                <div className="p-5 rounded-xl bg-muted/20 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      {language === "en"
                        ? "Interactive Questions"
                        : "أسئلة تفاعلية"}
                    </h4>
                    <Button
                      size="sm"
                      className="rounded-xl"
                      onClick={() => {
                        soundManager.playClick();
                        setShowQuestionForm(!showQuestionForm);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {language === "en" ? "Add Question" : "إضافة سؤال"}
                    </Button>
                  </div>

                  {/* Question Form */}
                  {showQuestionForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-4 rounded-xl bg-card border border-border space-y-4"
                    >
                      {/* Timestamp */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          {language === "en"
                            ? "Timestamp (seconds)"
                            : "الوقت (بالثواني)"}
                        </Label>
                        <Input
                          type="number"
                          value={currentQuestion.timestamp}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              timestamp: e.target.value,
                            })
                          }
                          placeholder="120"
                          className="rounded-xl"
                        />
                        {currentQuestion.timestamp && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatTimestamp(currentQuestion.timestamp)}
                          </p>
                        )}
                      </div>

                      {/* Question Type */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          {language === "en" ? "Question Type" : "نوع السؤال"}
                        </Label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value) =>
                            setCurrentQuestion({ ...currentQuestion, type: value })
                          }
                        >
                          <SelectTrigger className="rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {questionTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {language === "en" ? type.labelEn : type.labelAr}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Question Text */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          {language === "en" ? "Question" : "السؤال"}
                        </Label>
                        <Textarea
                          value={currentQuestion.question}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              question: e.target.value,
                            })
                          }
                          placeholder={
                            language === "en"
                              ? "Enter your question"
                              : "أدخل سؤالك"
                          }
                          className="rounded-xl"
                        />
                      </div>

                      {/* Options (for multiple choice) */}
                      {currentQuestion.type === "multiple-choice" && (
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            {language === "en" ? "Answer Options" : "خيارات الإجابة"}
                          </Label>
                          <div className="space-y-2">
                            {currentQuestion.options.map((option, index) => (
                              <Input
                                key={index}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...currentQuestion.options];
                                  newOptions[index] = e.target.value;
                                  setCurrentQuestion({
                                    ...currentQuestion,
                                    options: newOptions,
                                  });
                                }}
                                placeholder={`${language === "en" ? "Option" : "خيار"} ${
                                  index + 1
                                }`}
                                className="rounded-xl"
                              />
                            ))}
                          </div>
                          <div className="mt-2">
                            <Label className="text-sm font-medium mb-2 block">
                              {language === "en"
                                ? "Correct Answer"
                                : "الإجابة الصحيحة"}
                            </Label>
                            <Select
                              value={currentQuestion.correctAnswer.toString()}
                              onValueChange={(value) =>
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  correctAnswer: parseInt(value),
                                })
                              }
                            >
                              <SelectTrigger className="rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {currentQuestion.options.map((_, index) => (
                                  <SelectItem key={index} value={index.toString()}>
                                    {language === "en" ? "Option" : "خيار"} {index + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {/* Points */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          {language === "en" ? "Points" : "النقاط"}
                        </Label>
                        <Input
                          type="number"
                          value={currentQuestion.points}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              points: parseInt(e.target.value),
                            })
                          }
                          className="rounded-xl"
                          min="1"
                          max="100"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          className="rounded-xl flex-1"
                          onClick={handleAddQuestion}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {language === "en" ? "Add Question" : "إضافة السؤال"}
                        </Button>
                        <Button
                          variant="ghost"
                          className="rounded-xl"
                          onClick={() => setShowQuestionForm(false)}
                        >
                          {language === "en" ? "Cancel" : "إلغاء"}
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Questions List */}
                  <div className="space-y-2">
                    {videoQuestions.length > 0 ? (
                      videoQuestions.map((q) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 rounded-lg bg-muted/30 border border-border flex items-start justify-between gap-3"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                {formatTimestamp(q.timestamp)}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {q.points} pts
                              </Badge>
                            </div>
                            <p className="text-sm font-medium line-clamp-1">
                              {q.question}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {questionTypes.find((t) => t.value === q.type)?.[
                                language === "en" ? "labelEn" : "labelAr"
                              ]}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg hover:bg-destructive/20 hover:text-destructive"
                            onClick={() => handleDeleteQuestion(q.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        {language === "en"
                          ? "No questions added yet"
                          : "لم تتم إضافة أسئلة بعد"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-end">
                  <Button
                    size="lg"
                    className="rounded-xl bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      soundManager.playSuccess();
                      toast.success(
                        language === "en"
                          ? "Video lecture uploaded successfully!"
                          : "تم رفع محاضرة الفيديو بنجاح!"
                      );
                    }}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {language === "en" ? "Upload Lecture" : "رفع المحاضرة"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Other Content Types */}
          {activeSection !== "lecture" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold mb-2">
                {language === "en"
                  ? `Upload ${
                      contentTypes.find((t) => t.id === activeSection)?.titleEn
                    }`
                  : `رفع ${
                      contentTypes.find((t) => t.id === activeSection)?.titleAr
                    }`}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "en"
                  ? "Drag and drop files or click to browse"
                  : "اسحب وأفلت الملفات أو انقر للتصفح"}
              </p>
              <Button className="rounded-xl">
                <Upload className="w-4 h-4 mr-2" />
                {language === "en" ? "Choose Files" : "اختر الملفات"}
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
