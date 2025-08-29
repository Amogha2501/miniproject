import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Users, MessageCircle, BarChart3 } from "lucide-react";
import studysparkLogo from "@/assets/studyspark-logo.png";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "ai-chat", label: "AI Tutor", icon: Brain },
    { id: "notes", label: "Notes", icon: MessageCircle },
    { id: "workshops", label: "Workshops", icon: Users },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background border-b border-border shadow-sm transition-colors">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3">
        <img src={studysparkLogo} alt="StudySpark AI" className="w-8 h-8" />
        <h1 className="text-xl font-bold text-foreground">
          StudySpark AI
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTabChange(item.id)}
              className={`gap-2 transition-all duration-200 ${
                activeTab === item.id
                  ? "shadow-md"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </div>

      {/* Profile Button */}
      <Button
        variant={activeTab === "profile" ? "default" : "outline"}
        size="sm"
        className="transition-all duration-200"
        onClick={() => onTabChange("profile")}
      >
        Profile
      </Button>
    </nav>
  );
};
