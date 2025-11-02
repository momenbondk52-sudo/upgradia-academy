import { motion, AnimatePresence } from "motion/react";
import { Bell, X, CheckCircle, AlertCircle, Info, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { soundManager } from "../utils/soundManager";

interface NotificationsProps {
  language: "en" | "ar";
  onClose: () => void;
}

export function Notifications({ language, onClose }: NotificationsProps) {
  const notifications = [
    {
      id: 1,
      type: "success",
      icon: CheckCircle,
      titleEn: "Assignment Submitted",
      titleAr: "تم تقديم الواجب",
      descEn: "Your assignment for Web Development has been submitted successfully.",
      descAr: "تم تقديم واجبك في تطوير الويب بنجاح.",
      time: "5m ago",
      timeAr: "منذ 5 دقائق",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      icon: Info,
      titleEn: "New Course Available",
      titleAr: "دورة جديدة متاحة",
      descEn: "Advanced Machine Learning course is now available for enrollment.",
      descAr: "دورة التعلم الآلي المتقدم متاحة الآن للتسجيل.",
      time: "1h ago",
      timeAr: "منذ ساعة",
      unread: true,
    },
    {
      id: 3,
      type: "warning",
      icon: AlertCircle,
      titleEn: "Deadline Approaching",
      titleAr: "اقتراب موعد التسليم",
      descEn: "Your Data Science project is due in 2 days.",
      descAr: "مشروع علوم البيانات الخاص بك مستحق خلال يومين.",
      time: "3h ago",
      timeAr: "منذ 3 ساعات",
      unread: false,
    },
    {
      id: 4,
      type: "achievement",
      icon: Zap,
      titleEn: "Level Up!",
      titleAr: "ارتقاء في المستوى!",
      descEn: "Congratulations! You've reached Level 15.",
      descAr: "تهانينا! لقد وصلت إلى المستوى 15.",
      time: "1d ago",
      timeAr: "منذ يوم",
      unread: false,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "from-green-500 to-emerald-500";
      case "info":
        return "from-blue-500 to-cyan-500";
      case "warning":
        return "from-yellow-500 to-orange-500";
      case "achievement":
        return "from-purple-500 to-pink-500";
      default:
        return "from-primary to-secondary";
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Notification Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md bg-card/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl overflow-hidden ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-red">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold flex items-center gap-2">
                {language === "en" ? "Notifications" : "الإشعارات"}
                {unreadCount > 0 && (
                  <Badge variant="default" className="text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </h3>
              <p className="text-xs text-muted-foreground">
                {language === "en"
                  ? `${notifications.length} total`
                  : `${notifications.length} إجمالي`}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-muted/20"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: language === "ar" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, x: language === "ar" ? -2 : 2 }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer btn-press ${
                    notification.unread
                      ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                      : "bg-muted/10 border-border/50 hover:border-border"
                  }`}
                  onClick={() => soundManager.playClick()}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTypeColor(
                        notification.type
                      )} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium text-sm">
                          {language === "en"
                            ? notification.titleEn
                            : notification.titleAr}
                        </h4>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {language === "en"
                          ? notification.descEn
                          : notification.descAr}
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        {language === "en" ? notification.time : notification.timeAr}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm">
                {language === "en"
                  ? "No notifications yet"
                  : "لا توجد إشعارات بعد"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full rounded-xl hover:bg-muted/20 text-xs"
            onClick={() => {
              soundManager.playClick();
              // Mark all as read logic here
            }}
          >
            {language === "en" ? "Mark all as read" : "تحديد الكل كمقروء"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
