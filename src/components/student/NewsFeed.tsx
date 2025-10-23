import { motion } from "motion/react";
import {
  Bell,
  TrendingUp,
  Award,
  BookOpen,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface NewsFeedProps {
  language: "en" | "ar";
}

export function NewsFeed({ language }: NewsFeedProps) {
  const translations = {
    en: {
      title: "News Feed",
      aiSuggestions: "AI Suggestions",
      announcements: "Announcements",
      recentActivity: "Recent Activity",
      viewAll: "View All",
    },
    ar: {
      title: "الأخبار",
      aiSuggestions: "اقتراحات الذكاء الاصطناعي",
      announcements: "الإعلانات",
      recentActivity: "النشاط الأخير",
      viewAll: "عرض الكل",
    },
  };

  const t = translations[language];

  const announcements = [
    {
      id: 1,
      title: "New Course Available: Advanced Web Development",
      description: "Enroll now and start earning XP!",
      date: "2 hours ago",
      type: "course",
      icon: BookOpen,
      color: "secondary",
    },
    {
      id: 2,
      title: "Weekly Leaderboard Updated",
      description: "You're now ranked #42! Keep climbing!",
      date: "5 hours ago",
      type: "achievement",
      icon: Award,
      color: "accent",
    },
    {
      id: 3,
      title: "System Maintenance Scheduled",
      description:
        "Platform will be unavailable on Saturday 2:00 AM - 4:00 AM",
      date: "1 day ago",
      type: "info",
      icon: Bell,
      color: "primary",
    },
  ];

  const aiSuggestions = [
    {
      id: 1,
      text: 'You have pending quiz in "Data Structures" - Complete it to earn 50 XP',
      priority: "high",
    },
    {
      id: 2,
      text: 'Your engagement in "Algorithms" is low this week. Watch 2 more videos to maintain your streak.',
      priority: "medium",
    },
    {
      id: 3,
      text: 'Great job! Your performance in "Database Systems" is 15% above class average.',
      priority: "positive",
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
          Stay updated with your learning journey
        </p>
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <Sparkles className="w-5 h-5" />
              {t.aiSuggestions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.5,
                }}
                className={`p-4 rounded-lg border-l-4 ${
                  suggestion.priority === "high"
                    ? "bg-primary/10 border-primary"
                    : suggestion.priority === "medium"
                      ? "bg-secondary/10 border-secondary"
                      : "bg-accent/10 border-accent"
                }`}
              >
                <p className="text-sm">{suggestion.text}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Announcements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t.announcements}</span>
              <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                {t.viewAll}
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                }}
                className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    announcement.color === "primary"
                      ? "bg-primary/20 text-primary"
                      : announcement.color === "secondary"
                        ? "bg-secondary/20 text-secondary"
                        : "bg-accent/20 text-accent"
                  } group-hover:scale-110 transition-transform`}
                >
                  <announcement.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="mb-1 truncate">
                    {announcement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {announcement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {announcement.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Courses Active",
            value: "6",
            icon: BookOpen,
            color: "primary",
          },
          {
            label: "XP This Week",
            value: "+120",
            icon: TrendingUp,
            color: "secondary",
          },
          {
            label: "Achievements",
            value: "18",
            icon: Award,
            color: "accent",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="hover:scale-105 transition-transform cursor-pointer"
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === "primary"
                    ? "bg-primary/20 text-primary"
                    : stat.color === "secondary"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-accent/20 text-accent"
                }`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}