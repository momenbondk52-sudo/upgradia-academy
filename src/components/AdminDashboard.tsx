import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Users, BookOpen, BarChart3, LogOut, Menu, X, Shield, Check, X as XIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
  language: 'en' | 'ar';
}

export function AdminDashboard({ user, onLogout, language }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<'overview' | 'users' | 'courses' | 'reports'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const translations = {
    en: {
      dashboard: 'Admin Dashboard',
      overview: 'Overview',
      userManagement: 'User Management',
      courseManagement: 'Course Management',
      reports: 'AI Reports',
      logout: 'Logout',
    },
    ar: {
      dashboard: 'لوحة تحكم المسؤول',
      overview: 'نظرة عامة',
      userManagement: 'إدارة المستخدمين',
      courseManagement: 'إدارة المقررات',
      reports: 'تقارير الذكاء الاصطناعي',
      logout: 'تسجيل الخروج',
    },
  };

  const t = translations[language];

  const menuItems = [
    { id: 'overview', label: t.overview, icon: Home },
    { id: 'users', label: t.userManagement, icon: Users },
    { id: 'courses', label: t.courseManagement, icon: BookOpen },
    { id: 'reports', label: t.reports, icon: BarChart3 },
  ];

  return (
    <div className="fixed inset-0 bg-background flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-72 bg-card border-r border-border flex flex-col"
          >
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="tracking-wider font-extrabold">UPGRADIA</h2>
                  <p className="text-xs text-accent mt-0.5">{t.dashboard}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-accent/30">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-accent/10 text-accent">
                    <Shield className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">Admin</p>
                  <p className="text-sm text-muted-foreground">System Administrator</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentPage(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                        currentPage === item.id
                          ? 'bg-accent/10 text-foreground font-medium border-l-2 border-accent'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-accent' : ''}`} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-border">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>{t.logout}</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 web-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === 'overview' && <AdminOverview language={language} />}
              {currentPage === 'users' && <UserManagement language={language} />}
              {currentPage === 'courses' && <CourseManagement language={language} />}
              {currentPage === 'reports' && <AIReports language={language} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function AdminOverview({ language }: { language: 'en' | 'ar' }) {
  const t = {
    en: {
      title: 'Overview',
      totalStudents: 'Total Students',
      totalInstructors: 'Total Instructors',
      activeCourses: 'Active Courses',
      avgEngagement: 'Avg Engagement',
      pendingApprovals: 'Pending Approvals',
    },
    ar: {
      title: 'نظرة عامة',
      totalStudents: 'إجمالي الطلاب',
      totalInstructors: 'إجمالي المدرسين',
      activeCourses: 'المقررات النشطة',
      avgEngagement: 'متوسط التفاعل',
      pendingApprovals: 'الموافقات المعلقة',
    },
  }[language];

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: t.totalStudents, value: '1,245', icon: Users, color: 'primary' },
          { label: t.totalInstructors, value: '48', icon: Users, color: 'secondary' },
          { label: t.activeCourses, value: '32', icon: BookOpen, color: 'accent' },
          { label: t.avgEngagement, value: '82%', icon: BarChart3, color: 'primary' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center ${
                    stat.color === 'primary'
                      ? 'bg-primary/20 text-primary'
                      : stat.color === 'secondary'
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-accent/20 text-accent'
                  }`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge className="bg-primary/20 text-primary border-primary">3</Badge>
            {t.pendingApprovals}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You have pending user registrations that require approval
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function UserManagement({ language }: { language: 'en' | 'ar' }) {
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      role: 'student',
      nationalId: '12345678901234',
      submittedAt: '2025-10-20',
    },
    {
      id: 2,
      name: 'Sara Mohamed',
      email: 'sara@example.com',
      role: 'professor',
      nationalId: '98765432109876',
      submittedAt: '2025-10-21',
    },
  ]);

  const t = {
    en: {
      title: 'User Management',
      pendingRegistrations: 'Pending Registrations',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      approve: 'Approve',
      reject: 'Reject',
      student: 'Student',
      professor: 'Professor',
    },
    ar: {
      title: 'إدارة المستخدمين',
      pendingRegistrations: 'التسجيلات المعلقة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      role: 'الدور',
      approve: 'موافقة',
      reject: 'رفض',
      student: 'طالب',
      professor: 'أستاذ',
    },
  }[language];

  const handleApprove = (userId: number) => {
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    toast.success('User approved successfully!');
  };

  const handleReject = (userId: number) => {
    setPendingUsers(prev => prev.filter(u => u.id !== userId));
    toast.error('User registration rejected');
  };

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.pendingRegistrations}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No pending registrations
            </p>
          ) : (
            pendingUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4>{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge className="mt-1 bg-accent/20 text-accent border-accent">
                      {user.role === 'student' ? t.student : t.professor}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(user.id)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    {t.approve}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(user.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <XIcon className="w-4 h-4 mr-1" />
                    {t.reject}
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CourseManagement({ language }: { language: 'en' | 'ar' }) {
  const t = {
    en: {
      title: 'Course Management',
      description: 'Add, edit, or archive courses',
    },
    ar: {
      title: 'إدارة المقررات',
      description: 'إضافة أو تعديل أو أرشفة المقررات',
    },
  }[language];

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>
      <p className="text-muted-foreground">{t.description}</p>
      
      <Card>
        <CardContent className="p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Course management interface</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AIReports({ language }: { language: 'en' | 'ar' }) {
  const t = {
    en: {
      title: 'AI-Generated Reports',
      description: 'Insights and analytics powered by AI',
      weeklyEngagement: 'Weekly Engagement Trend',
      topPerformers: 'Top Performing Students',
      recommendations: 'AI Recommendations',
    },
    ar: {
      title: 'التقارير المولدة بالذكاء الاصطناعي',
      description: 'رؤى وتحليلات مدعومة بالذكاء الاصطناعي',
      weeklyEngagement: 'اتجاه التفاعل الأسبوعي',
      topPerformers: 'أفضل الطلاب أداءً',
      recommendations: 'توصيات الذكاء الاصطناعي',
    },
  }[language];

  return (
    <div className="space-y-6">
      <h1>{t.title}</h1>
      <p className="text-muted-foreground">{t.description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.weeklyEngagement}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              <BarChart3 className="w-16 h-16 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.recommendations}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-accent/10 border-l-4 border-accent rounded">
              <p className="text-sm">🎯 15% of students show low engagement - consider motivational initiatives</p>
            </div>
            <div className="p-3 bg-secondary/10 border-l-4 border-secondary rounded">
              <p className="text-sm">📚 "Database Systems" has highest dropout rate - review course difficulty</p>
            </div>
            <div className="p-3 bg-primary/10 border-l-4 border-primary rounded">
              <p className="text-sm">⚡ XP distribution is healthy across all student levels</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
