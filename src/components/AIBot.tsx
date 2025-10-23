import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface AIBotProps {
  onClose: () => void;
  language: "en" | "ar";
  studentData: any;
}

export function AIBot({
  onClose,
  language,
  studentData,
}: AIBotProps) {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text:
        language === "en"
          ? `Hi! I'm your AI learning assistant. I can help you with insights about your performance, suggest areas to focus on, and answer questions about your courses. How can I help you today?`
          : `مرحباً! أنا مساعد التعلم الذكي. يمكنني مساعدتك في فهم أدائك واقتراح المجالات التي يجب التركيز عليها والإجابة على أسئلتك حول المقررات. كيف يمكنني مساعدتك اليوم؟`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const translations = {
    en: {
      title: "AI Assistant",
      placeholder: "Ask me anything...",
      send: "Send",
    },
    ar: {
      title: "المساعد الذكي",
      placeholder: "اسألني أي شيء...",
      send: "إرسال",
    },
  };

  const t = translations[language];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop =
        scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Pattern matching for different queries
    if (
      lowerMessage.includes("weak") ||
      lowerMessage.includes("improve") ||
      lowerMessage.includes("ضعيف") ||
      lowerMessage.includes("تحسين")
    ) {
      return language === "en"
        ? `Based on your performance data, you're doing great overall! However, I notice your engagement in "Database Systems" is slightly lower (40% progress). I recommend:\n\n• Watch the pending videos in Database Systems\n• Complete the SQL practice quizzes\n• Review the normalization concepts\n\nThis could earn you an additional 220 XP this week! 🎯`
        : `بناءً على بيانات أدائك، أنت تقوم بعمل رائع بشكل عام! ومع ذلك، ألاحظ أن تفاعلك في "أنظمة قواعد البيانات" أقل قليلاً (40٪ تقدم). أوصي بـ:\n\n• مشاهدة الفيديوهات المعلقة في أنظمة قواعد البيانات\n• إكمال اختبارات SQL التدريبية\n• مراجعة مفاهيم التطبيع\n\nهذا يمكن أن يكسبك 220 نقطة إضافية هذا الأسبوع! 🎯`;
    }

    if (
      lowerMessage.includes("xp") ||
      lowerMessage.includes("earn") ||
      lowerMessage.includes("نقاط") ||
      lowerMessage.includes("كسب")
    ) {
      return language === "en"
        ? `Great question! Here are the best ways to earn XP right now:\n\n✨ Quick Wins:\n• Complete pending quiz in Data Structures (+50 XP)\n• Watch 2 videos in Database Systems (+30 XP)\n• Answer discussion questions (+20 XP each)\n\n🔥 This Week's Bonus:\n• Maintain your ${studentData.streak}-day streak (already doing great!)\n• Reach 800 XP to level up (only ${studentData.nextLevelXP - studentData.xp} XP away!)\n\nYou're on track to earn ~180 XP this week!`
        : `سؤال رائع! إليك أفضل الطرق لكسب النقاط الآن:\n\n✨ مكاسب سريعة:\n• أكمل الاختبار المعلق في هياكل البيانات (+50 نقطة)\n• شاهد فيديوهين في أنظمة قواعد البيانات (+30 نقطة)\n• أجب على أسئلة النقاش (+20 نقطة لكل منها)\n\n🔥 مكافأة هذا الأسبوع:\n• حافظ على سلسلتك لمدة ${studentData.streak} يوم (أنت تقوم بعمل رائع!)\n• اصل إلى 800 نقطة للترقية (فقط ${studentData.nextLevelXP - studentData.xp} نقطة متبقية!)\n\nأنت في طريقك لكسب ~180 نقطة هذا الأسبوع!`;
    }

    if (
      lowerMessage.includes("rank") ||
      lowerMessage.includes("position") ||
      lowerMessage.includes("ترتيب") ||
      lowerMessage.includes("مركز")
    ) {
      return language === "en"
        ? `You're currently ranked #42 out of 150 students! 🏆\n\nYou're in the top 28% of your class. To move up:\n\n• You're 45 XP behind rank #41\n• Top 10 students have 1200+ XP\n• Your engagement score (87%) is above class average (75%)\n\nKeep up the great work! Your consistency is your strength. 💪`
        : `أنت حالياً في المرتبة #42 من أصل 150 طالباً! 🏆\n\nأنت ضمن أفضل 28٪ من صفك. للتقدم:\n\n• أنت متأخر 45 نقطة عن المرتبة #41\n• أفضل 10 طلاب لديهم 1200+ نقطة\n• درجة تفاعلك (87٪) أعلى من متوسط الصف (75٪)\n\nاستمر في العمل الرائع! الاتساق هو قوتك. 💪`;
    }

    if (
      lowerMessage.includes("course") ||
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("مقرر") ||
      lowerMessage.includes("توصية")
    ) {
      return language === "en"
        ? `Based on your strong performance in Web Development (92%), I recommend:\n\n📚 Next Steps:\n• "Artificial Intelligence" - builds on your programming skills\n• "Mobile App Development" - natural extension of web dev\n\n⚡ Priority:\n• Focus on completing "Data Structures" (85% - you're doing well!)\n• The upcoming algorithms module will be crucial\n\nYou have a talent for practical applications! 🚀`
        : `بناءً ع��ى أدائك القوي في تطوير الويب (92٪)، أوصي بـ:\n\n📚 الخطوات التالية:\n• "الذكاء الاصطناعي" - يبني على مهاراتك البرمجية\n• "تطوير تطبيقات الموبايل" - امتداد طبيعي لتطوير الويب\n\n⚡ الأولوية:\n• ركز على إكمال "هياكل البيانات" (85٪ - أنت تقوم بعمل جيد!)\n• وحدة الخوارزميات القادمة ستكون حاسمة\n\nلديك موهبة في التطبيقات العملية! 🚀`;
    }

    // Default response
    return language === "en"
      ? `I can help you with:\n\n• 📊 Performance analysis and insights\n• 🎯 Personalized study recommendations\n• ⚡ XP earning strategies\n• 📈 Course progress tracking\n• 🏆 Ranking and competition tips\n\nWhat would you like to know more about?`
      : `يمكنني مساعدتك في:\n\n• 📊 تحليل الأداء والرؤى\n• 🎯 توصيات دراسية مخصصة\n• ⚡ استراتيجيات كسب النقاط\n• 📈 تتبع تقدم المقررات\n• 🏆 نصائح الترتيب والمنافسة\n\nما الذي تود معرفة المزيد عنه؟`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
    ]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const response = generateResponse(input);
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: response },
        ]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl"
      >
        <Card className="border border-secondary/50 glow-blue">
          <CardHeader className="border-b border-border/50 bg-secondary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Sparkles className="w-5 h-5" />
                {t.title}
              </CardTitle>
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-96 p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground border border-primary/20"
                          : "bg-secondary/10 text-foreground border border-secondary/30"
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                      <div className="flex gap-2">
                        <motion.div
                          className="w-2 h-2 bg-secondary rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-secondary rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.2,
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-secondary rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.4,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-input-background border-secondary/30 focus:border-secondary"
                />
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}