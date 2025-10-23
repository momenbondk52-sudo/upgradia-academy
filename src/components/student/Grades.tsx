import { motion } from "motion/react";
import {
  TrendingUp,
  Award,
  Target,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface GradesProps {
  language: "en" | "ar";
  studentData: any;
}

export function Grades({ language, studentData }: GradesProps) {
  const translations = {
    en: {
      title: "Grades & Performance",
      overview: "Performance Overview",
      courseGrades: "Course Grades",
      xpProgress: "XP Progress",
      engagement: "Engagement Score",
      classRank: "Class Rank",
      weeklyXP: "Weekly XP",
      skillRadar: "Skills Radar",
    },
    ar: {
      title: "الدرجات والأداء",
      overview: "نظرة عامة على الأداء",
      courseGrades: "درجات المقررات",
      xpProgress: "تقدم نقاط الخبرة",
      engagement: "مستوى التفاعل",
      classRank: "الترتيب في الصف",
      weeklyXP: "نقاط الأسبوع",
      skillRadar: "رادار المهارات",
    },
  };

  const t = translations[language];

  const courseGrades = [
    { name: "Data Structures", grade: 85, xp: 320, maxXP: 500 },
    {
      name: "Database Systems",
      grade: 78,
      xp: 180,
      maxXP: 400,
    },
    { name: "Web Development", grade: 92, xp: 450, maxXP: 600 },
    { name: "Algorithms", grade: 88, xp: 280, maxXP: 450 },
  ];

  const weeklyXPData = [
    { week: "Week 1", xp: 85 },
    { week: "Week 2", xp: 120 },
    { week: "Week 3", xp: 95 },
    { week: "Week 4", xp: 150 },
    { week: "Week 5", xp: 180 },
    { week: "Week 6", xp: 120 },
  ];

  const skillsData = [
    { skill: "Problem Solving", value: 85 },
    { skill: "Coding", value: 78 },
    { skill: "Theory", value: 92 },
    { skill: "Participation", value: 88 },
    { skill: "Consistency", value: 90 },
  ];

  const engagementScore = 87;
  const classRank = 42;
  const totalStudents = 150;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2">{t.title}</h1>
        <p className="text-muted-foreground">
          Track your academic performance and growth
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total XP",
            value: studentData.xp,
            icon: Award,
            color: "primary",
            subtext: `Level ${studentData.level}`,
          },
          {
            label: t.engagement,
            value: `${engagementScore}%`,
            icon: Target,
            color: "accent",
            subtext: "Above average",
          },
          {
            label: t.classRank,
            value: `#${classRank}`,
            icon: TrendingUp,
            color: "secondary",
            subtext: `of ${totalStudents}`,
          },
          {
            label: "Avg Grade",
            value: "86%",
            icon: BarChart3,
            color: "primary",
            subtext: "Very Good",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
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
                <p className="text-2xl font-bold mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.subtext}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly XP Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t.weeklyXP}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyXPData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis dataKey="week" stroke="#8a8a9e" />
                    <YAxis stroke="#8a8a9e" />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      type="monotone"
                      dataKey="xp"
                      stroke="#dc0028"
                      strokeWidth={3}
                      dot={{ fill: "#dc0028", r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t.skillRadar}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
                    <PolarGrid stroke="rgba(255,255,255,0.2)" />
                    <PolarAngleAxis
                      dataKey="skill"
                      stroke="#8a8a9e"
                    />
                    <PolarRadiusAxis stroke="#8a8a9e" />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#00d9ff"
                      fill="#00d9ff"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Course Grades */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>{t.courseGrades}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {courseGrades.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.7 + index * 0.1,
                  duration: 0.5,
                }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4>{course.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {course.xp} / {course.maxXP} XP
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {course.grade}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Grade
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress
                    value={course.grade}
                    className="h-2"
                  />
                  <Progress
                    value={(course.xp / course.maxXP) * 100}
                    className="h-1"
                  />
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}