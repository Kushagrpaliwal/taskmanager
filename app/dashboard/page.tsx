"use client";

import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Users,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    name: "Total Tasks",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: ListTodo,
    color: "from-blue-500 to-blue-600",
    shadowColor: "shadow-blue-500/25",
  },
  {
    name: "Completed",
    value: "1,423",
    change: "+8.2%",
    changeType: "positive",
    icon: CheckCircle2,
    color: "from-emerald-500 to-emerald-600",
    shadowColor: "shadow-emerald-500/25",
  },
  {
    name: "In Progress",
    value: "856",
    change: "+3.1%",
    changeType: "positive",
    icon: Clock,
    color: "from-amber-500 to-amber-600",
    shadowColor: "shadow-amber-500/25",
  },
  {
    name: "Productivity",
    value: "94.2%",
    change: "-2.4%",
    changeType: "negative",
    icon: TrendingUp,
    color: "from-violet-500 to-violet-600",
    shadowColor: "shadow-violet-500/25",
  },
];

const recentActivity = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    action: "completed task",
    target: "Design System Update",
    time: "2 min ago",
    type: "complete",
  },
  {
    id: 2,
    user: "Michael Ross",
    avatar: "https://i.pravatar.cc/150?img=3",
    action: "commented on",
    target: "API Integration",
    time: "15 min ago",
    type: "comment",
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    action: "created task",
    target: "User Research Phase 2",
    time: "1 hour ago",
    type: "create",
  },
  {
    id: 4,
    user: "James Miller",
    avatar: "https://i.pravatar.cc/150?img=8",
    action: "moved task to In Progress",
    target: "Backend Optimization",
    time: "2 hours ago",
    type: "move",
  },
  {
    id: 5,
    user: "Lisa Park",
    avatar: "https://i.pravatar.cc/150?img=10",
    action: "assigned",
    target: "Mobile App Testing",
    time: "3 hours ago",
    type: "assign",
  },
];

const upcomingTasks = [
  { id: 1, title: "Review design mockups", dueDate: "Today", priority: "high", progress: 75 },
  { id: 2, title: "Sprint planning meeting", dueDate: "Tomorrow", priority: "medium", progress: 0 },
  { id: 3, title: "User feedback analysis", dueDate: "Jan 21", priority: "low", progress: 30 },
  { id: 4, title: "API documentation", dueDate: "Jan 22", priority: "medium", progress: 50 },
];

const weeklyData = [40, 65, 45, 80, 55, 90, 75];
const monthlyData = [30, 45, 55, 70, 50, 85, 65, 75, 60, 90, 80, 95];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening with your team.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl">
              <Calendar className="w-4 h-4 mr-2" />
              Last 7 days
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 shadow-lg shadow-primary/25">
              <Sparkles className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
                      <span
                        className={`flex items-center text-sm font-medium ${stat.changeType === "positive" ? "text-emerald-500" : "text-rose-500"
                          }`}
                      >
                        {stat.changeType === "positive" ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg ${stat.shadowColor}`}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
            </Card>
          ))}
        </div>

        {/* Charts & Activity */}
        <div className="grid gap-6 lg:grid-cols-7">
          {/* Chart Card */}
          <Card className="lg:col-span-4 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Task Completion</CardTitle>
                <CardDescription>Tasks completed over time</CardDescription>
              </div>
              <Tabs defaultValue="weekly" className="w-auto">
                <TabsList className="rounded-xl bg-accent">
                  <TabsTrigger value="weekly" className="rounded-lg text-xs">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" className="rounded-lg text-xs">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] flex items-end gap-2">
                {weeklyData.map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary/80 to-primary hover:from-primary hover:to-purple-500 transition-all duration-300 cursor-pointer"
                      style={{ height: `${value * 2.5}px` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="lg:col-span-3 border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your team</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 group">
                  <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium text-primary">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Tasks */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Tasks due soon</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{task.title}</p>
                      <Badge
                        variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Due: {task.dueDate}</p>
                  </div>
                  <div className="w-20">
                    <Progress value={task.progress} className="h-2" />
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">{task.progress}%</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>Top contributors this week</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Users className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah Chen", role: "Design Lead", tasks: 23, avatar: "https://i.pravatar.cc/150?img=1" },
                { name: "Michael Ross", role: "Frontend Dev", tasks: 19, avatar: "https://i.pravatar.cc/150?img=3" },
                { name: "Emma Wilson", role: "Product Manager", tasks: 17, avatar: "https://i.pravatar.cc/150?img=5" },
                { name: "James Miller", role: "Backend Dev", tasks: 15, avatar: "https://i.pravatar.cc/150?img=8" },
              ].map((member, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/30 transition-colors"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {i < 3 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                        {i + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{member.tasks}</p>
                    <p className="text-[10px] text-muted-foreground">tasks</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}