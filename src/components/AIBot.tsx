import { motion } from "motion/react";
import { useState } from "react";
import {
  X,
  Send,
  Sparkles,
  Zap,
  Brain,
  TrendingUp,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { soundManager } from "../utils/soundManager";

interface AIBotProps {
  onClose: () => void;
  language: "en" | "ar";
}

export function AIBot({ onClose, language }: AIBotProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        language === "en"
          ? "Hello! I'm your AI learning assistant. How can I help you today?"
          : "مرحباً! أنا مساعد التعلم الذكي الخاص بك. كيف يمكنني مساعدتك اليوم؟",
    },
  ]);

  const quickActions = [
    {
      icon: TrendingUp,
      labelEn: "My Progress",
      labelAr: "تقدمي",
      message: "Show me my learning progress",
    },
    {
      icon: Brain,
      labelEn: "Study Tips",
      labelAr: "نصائح الدراسة",
      message: "Give me some study tips",
    },
    {
      icon: Sparkles,
      labelEn: "Next Steps",
      labelAr: "الخطوات التالية",
      message: "What should I learn next?",
    },
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    soundManager.playClick();
    setMessages([
      ...messages,
      { type: "user", content: message },
    ]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      soundManager.playNotification();
      const responses = [
        language === "en"
          ? "Great question! Based on your current progress, I recommend focusing on the Data Structures module next."
          : "سؤال رائع! بناءً على تقدمك الحالي، أوصي بالتركيز على وحدة هياكل البيانات التالية.",
        language === "en"
          ? "You're doing amazing! You've completed 3 courses this month. Keep up the great work! 🎉"
          : "أنت تقوم بعمل رائع! لقد أكملت 3 دورات هذا الشهر. استمر في العمل الرائع! 🎉",
        language === "en"
          ? "I've analyzed your study patterns. You learn best in the morning. Try scheduling your toughest subjects then!"
          : "لقد حللت أنماط دراستك. أنت تتعلم بشكل أفضل في الصباح. حاول جدولة المواد الأصعب في ذلك الوقت!",
      ];
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            responses[
              Math.floor(Math.random() * responses.length)
            ],
        },
      ]);
    }, 1000);
  };

  const handleQuickAction = (
    action: (typeof quickActions)[0],
  ) => {
    soundManager.playClick();
    setMessage(action.message);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-end p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Chat Panel */}
      <motion.div
        initial={{ x: 400, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={{ x: 400, y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-[600px] rounded-3xl bg-card/90 backdrop-blur-2xl border-2 border-primary/30 glow-red flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-primary via-secondary to-accent border-b border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-20" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-black text-white">
                  AI Assistant
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/80">
                    {language === "en" ? "Online" : "متصل"}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-xl hover:bg-white/20 text-white btn-press"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.type === "user"
                    ? "bg-gradient-to-br from-primary to-secondary text-white"
                    : "bg-muted/30 border border-border"
                }`}
              >
                {msg.type === "bot" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent font-medium">
                      AI
                    </span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 border-t border-border/50">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleQuickAction(action)}
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border whitespace-nowrap transition-all btn-press"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">
                    {language === "en"
                      ? action.labelEn
                      : action.labelAr}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border/50 bg-card/50">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleSend()
              }
              placeholder={
                language === "en"
                  ? "Ask me anything..."
                  : "اسألني أي شيء..."
              }
              className="flex-1 h-12 rounded-xl bg-input-background border-border focus:border-primary/50"
            />
            <Button
              onClick={handleSend}
              onMouseEnter={() => soundManager.playHover()}
              disabled={!message.trim()}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary hover:opacity-90 transition-all btn-press"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}