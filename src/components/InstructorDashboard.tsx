import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  BookOpen,
  Upload,
  GraduationCap,
  LogOut,
  Menu,
  X,
  BarChart3,
  FileText,
  Video,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";

interface InstructorDashboardProps {
  user: any;
  onLogout: () => void;
  language: "en" | "ar";
}

export function InstructorDashboard({
  user,
  onLogout,
  language,
}: InstructorDashboardProps) {
  const [currentPage, setCurrentPage] = useState<
    "overview" | "courses" | "upload" | "grades"
  >("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const translations = {
    en: {
      dashboard: "Instructor Dashboard",
      overview: "Overview",
      courses: "My Courses",
      uploadContent: "Upload Content",
      grades: "Grades",
      logout: "Logout",
      welcome: "Welcome back",
    },
    ar: {
      dashboard: "لوحة تحكم المدرس",
      overview: "نظرة عامة",
      courses: "مقرراتي",
      uploadContent: "رفع المحتوى",
      grades: "الدرجات",
      logout: "تسجيل الخروج",
      welcome: "مرحباً بعودتك",
    },
  };

  const t = translations[language];

  const menuItems = [
    { id: "overview", label: t.overview, icon: Home },
    { id: "courses", label: t.courses, icon: BookOpen },
    { id: "upload", label: t.uploadContent, icon: Upload },
    { id: "grades", label: t.grades, icon: GraduationCap },
  ];

  return (
    <div className="fixed inset-0 bg-background flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-72 bg-card border-r border-border flex flex-col"
          >
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <span className="text-white font-bold">
                    U
                  </span>
                </div>
                <div>
                  <h2 className="tracking-wider font-extrabold">
                    UPGRADIA
                  </h2>
                  <p className="text-xs text-secondary mt-0.5">
                    {t.dashboard}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-secondary/30">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-secondary/10 text-secondary font-semibold">
                    {user?.fullName?.[0] || "I"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">
                    {user?.fullName || "Instructor Name"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user?.role === "professor"
                      ? "Professor"
                      : "Teaching Assistant"}
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() =>
                        setCurrentPage(item.id as any)
                      }
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                        currentPage === item.id
                          ? "bg-secondary/10 text-foreground font-medium border-l-2 border-secondary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 ${currentPage === item.id ? "text-secondary" : ""}`}
                      />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-border">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>{t.logout}</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 web-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === "overview" && (
                <InstructorOverview language={language} />
              )}
              {currentPage === "courses" && (
                <InstructorCourses language={language} />
              )}
              {currentPage === "upload" && (
                <UploadContent language={language} />
              )}
              {currentPage === "grades" && (
                <ManageGrades language={language} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function InstructorOverview({
  language,
}: {
  language: "en" | "ar";
}) {
  const t = {
    en: {
      title: "Overview",
      totalStudents: "Total Students",
      activeCourses: "Active Courses",
      avgEngagement: "Avg Engagement",
      contentUploaded: "Content Uploaded",
    },
    ar: {
      title: "نظرة عامة",
      totalStudents: "إجمالي الطلاب",
      activeCourses: "المقررات النشطة",
      avgEngagement: "متوسط التفاعل",
      contentUploaded: "المحتوى المرفوع",
    },
  }[language];

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: t.totalStudents,
            value: "245",
            icon: GraduationCap,
            color: "primary",
          },
          {
            label: t.activeCourses,
            value: "4",
            icon: BookOpen,
            color: "secondary",
          },
          {
            label: t.avgEngagement,
            value: "78%",
            icon: BarChart3,
            color: "accent",
          },
          {
            label: t.contentUploaded,
            value: "156",
            icon: FileText,
            color: "primary",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                    stat.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : stat.color === "secondary"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-accent/20 text-accent"
                  }`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InstructorCourses({
  language,
}: {
  language: "en" | "ar";
}) {
  const t = {
    en: {
      title: "My Courses",
      students: "Students",
      progress: "Avg Progress",
    },
    ar: {
      title: "مقرراتي",
      students: "الطلاب",
      progress: "متوسط التقدم",
    },
  }[language];

  const courses = [
    {
      name: "Data Structures & Algorithms",
      students: 85,
      progress: 65,
    },
    { name: "Database Systems", students: 72, progress: 58 },
    { name: "Web Development", students: 68, progress: 72 },
    {
      name: "Artificial Intelligence",
      students: 20,
      progress: 15,
    },
  ];

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:border-secondary transition-all cursor-pointer">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.students}
                  </span>
                  <span className="font-bold">
                    {course.students}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      {t.progress}
                    </span>
                    <span className="text-accent">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-accent transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function UploadContent({
  language,
}: {
  language: "en" | "ar";
}) {
  const [uploadType, setUploadType] = useState<"video" | "pdf">(
    "video",
  );
  const [questions, setQuestions] = useState<any[]>([]);

  const t = {
    en: {
      title: "Upload Content",
      video: "Video",
      pdf: "PDF",
      courseTitle: "Course Title",
      contentTitle: "Content Title",
      selectCourse: "Select Course",
      file: "Upload File",
      addQuestion: "Add Question",
      timestamp: "Timestamp (seconds)",
      question: "Question",
      questionType: "Question Type",
      mcq: "Multiple Choice",
      trueFalse: "True/False",
      options: "Options (one per line)",
      correctAnswer: "Correct Answer",
      xpReward: "XP Reward",
      upload: "Upload",
    },
    ar: {
      title: "رفع المحتوى",
      video: "فيديو",
      pdf: "PDF",
      courseTitle: "عنوان المقرر",
      contentTitle: "عنوان المحتوى",
      selectCourse: "اختر المقرر",
      file: "رفع ملف",
      addQuestion: "إضافة سؤال",
      timestamp: "الوقت (بالثواني)",
      question: "السؤال",
      questionType: "نوع السؤال",
      mcq: "اختيار متعدد",
      trueFalse: "صح/خطأ",
      options: "الخيارات (واحد في كل سطر)",
      correctAnswer: "الإجابة الصحيحة",
      xpReward: "مكافأة النقاط",
      upload: "رفع",
    },
  }[language];

  const handleUpload = () => {
    toast.success("Content uploaded successfully!");
  };

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>

      <Tabs
        value={uploadType}
        onValueChange={(v) => setUploadType(v as any)}
      >
        <TabsList>
          <TabsTrigger value="video">
            <Video className="w-4 h-4 mr-2" />
            {t.video}
          </TabsTrigger>
          <TabsTrigger value="pdf">
            <FileText className="w-4 h-4 mr-2" />
            {t.pdf}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>{t.selectCourse}</Label>
                <Input placeholder={t.selectCourse} />
              </div>

              <div className="space-y-2">
                <Label>{t.contentTitle}</Label>
                <Input placeholder={t.contentTitle} />
              </div>

              <div className="space-y-2">
                <Label>{t.file}</Label>
                <Input type="file" accept="video/*" />
              </div>

              <div className="border-t pt-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4>Interactive Questions</h4>
                  <Button variant="outline" size="sm">
                    {t.addQuestion}
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground text-center py-8">
                  Add questions that will appear at specific
                  timestamps during video playback
                </div>
              </div>

              <Button
                onClick={handleUpload}
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                {t.upload}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pdf" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label>{t.selectCourse}</Label>
                <Input placeholder={t.selectCourse} />
              </div>

              <div className="space-y-2">
                <Label>{t.contentTitle}</Label>
                <Input placeholder={t.contentTitle} />
              </div>

              <div className="space-y-2">
                <Label>{t.file}</Label>
                <Input type="file" accept=".pdf" />
              </div>

              <Button
                onClick={handleUpload}
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                {t.upload}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ManageGrades({ language }: { language: "en" | "ar" }) {
  const t = {
    en: {
      title: "Manage Grades",
      selectCourse: "Select Course",
      studentName: "Student Name",
      xpEarned: "XP Earned",
      grade: "Grade",
      save: "Save Grades",
    },
    ar: {
      title: "إدارة الدرجات",
      selectCourse: "اختر المقرر",
      studentName: "اسم الطالب",
      xpEarned: "النقاط المكتسبة",
      grade: "الدرجة",
      save: "حفظ الدرجات",
    },
  }[language];

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>

      <Card>
        <CardHeader>
          <div className="space-y-2">
            <Label>{t.selectCourse}</Label>
            <Input placeholder={t.selectCourse} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            Select a course to view and manage student grades
          </div>
        </CardContent>
      </Card>
    </div>
  );
}