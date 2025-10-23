import { motion } from "motion/react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  Zap,
  Edit,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface ProfileProps {
  language: "en" | "ar";
  user: any;
  studentData: any;
}

export function Profile({
  language,
  user,
  studentData,
}: ProfileProps) {
  const translations = {
    en: {
      title: "Profile",
      personalInfo: "Personal Information",
      achievements: "Achievements",
      stats: "Statistics",
      edit: "Edit Profile",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone",
      studentCode: "Student Code",
      joinDate: "Join Date",
      level: "Level",
      totalXP: "Total XP",
      coursesEnrolled: "Courses Enrolled",
      completionRate: "Completion Rate",
      streak: "Current Streak",
      badges: "Badges Earned",
    },
    ar: {
      title: "الملف الشخصي",
      personalInfo: "المعلومات الشخصية",
      achievements: "الإنجازات",
      stats: "الإحصائيات",
      edit: "تعديل الملف",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      studentCode: "كود الطالب",
      joinDate: "تاريخ الانضمام",
      level: "المستوى",
      totalXP: "إجمالي النقاط",
      coursesEnrolled: "المقررات المسجلة",
      completionRate: "معدل الإنجاز",
      streak: "السلسلة الحالية",
      badges: "الشارات المكتسبة",
    },
  };

  const t = translations[language];

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first course",
      icon: "🎯",
      earned: true,
      date: "Oct 1, 2025",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "7 day login streak",
      icon: "🔥",
      earned: true,
      date: "Oct 15, 2025",
    },
    {
      id: 3,
      name: "XP Master",
      description: "Earn 1000 XP",
      icon: "⚡",
      earned: false,
      progress: 75,
    },
    {
      id: 4,
      name: "Quiz Champion",
      description: "Answer 50 questions correctly",
      icon: "🏆",
      earned: false,
      progress: 60,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2">{t.title}</h1>
        <p className="text-muted-foreground">
          Manage your profile and view achievements
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary neon-red">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {user?.fullName?.[0] || "S"}
                  </AvatarFallback>
                </Avatar>

                <h3 className="mb-1">
                  {user?.fullName || "Student Name"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {user?.studentCode || "STU12345"}
                </p>

                <div className="w-full space-y-4 mb-6">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="flex items-center gap-1 text-accent">
                        <Zap className="w-4 h-4" />
                        {t.level} {studentData.level}
                      </span>
                      <span className="text-muted-foreground">
                        {studentData.xp}/
                        {studentData.nextLevelXP}
                      </span>
                    </div>
                    <Progress
                      value={
                        (studentData.xp /
                          studentData.nextLevelXP) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Edit className="w-4 h-4 mr-2" />
                  {t.edit}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Info & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.personalInfo}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.fullName}
                    </p>
                    <p>{user?.fullName || "Student Name"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.email}
                    </p>
                    <p className="truncate">
                      {user?.email || "student@example.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Phone className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.phone}
                    </p>
                    <p>{user?.phone || "+20 123 456 7890"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.joinDate}
                    </p>
                    <p>September 15, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{t.stats}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: t.totalXP,
                    value: studentData.xp,
                    color: "primary",
                  },
                  {
                    label: t.coursesEnrolled,
                    value: "6",
                    color: "secondary",
                  },
                  {
                    label: t.completionRate,
                    value: "68%",
                    color: "accent",
                  },
                  {
                    label: t.streak,
                    value: `${studentData.streak} days`,
                    color: "primary",
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-muted/50 rounded-lg"
                  >
                    <p className="text-sm text-muted-foreground mb-2">
                      {stat.label}
                    </p>
                    <p
                      className={`text-2xl font-bold ${
                        stat.color === "primary"
                          ? "text-primary"
                          : stat.color === "secondary"
                            ? "text-secondary"
                            : "text-accent"
                      }`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  {t.achievements}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      duration: 0.3,
                    }}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? "border-primary bg-primary/10"
                        : "border-muted bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="mb-1">
                          {achievement.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <Badge className="bg-accent/20 text-accent border-accent">
                            {achievement.date}
                          </Badge>
                        ) : (
                          <div className="space-y-1">
                            <Progress
                              value={achievement.progress}
                              className="h-1"
                            />
                            <p className="text-xs text-muted-foreground">
                              {achievement.progress}% Complete
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}