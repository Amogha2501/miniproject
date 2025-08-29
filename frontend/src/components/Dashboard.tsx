import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Target, TrendingUp, Clock, Award, Brain } from "lucide-react";
import { CreateGoalDialog } from "./CreateGoalDialog";

export const Dashboard = () => {
  const [showCreateGoal, setShowCreateGoal] = useState(false);

  const recentCourses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      subject: "Mathematics",
      progress: 75,
      goalType: "exam prep",
      dueDate: "2024-02-15",
      totalLessons: 12,
      completedLessons: 9
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      subject: "Physics",
      progress: 45,
      goalType: "new learning",
      dueDate: "2024-03-01",
      totalLessons: 16,
      completedLessons: 7
    },
    {
      id: 3,
      title: "Chemistry Review",
      subject: "Chemistry",
      progress: 90,
      goalType: "revision",
      dueDate: "2024-01-30",
      totalLessons: 8,
      completedLessons: 7
    }
  ];

  const todayTasks = [
    { task: "Complete Calculus Chapter 5", subject: "Mathematics", urgent: true },
    { task: "Review Newton's Laws", subject: "Physics", urgent: false },
    { task: "Practice Chemical Equations", subject: "Chemistry", urgent: false },
    { task: "AI Generated Quiz - Algebra", subject: "Mathematics", urgent: true }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-6 space-y-6 transition-colors">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
          <p className="text-muted-foreground">Ready to continue your learning journey?</p>
        </div>
        <Button variant="hero" onClick={() => setShowCreateGoal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Goal
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Active Courses</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Target className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">Goals Achieved</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm text-muted-foreground">Avg Progress</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold">24h</div>
              <div className="text-sm text-muted-foreground">Study Streak</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Your Active Courses
              </CardTitle>
              <CardDescription>
                Continue where you left off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.subject}</p>
                    </div>
                    <Badge variant="secondary">
                      {course.goalType}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    <span>Due: {course.dueDate}</span>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Continue Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Today's Tasks
              </CardTitle>
              <CardDescription>
                Stay on track with your goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {task.subject}
                      </Badge>
                      {task.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                Ask AI Tutor
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Take Practice Test
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Progress
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateGoalDialog 
        open={showCreateGoal} 
        onOpenChange={setShowCreateGoal}
      />
    </div>
  );
};

                  

