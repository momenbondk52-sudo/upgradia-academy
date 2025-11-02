import { motion } from "motion/react";
import { Bell, Calendar, Trophy, Zap, BookOpen, Users } from "lucide-react";
import { Badge } from "../ui/badge";

interface NewsFeedProps {
  language: "en" | "ar";
}

export function NewsFeed({ language }: NewsFeedProps) {
  const newsItems = [
    {
      id: 1,
      icon: Trophy,
      titleEn: "New Competition: Code Challenge 2025",
      titleAr: "مسابقة جديدة: تحدي البرمجة 2025",
      descEn: "Join our annual coding competition and win amazing prizes!",
      descAr: "انضم إلى مسابقة البرمجة السنوية واربح جوائز مذهلة!",
      date: "2025-10-25",
      type: "competition",
      color: "from-yellow-500 to-orange-500",
      badgeEn: "Competition",
      badgeAr: "مسابقة",
    },
    {
      id: 2,
      icon: BookOpen,
      titleEn: "Advanced Machine Learning Course Now Available",
      titleAr: "دورة التعلم الآلي المتقدم متاحة الآن",
      descEn: "Dive deep into neural networks and AI with our new course.",
      descAr: "تعمق في الشبكات العصبية والذكاء الاصطناعي مع دورتنا الجديدة.",
      date: "2025-10-24",
      type: "course",
      color: "from-blue-500 to-cyan-500",
      badgeEn: "New Course",
      badgeAr: "دورة جديدة",
    },
    {
      id: 3,
      icon: Zap,
      titleEn: "System Upgrade: Enhanced Performance",
      titleAr: "ترقية النظام: أداء محسّن",
      descEn: "Experience faster loading times and smoother navigation.",
      descAr: "استمتع بأوقات تحميل أسرع وتصفح أكثر سلاسة.",
      date: "2025-10-23",
      type: "update",
      color: "from-purple-500 to-pink-500",
      badgeEn: "Update",
      badgeAr: "تحديث",
    },
    {
      id: 4,
      icon: Users,
      titleEn: "Weekly Study Group - Join Us!",
      titleAr: "مجموعة الدراسة الأسبوعية - انضم إلينا!",
      descEn: "Collaborative learning sessions every Wednesday at 7 PM.",
      descAr: "جلسات تعلم تعاونية كل أربعاء الساعة 7 مساءً.",
      date: "2025-10-22",
      type: "event",
      color: "from-green-500 to-emerald-500",
      badgeEn: "Event",
      badgeAr: "حدث",
    },
  ];

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date("2025-10-27"); // Current date from context
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return language === "en" ? "Today" : "اليوم";
    } else if (diffDays === 1) {
      return language === "en" ? "Yesterday" : "أمس";
    } else if (diffDays === 2) {
      return language === "en" ? "2 days ago" : "منذ يومين";
    } else {
      return language === "en" ? `${diffDays} days ago` : `منذ ${diffDays} أيام`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border border-border h-full"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          {language === "en" ? "News & Updates" : "الأخبار والتحديثات"}
        </h3>
        <Badge variant="secondary" className="text-xs">
          {newsItems.length}
        </Badge>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
        {newsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: language === "ar" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ x: language === "ar" ? -3 : 3, scale: 1.01 }}
              className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/20 hover:bg-muted/30 transition-all cursor-pointer btn-press border border-border/50 hover:border-primary/30"
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 glow-${item.type === 'competition' ? 'gold' : item.type === 'course' ? 'blue' : item.type === 'update' ? 'cyan' : 'green'}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-xs sm:text-sm line-clamp-1">
                      {language === "en" ? item.titleEn : item.titleAr}
                    </h4>
                    <Badge 
                      variant="outline" 
                      className="text-[9px] sm:text-[10px] px-1.5 py-0 h-5 flex-shrink-0"
                    >
                      {language === "en" ? item.badgeEn : item.badgeAr}
                    </Badge>
                  </div>
                  
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 line-clamp-2">
                    {language === "en" ? item.descEn : item.descAr}
                  </p>

                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{getRelativeTime(item.date)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 sm:py-2.5 px-4 rounded-lg sm:rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs sm:text-sm font-medium transition-colors border border-primary/20 hover:border-primary/40"
      >
        {language === "en" ? "View All News" : "عرض جميع الأخبار"}
      </motion.button>
    </motion.div>
  );
}
