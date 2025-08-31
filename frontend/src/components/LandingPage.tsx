import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, BookOpen, Target, TrendingUp, Sparkles, Loader2, Moon, Sun } from "lucide-react";
import studysparkLogo from "@/assets/studyspark-logo.png";
import { useTheme } from "@/theme";

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage = ({ onLogin }: LandingPageProps) => {
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    { icon: Brain, title: "AI-Powered Learning", description: "Get personalized study plans and instant answers from our advanced AI tutor" },
    { icon: Target, title: "Goal Tracking", description: "Set learning objectives and track your progress with detailed analytics" },
    { icon: BookOpen, title: "Smart Notes", description: "AI-generated summaries and personal note-taking in one unified system" },
    { icon: TrendingUp, title: "Progress Analytics", description: "Visualize your learning journey with comprehensive progress tracking" },
  ];
  const [loading, setLoading] = useState(false);
  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-hero dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 ">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <img src={studysparkLogo} alt="StudySpark AI" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-white dark:text-gray-100">StudySpark AI</h1>
        </div>
        <Button
          variant="ghost"
          className="text-white dark:text-gray-200 hover:bg-white/10 border border-white dark:border-gray-400 rounded-lg"
          onClick={toggle}
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </header>

      {/* Content */}
      <div className="w-full px-6 py-12 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="text-white dark:text-gray-100 space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold leading-tight">
                Your AI Study
                <span className="block bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                  Companion
                </span>
              </h2>
              <p className="text-xl text-white/90 dark:text-gray-300 leading-relaxed">
                Transform your learning experience with personalized AI tutoring, smart goal tracking, 
                and intelligent progress analytics. Start your journey to academic excellence today.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="gap-2 shadow-lg hover:shadow-glow">
                <Sparkles className="w-5 h-5" />
                Start Learning Free
              </Button>
              <Button
                variant="hero" size="lg" className="gap-2 shadow-lg hover:shadow-glow"
              >
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              {[
                { value: "10K+", label: "Active Learners" },
                { value: "95%", label: "Success Rate" },
                { value: "24/7", label: "AI Support" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white dark:text-purple-300">{stat.value}</div>
                  <div className="text-white/70 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth Card */}
          <Card className="w-full max-w-md mx-auto shadow-lg dark:shadow-glow bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
                {isLogin ? "Welcome Back!" : "Join StudySpark AI"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                {isLogin
                  ? "Sign in to continue your learning journey"
                  : "Start your personalized learning experience"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-800 dark:text-gray-200">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" className="dark:bg-gray-800 dark:text-white border-gray-700" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 dark:text-gray-200">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="dark:bg-gray-800 dark:text-white border-gray-700 mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800 dark:text-gray-200">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" className="dark:bg-gray-800 dark:text-white border-gray-700" />
              </div>
              <div className="flex justify-center "> 
               <Button
               className="mt-4 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 border border-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-400 hover:text-white transition-all duration-300 px-6"
               variant="default"
               onClick={handleAuth}
               >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : isLogin ? "Sign In" : "Create Account"}
              </Button>
                </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  className="text-primary hover:underline font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white dark:text-gray-100 mb-4">
            Why Choose StudySpark AI?
          </h3>
          <p className="text-white/80 dark:text-gray-300 mb-12 text-lg">
            Discover the features that make learning more effective and engaging
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="bg-white/10 border-white/20 text-white dark:bg-gray-900 dark:border-gray-700 rounded-xl hover:shadow-glow transition">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center mx-auto shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg">{title}</h4>
                  <p className="text-white/80 text-sm dark:text-gray-300">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
