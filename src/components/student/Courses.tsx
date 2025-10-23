import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Play,
  FileText,
  CheckCircle,
  Lock,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { VideoPlayer } from "./VideoPlayer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";

interface CoursesProps {
  language: "en" | "ar";
  onXPEarned: (xp: number) => void;
}

export function Courses({
  language,
  onXPEarned,
}: CoursesProps) {
  const [selectedCourse, setSelectedCourse] =
    useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<
    string[]
  >(["1", "2", "3"]);

  const translations = {
    en: {
      title: "My Courses",
      available: "Available Courses",
      enrolled: "Enrolled Courses",
      register: "Register",
      registered: "Registered",
      viewContent: "View Content",
      videos: "Videos",
      materials: "Materials",
      progress: "Progress",
      xpEarned: "XP Earned",
    },
    ar: {
      title: "مقرراتي",
      available: "المقررات المتاحة",
      enrolled: "المقررات المسجلة",
      register: "تسجيل",
      registered: "مسجل",
      viewContent: "عرض المحتوى",
      videos: "الفيديوهات",
      materials: "المواد",
      progress: "التقدم",
      xpEarned: "النقاط المكتسبة",
    },
  };

  const t = translations[language];

  const courses = [
    {
      id: "1",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Ahmed Hassan",
      progress: 65,
      xpEarned: 320,
      totalVideos: 24,
      completedVideos: 16,
      videos: [
        {
          id: "v1",
          title: "Introduction to Arrays",
          duration: "15:30",
          completed: true,
          xp: 10,
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          questions: [
            {
              timestamp: 300,
              question:
                "What is the time complexity of array access?",
              type: "mcq",
              options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
              correctAnswer: 0,
              xp: 10,
            },
            {
              timestamp: 600,
              question:
                "Arrays have fixed size in most languages",
              type: "true-false",
              correctAnswer: true,
              xp: 10,
            },
          ],
        },
        {
          id: "v2",
          title: "Linked Lists Fundamentals",
          duration: "20:15",
          completed: false,
          xp: 15,
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          questions: [
            {
              timestamp: 420,
              question:
                "What is the main advantage of linked lists over arrays?",
              type: "mcq",
              options: [
                "Faster access",
                "Dynamic size",
                "Less memory",
                "Better cache locality",
              ],
              correctAnswer: 1,
              xp: 10,
            },
          ],
        },
      ],
      materials: [
        {
          id: "m1",
          title: "Arrays Cheat Sheet.pdf",
          type: "pdf",
        },
        {
          id: "m2",
          title: "Complexity Analysis Guide.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "2",
      name: "Database Systems",
      instructor: "Prof. Sara Mohamed",
      progress: 40,
      xpEarned: 180,
      totalVideos: 18,
      completedVideos: 7,
      videos: [
        {
          id: "v3",
          title: "Introduction to SQL",
          duration: "18:45",
          completed: true,
          xp: 12,
          url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          questions: [],
        },
      ],
      materials: [
        {
          id: "m3",
          title: "SQL Commands Reference.pdf",
          type: "pdf",
        },
      ],
    },
    {
      id: "3",
      name: "Web Development",
      instructor: "Dr. Omar Khaled",
      progress: 80,
      xpEarned: 450,
      totalVideos: 30,
      completedVideos: 24,
      videos: [],
      materials: [],
    },
    {
      id: "4",
      name: "Artificial Intelligence",
      instructor: "Dr. Nour Ali",
      progress: 0,
      xpEarned: 0,
      totalVideos: 28,
      completedVideos: 0,
      videos: [],
      materials: [],
    },
  ];

  const handleRegister = (courseId: string) => {
    setEnrolledCourses((prev) => [...prev, courseId]);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2">{t.title}</h1>
        <p className="text-muted-foreground">
          Manage your courses and track your progress
        </p>
      </motion.div>

      {selectedCourse ? (
        <CourseContent
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          onXPEarned={onXPEarned}
          language={language}
        />
      ) : (
        <Tabs defaultValue="enrolled" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrolled">
              {t.enrolled}
            </TabsTrigger>
            <TabsTrigger value="available">
              {t.available}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter((course) =>
                  enrolledCourses.includes(course.id),
                )
                .map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={true}
                    onSelect={() => setSelectedCourse(course)}
                    onRegister={() => handleRegister(course.id)}
                    index={index}
                    language={language}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(
                  (course) =>
                    !enrolledCourses.includes(course.id),
                )
                .map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={false}
                    onSelect={() => handleRegister(course.id)}
                    onRegister={() => handleRegister(course.id)}
                    index={index}
                    language={language}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function CourseCard({
  course,
  isEnrolled,
  onSelect,
  onRegister,
  index,
  language,
}: any) {
  const t = {
    en: {
      register: "Register",
      viewContent: "View Content",
      progress: "Progress",
      xpEarned: "XP Earned",
      videos: "Videos",
    },
    ar: {
      register: "تسجيل",
      viewContent: "عرض المحتوى",
      progress: "التقدم",
      xpEarned: "النقاط المكتسبة",
      videos: "الفيديوهات",
    },
  }[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-border/50 hover:border-primary/50 hover:glow-red transition-all cursor-pointer group">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center border border-primary/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            {isEnrolled && (
              <Badge className="bg-accent/20 text-accent border-accent">
                {course.completedVideos}/{course.totalVideos}{" "}
                {t.videos}
              </Badge>
            )}
          </div>
          <CardTitle className="group-hover:text-primary transition-colors">
            {course.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {course.instructor}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEnrolled && (
            <>
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    {t.progress}
                  </span>
                  <span className="text-accent">
                    {course.progress}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      duration: 1,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {t.xpEarned}
                </span>
                <span className="text-primary font-bold">
                  +{course.xpEarned} XP
                </span>
              </div>
            </>
          )}

          <Button
            onClick={isEnrolled ? onSelect : onRegister}
            className={`w-full ${
              isEnrolled
                ? "bg-primary hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/90"
            }`}
          >
            {isEnrolled ? (
              <>
                <Play className="w-4 h-4 mr-2" />
                {t.viewContent}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                {t.register}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CourseContent({
  course,
  onBack,
  onXPEarned,
  language,
}: any) {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const t = {
    en: {
      back: "Back to Courses",
      videos: "Videos",
      materials: "Materials",
      download: "Download",
    },
    ar: {
      back: "العودة للمقررات",
      videos: "الفيديوهات",
      materials: "المواد",
      download: "تحميل",
    },
  }[language];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline">
          {t.back}
        </Button>
        <div>
          <h2>{course.name}</h2>
          <p className="text-sm text-muted-foreground">
            {course.instructor}
          </p>
        </div>
      </div>

      {selectedVideo ? (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          onXPEarned={onXPEarned}
          language={language}
        />
      ) : (
        <Tabs defaultValue="videos" className="w-full">
          <TabsList>
            <TabsTrigger value="videos">{t.videos}</TabsTrigger>
            <TabsTrigger value="materials">
              {t.materials}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="videos"
            className="mt-6 space-y-4"
          >
            {course.videos.map((video: any, index: number) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="hover:border-primary transition-all cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                >
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      {video.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4>{video.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {video.duration}
                      </p>
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent">
                      +{video.xp} XP
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent
            value="materials"
            className="mt-6 space-y-4"
          >
            {course.materials.map(
              (material: any, index: number) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-secondary transition-all cursor-pointer group">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4>{material.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          PDF Document
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        {t.download}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ),
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}