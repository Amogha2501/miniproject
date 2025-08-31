import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, Clock, Calendar, Play, BookOpen, Star, Bot, Send, Plus, 
  CheckCircle, Lightbulb 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: string;
  subject: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  enrolled: number;
  maxEnrollment: number;
  startDate: string;
  topics: string[];
  isEnrolled: boolean;
  progress?: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  aiSuggestions?: string[];
  notes?: string;
}

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const Workshops = () => {
  const { toast } = useToast();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI study companion. I\'ll help track your learning progress and provide suggestions whenever you need them. What would you like to learn today?',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Linear Algebra Assignment',
      description: 'Solve problems 1-15 from Chapter 3: Matrix Operations',
      status: 'in-progress',
      subject: 'Mathematics',
      difficulty: 'medium',
      estimatedTime: '2 hours',
      aiSuggestions: [
        'Break down matrix multiplication into smaller steps',
        'Use the Khan Academy linear algebra course for reference',
        'Practice with simpler 2x2 matrices first'
      ],
      notes: 'Struggling with 3x3 matrix determinants'
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      description: 'Write lab report on pendulum motion experiment',
      status: 'pending',
      subject: 'Physics',
      difficulty: 'medium',
      estimatedTime: '3 hours',
      aiSuggestions: [
        'Include graphs showing period vs length relationship',
        'Discuss sources of experimental error',
        'Reference Newton\'s laws in your analysis'
      ]
    },
    {
      id: '3',
      title: 'Learn React Hooks',
      description: 'Understand useState, useEffect, and custom hooks',
      status: 'completed',
      subject: 'Computer Science',
      difficulty: 'hard',
      estimatedTime: '4 hours',
      notes: 'Completed! Custom hooks are very powerful for reusable logic.'
    }
  ]);

  const workshops: Workshop[] = [
    {
      id: '1',
      title: 'Advanced Calculus Masterclass',
      description: 'Deep dive into differential and integral calculus with real-world applications. Perfect for exam preparation.',
      instructor: 'Dr. Sarah Chen',
      subject: 'Mathematics',
      duration: '6 weeks',
      difficulty: 'Advanced',
      rating: 4.8,
      enrolled: 245,
      maxEnrollment: 300,
      startDate: '2024-02-01',
      topics: ['Limits', 'Derivatives', 'Integrals', 'Applications'],
      isEnrolled: true,
      progress: 65
    },
    {
      id: '2',
      title: 'Physics Problem Solving Techniques',
      description: 'Learn systematic approaches to solve complex physics problems across mechanics, thermodynamics, and more.',
      instructor: 'Prof. Michael Rodriguez',
      subject: 'Physics',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      rating: 4.6,
      enrolled: 189,
      maxEnrollment: 250,
      startDate: '2024-02-15',
      topics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
      isEnrolled: false
    },
    {
      id: '3',
      title: 'Organic Chemistry Fundamentals',
      description: 'Master the basics of organic chemistry with interactive sessions and practical examples.',
      instructor: 'Dr. Emily Watson',
      subject: 'Chemistry',
      duration: '8 weeks',
      difficulty: 'Beginner',
      rating: 4.9,
      enrolled: 156,
      maxEnrollment: 200,
      startDate: '2024-01-20',
      topics: ['Structure', 'Reactions', 'Mechanisms', 'Synthesis'],
      isEnrolled: true,
      progress: 30
    },
    {
      id: '4',
      title: 'Data Structures and Algorithms',
      description: 'Essential programming concepts for computer science students and coding interviews.',
      instructor: 'Alex Thompson',
      subject: 'Computer Science',
      duration: '10 weeks',
      difficulty: 'Intermediate',
      rating: 4.7,
      enrolled: 320,
      maxEnrollment: 400,
      startDate: '2024-02-10',
      topics: ['Arrays', 'Trees', 'Graphs', 'Sorting', 'Dynamic Programming'],
      isEnrolled: false
    }
  ];

  const enrolledWorkshops = workshops.filter(w => w.isEnrolled);
  const availableWorkshops = workshops.filter(w => !w.isEnrolled);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'Advanced': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTaskDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'medium': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'hard': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'in-progress': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'pending',
      subject: 'General',
      difficulty: 'medium',
      estimatedTime: '1 hour',
      aiSuggestions: [
        'Break this task into smaller, manageable steps',
        'Set a timer to maintain focus',
        'Take notes as you progress'
      ]
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setActiveTask(newTask);
    
    toast({
      title: "Task Created",
      description: "Your new learning task has been added and AI suggestions are ready!",
    });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    if (newStatus === 'completed') {
      toast({
        title: "Task Completed!",
        description: "Great job! Your progress has been tracked.",
      });
    }
  };

  const sendAIMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };
    
    setAiMessages([...aiMessages, userMessage]);
    setNewMessage("");
    
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(newMessage),
        timestamp: new Date()
      };
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Let me help you break this down into manageable steps.",
      "I understand you're working on this topic. Here's a strategy that often works well...",
      "Based on your learning pattern, I'd suggest focusing on the fundamental concepts first.",
      "This is a common challenge. Many students find it helpful to practice with examples.",
      "Let's approach this systematically. What specific part are you finding most difficult?",
      "I notice you're making good progress! Here's how to tackle the next section effectively."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="p-6 space-y-6 bg-background text-foreground transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            AI-Powered Learning Studio
          </h1>
          <p className="text-muted-foreground">
            Learn anything you want with AI tracking and personalized suggestions
          </p>
        </div>
        <Button variant="hero" className="gap-2">
          <Bot className="w-4 h-4" />
          AI Assistant
        </Button>
      </div>

      {/* AI Learning Dashboard */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Task Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create New Task */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Create Learning Task
                </CardTitle>
                <CardDescription>
                  Tell the AI what you want to learn and it will track your progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="What do you want to learn? (e.g., 'Learn Python basics')"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
                <Textarea
                  placeholder="Add more details about your learning goal..."
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  rows={2}
                  className="bg-background border-border text-foreground"
                />
                <Button
                onClick={addNewTask}
                variant="outline"
                size="sm"
                className="w-full mt-2 bg-card text-foreground border border-border hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                >
               <Plus className="w-4 h-4" />
                  Start Learning
               </Button>

              </CardContent>
            </Card>
          </motion.div>

          {/* Active Tasks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <Card className="bg-card border border-border shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle>Your Learning Tasks</CardTitle>
                <CardDescription>
                  AI-tracked learning activities with personalized suggestions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all ${
                          activeTask?.id === task.id
                            ? 'ring-2 ring-primary'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setActiveTask(task)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{task.title}</h4>
                                <Badge className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                                <Badge className={getTaskDifficultyColor(task.difficulty)}>
                                  {task.difficulty}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-3 h-3" />
                                  {task.subject}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {task.estimatedTime}
                                </span>
                                {task.aiSuggestions && (
                                  <span className="flex items-center gap-1 text-primary">
                                    <Lightbulb className="w-3 h-3" />
                                    {task.aiSuggestions.length} AI tips
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {task.status !== 'completed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateTaskStatus(
                                      task.id,
                                      task.status === 'pending' ? 'in-progress' : 'completed'
                                    );
                                  }}
                                >
                                  {task.status === 'pending' ? 'Start' : 'Complete'}
                                </Button>
                              )}
                              {task.status === 'completed' && (
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Assistant Panel */}
        <div className="space-y-6">
          {/* AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="h-[500px] flex flex-col bg-card border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  AI Study Assistant
                </CardTitle>
                <CardDescription>
                  Ask questions and get personalized suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="space-y-4"
                  >
                    {aiMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div
                          className={`flex ${
                            message.type === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask AI for help..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendAIMessage()}
                      className="bg-background border-border text-foreground"
                    />
                    <Button size="icon" onClick={sendAIMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Task Suggestions */}
          {activeTask && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-card border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    AI Suggestions
                  </CardTitle>
                  <CardDescription>For: {activeTask.title}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {activeTask.aiSuggestions?.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg border border-primary/10 bg-primary/5"
                    >
                      <p className="text-sm">{suggestion}</p>
                    </motion.div>
                  ))}
                  {activeTask.notes && (
                    <div className="mt-4 p-3 rounded-lg bg-muted">
                      <h5 className="font-medium text-sm mb-1">Your Notes:</h5>
                      <p className="text-sm text-muted-foreground">{activeTask.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
      {/* Enrolled Workshops */}
      {enrolledWorkshops.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">My Active Workshops</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledWorkshops.map((workshop, index) => (
              <motion.div
                key={workshop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="bg-card border border-border shadow-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{workshop.title}</CardTitle>
                        <CardDescription>{workshop.instructor}</CardDescription>
                      </div>
                      <Badge className={getDifficultyColor(workshop.difficulty)}>
                        {workshop.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{workshop.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{workshop.progress}%</span>
                      </div>
                      <Progress value={workshop.progress} className="h-2" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {workshop.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {workshop.enrolled} enrolled
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        {workshop.rating}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {workshop.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {workshop.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{workshop.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline"
                    size="sm"
                    className="w-full mt-2 bg-card text-foreground border border-border hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300">
                      <Play className="w-4 h-4" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Available Workshops */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold">Available Workshops</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableWorkshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="hover:shadow-lg transition-shadow bg-card border border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs mb-2">
                        {workshop.subject}
                      </Badge>
                      <CardTitle className="text-lg leading-tight">{workshop.title}</CardTitle>
                      <CardDescription>{workshop.instructor}</CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(workshop.difficulty)}>
                      {workshop.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{workshop.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(workshop.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {workshop.enrolled}/{workshop.maxEnrollment}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="w-4 h-4 fill-current" />
                      {workshop.rating}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {workshop.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {workshop.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{workshop.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Progress value={(workshop.enrolled / workshop.maxEnrollment) * 100} className="h-1" />
                    <p className="text-xs text-muted-foreground">
                      {workshop.maxEnrollment - workshop.enrolled} spots remaining
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2 bg-card text-foreground border border-border hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                    disabled={workshop.enrolled >= workshop.maxEnrollment}
                  >
                    {workshop.enrolled >= workshop.maxEnrollment ? 'Full' : 'Enroll Now'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Browse by Subject */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Browse by Subject</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Mathematics',
            'Physics',
            'Chemistry',
            'Computer Science',
            'Biology',
            'Literature',
            'History',
            'Psychology',
          ].map((subject, index) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card className="cursor-pointer hover:shadow-md transition-shadow bg-card border border-border">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium">{subject}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.floor(Math.random() * 20) + 5} workshops
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
