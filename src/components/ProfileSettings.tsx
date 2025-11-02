import { motion } from "motion/react";
import { useState } from "react";
import { Camera, User, Mail, Phone, Calendar, MapPin, Save, X, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { soundManager } from "../utils/soundManager";
import { toast } from "sonner@2.0.3";

interface ProfileSettingsProps {
  language: "en" | "ar";
  role: "student" | "professor" | "ta" | "admin";
  user: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function ProfileSettings({
  language,
  role,
  user,
  onClose,
  onSave,
}: ProfileSettingsProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
    location: user?.location || "",
  });

  // Role-specific avatar collections
  const avatarCollections = {
    student: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=student1&backgroundColor=b6e3f4",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=student2&backgroundColor=c0aede",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=student3&backgroundColor=d1d4f9",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=student4&backgroundColor=ffd5dc",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=student5&backgroundColor=ffdfbf",
    ],
    professor: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=prof1&glasses=prescription01&backgroundColor=b6e3f4",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=prof2&glasses=prescription02&backgroundColor=c0aede",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=prof3&accessories=glasses&backgroundColor=d1d4f9",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=prof4&facialHair=medium&backgroundColor=ffd5dc",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=prof5&top=shortHair&backgroundColor=ffdfbf",
    ],
    ta: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ta1&backgroundColor=b6e3f4",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ta2&backgroundColor=c0aede",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ta3&backgroundColor=d1d4f9",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ta4&backgroundColor=ffd5dc",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=ta5&backgroundColor=ffdfbf",
    ],
    admin: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin1&accessories=sunglasses&backgroundColor=b6e3f4",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin2&top=shortHair&backgroundColor=c0aede",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin3&facialHair=full&backgroundColor=d1d4f9",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin4&accessories=prescription&backgroundColor=ffd5dc",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=admin5&top=longHair&backgroundColor=ffdfbf",
    ],
  };

  const avatars = avatarCollections[role] || avatarCollections.student;

  const handleSave = () => {
    soundManager.playSuccess();
    onSave({
      ...formData,
      avatar: selectedAvatar,
    });
    toast.success(
      language === "en"
        ? "Profile updated successfully!"
        : "تم تحديث الملف الشخصي بنجاح!"
    );
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result as string);
        soundManager.playClick();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Settings Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl bg-card/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl overflow-hidden ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black gradient-text">
            {language === "en" ? "Profile Settings" : "إعدادات الملف الشخصي"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl hover:bg-muted/20"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Avatar Section */}
          <div className="mb-6 sm:mb-8">
            <Label className="text-sm font-medium mb-3 block">
              {language === "en" ? "Profile Picture" : "صورة الملف الشخصي"}
            </Label>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-primary/50 glow-red">
                  <AvatarImage src={selectedAvatar || avatars[0]} />
                  <AvatarFallback>
                    {formData.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="upload-photo"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform btn-press shadow-lg"
                  onClick={() => soundManager.playClick()}
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    id="upload-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl mb-2"
                  onClick={() => {
                    soundManager.playClick();
                    setShowAvatarPicker(!showAvatarPicker);
                  }}
                >
                  <User className="w-4 h-4 mr-2" />
                  {language === "en" ? "Choose Avatar" : "اختر صورة رمزية"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {language === "en"
                    ? "Upload a photo or choose an avatar"
                    : "ارفع صورة أو اختر صورة رمزية"}
                </p>
              </div>
            </div>

            {/* Avatar Picker */}
            {showAvatarPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-5 gap-3 p-4 rounded-xl bg-muted/20 border border-border"
              >
                {avatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      soundManager.playClick();
                    }}
                    className={`w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedAvatar === avatar
                        ? "border-primary glow-red"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                <User className="w-4 h-4 inline mr-2" />
                {language === "en" ? "Full Name" : "الاسم الكامل"}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="rounded-xl"
                placeholder={
                  language === "en" ? "Enter your name" : "أدخل اسمك"
                }
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                <Mail className="w-4 h-4 inline mr-2" />
                {language === "en" ? "Email" : "البريد الإلكتروني"}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="rounded-xl"
                placeholder={
                  language === "en"
                    ? "Enter your email"
                    : "أدخل بريدك الإلكتروني"
                }
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm font-medium mb-2 block">
                <Phone className="w-4 h-4 inline mr-2" />
                {language === "en" ? "Phone Number" : "رقم الهاتف"}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="rounded-xl"
                placeholder={
                  language === "en"
                    ? "Enter your phone"
                    : "أدخل رقم هاتفك"
                }
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dob" className="text-sm font-medium mb-2 block">
                <Calendar className="w-4 h-4 inline mr-2" />
                {language === "en" ? "Date of Birth" : "تاريخ الميلاد"}
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="rounded-xl"
              />
            </div>

            {/* Location */}
            <div>
              <Label
                htmlFor="location"
                className="text-sm font-medium mb-2 block"
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                {language === "en" ? "Location" : "الموقع"}
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="rounded-xl"
                placeholder={
                  language === "en"
                    ? "Enter your location"
                    : "أدخل موقعك"
                }
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-border flex items-center justify-end gap-3">
          <Button
            variant="ghost"
            className="rounded-xl"
            onClick={onClose}
          >
            {language === "en" ? "Cancel" : "إلغاء"}
          </Button>
          <Button
            className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            {language === "en" ? "Save Changes" : "حفظ التغييرات"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
