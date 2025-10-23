import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Check,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner@2.0.3";

interface VideoPlayerProps {
  video: any;
  onClose: () => void;
  onXPEarned: (xp: number) => void;
  language: "en" | "ar";
}

export function VideoPlayer({
  video,
  onClose,
  onXPEarned,
  language,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] =
    useState<any>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Set<number>
  >(new Set());
  const [earnedViewXP, setEarnedViewXP] = useState(false);

  const translations = {
    en: {
      question: "Question",
      submit: "Submit Answer",
      correct: "Correct! +",
      incorrect: "Incorrect. +",
      viewXP: "Video View XP",
      close: "Close Video",
      true: "True",
      false: "False",
    },
    ar: {
      question: "سؤال",
      submit: "إرسال الإجابة",
      correct: "إجابة صحيحة! +",
      incorrect: "إجابة خاطئة. +",
      viewXP: "نقاط مشاهدة الفيديو",
      close: "إغلاق الفيديو",
      true: "صح",
      false: "خطأ",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleTimeUpdate = () => {
      const current = videoElement.currentTime;
      setCurrentTime(current);

      // Check if we've reached 50% of the video to award view XP
      if (
        !earnedViewXP &&
        current >= duration * 0.5 &&
        duration > 0
      ) {
        onXPEarned(video.xp);
        setEarnedViewXP(true);
        toast.success(`${t.viewXP} +${video.xp} XP`);
      }

      // Check for questions at specific timestamps
      if (video.questions && video.questions.length > 0) {
        video.questions.forEach((q: any, index: number) => {
          if (
            Math.abs(current - q.timestamp) < 0.5 &&
            !answeredQuestions.has(index) &&
            !showQuestion
          ) {
            videoElement.pause();
            setIsPlaying(false);
            setCurrentQuestion({ ...q, index });
            setShowQuestion(true);
          }
        });
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    videoElement.addEventListener(
      "timeupdate",
      handleTimeUpdate,
    );
    videoElement.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    return () => {
      videoElement.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
      );
      videoElement.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
    };
  }, [
    video,
    duration,
    answeredQuestions,
    showQuestion,
    earnedViewXP,
    onXPEarned,
    t,
    video.xp,
  ]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleQuestionAnswer = (selectedAnswer: any) => {
    if (!currentQuestion) return;

    const isCorrect =
      currentQuestion.type === "mcq"
        ? selectedAnswer === currentQuestion.correctAnswer
        : selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      onXPEarned(currentQuestion.xp);
      toast.success(`${t.correct}${currentQuestion.xp} XP`, {
        description: "🎯 Great job!",
      });
    } else {
      toast.error(t.incorrect, {
        description: "Keep learning!",
      });
    }

    setAnsweredQuestions(
      (prev) => new Set([...prev, currentQuestion.index]),
    );
    setShowQuestion(false);
    setCurrentQuestion(null);

    // Resume video
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-5xl">
        {/* Video Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>{video.title}</h3>
            <p className="text-sm text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
          <Button onClick={onClose} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            {t.close}
          </Button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden neon-red">
          <video
            ref={videoRef}
            src={video.url}
            className="w-full aspect-video"
            onClick={handlePlayPause}
          />

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-primary transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={handleMuteToggle}
                  className="text-white hover:text-primary transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>
                <span className="text-white text-sm">
                  {formatTime(currentTime)} /{" "}
                  {formatTime(duration)}
                </span>
              </div>
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-primary transition-colors"
              >
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Question Overlay */}
          <AnimatePresence>
            {showQuestion && currentQuestion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-black/90 flex items-center justify-center p-8"
              >
                <Card className="w-full max-w-2xl bg-card/95 backdrop-blur-sm border-primary neon-red">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="mb-2 text-primary">
                        {t.question}
                      </h3>
                      <p className="text-lg">
                        {currentQuestion.question}
                      </p>
                    </div>

                    {currentQuestion.type === "mcq" ? (
                      <div className="space-y-3">
                        {currentQuestion.options.map(
                          (option: string, index: number) => (
                            <Button
                              key={index}
                              onClick={() =>
                                handleQuestionAnswer(index)
                              }
                              variant="outline"
                              className="w-full h-auto py-4 justify-start hover:border-primary hover:bg-primary/10 transition-all"
                            >
                              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                                {String.fromCharCode(
                                  65 + index,
                                )}
                              </span>
                              {option}
                            </Button>
                          ),
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          onClick={() =>
                            handleQuestionAnswer(true)
                          }
                          variant="outline"
                          className="h-20 hover:border-accent hover:bg-accent/10 transition-all"
                        >
                          <Check className="w-6 h-6 mr-2 text-accent" />
                          {t.true}
                        </Button>
                        <Button
                          onClick={() =>
                            handleQuestionAnswer(false)
                          }
                          variant="outline"
                          className="h-20 hover:border-destructive hover:bg-destructive/10 transition-all"
                        >
                          <X className="w-6 h-6 mr-2 text-destructive" />
                          {t.false}
                        </Button>
                      </div>
                    )}

                    <div className="text-center mt-6">
                      <p className="text-sm text-muted-foreground">
                        Reward:{" "}
                        <span className="text-accent font-bold">
                          +{currentQuestion.xp} XP
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}