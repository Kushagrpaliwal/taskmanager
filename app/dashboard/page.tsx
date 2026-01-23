"use client";

import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Plus,
  Layout,
} from "lucide-react";

const stats = [
  {
    name: "Total Tasks",
    value: "2,847",
    change: "+12.5%",
    changeType: "positive",
    icon: ListTodo,
  },
  {
    name: "Completed",
    value: "1,423",
    change: "+8.2%",
    changeType: "positive",
    icon: CheckCircle2,
  },
  {
    name: "In Progress",
    value: "856",
    change: "+3.1%",
    changeType: "positive",
    icon: Clock,
  },
  {
    name: "Productivity",
    value: "94.2%",
    change: "-2.4%",
    changeType: "negative",
    icon: TrendingUp,
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
  },
  {
    id: 2,
    user: "Michael Ross",
    avatar: "https://i.pravatar.cc/150?img=3",
    action: "commented on",
    target: "API Integration",
    time: "15 min ago",
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=5",
    action: "created task",
    target: "User Research Phase 2",
    time: "1 hour ago",
  },
];

const upcomingTasks = [
  { id: 1, title: "Review design mockups", dueDate: "Today", priority: "high", progress: 75 },
  { id: 2, title: "Sprint planning meeting", dueDate: "Tomorrow", priority: "medium", progress: 0 },
  { id: 3, title: "User feedback analysis", dueDate: "Jan 21", priority: "low", progress: 30 },
];

const weeklyData = [40, 65, 45, 80, 55, 90, 75];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8 w-full pb-12">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded bg-secondary text-primary">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Overview of your team's activity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 rounded-sm text-xs font-normal">
              <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
              Last 7 days
            </Button>
            <Button size="sm" className="h-8 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium shadow-none">
              <Plus className="w-3.5 h-3.5 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="p-4 rounded-sm border border-border bg-card hover:bg-secondary/20 transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <stat.icon className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">{stat.name}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className={`text-xs ${stat.changeType === "positive" ? "text-emerald-600" : "text-rose-600"}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Simple Chart Visualization */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Task Completion</h3>
                <div className="flex bg-secondary/50 p-0.5 rounded-sm">
                  <span className="px-2 py-0.5 bg-background shadow-sm rounded-sm text-xs font-medium text-foreground">Weekly</span>
                  <span className="px-2 py-0.5 text-xs text-muted-foreground cursor-pointer hover:text-foreground">Monthly</span>
                </div>
              </div>
              <div className="h-[200px] flex items-end gap-2 border-b border-border pb-2">
                {weeklyData.map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div
                      className="w-full bg-secondary hover:bg-primary/80 transition-all rounded-t-sm"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground uppercase opacity-50 group-hover:opacity-100">
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <Avatar className="h-6 w-6 border border-border rounded-sm">
                      <AvatarImage src={activity.avatar} />
                      <AvatarFallback className="text-[10px]">{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{activity.user}</span> {activity.action} <span className="text-foreground border-b border-border">{activity.target}</span>
                      <span className="block text-xs opacity-50 mt-0.5">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-semibold text-foreground">Upcoming Tasks</h3>
              </div>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="p-3 border border-border rounded-sm bg-card hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
                      <span className="text-[10px] text-muted-foreground">{task.dueDate}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1 group-hover:underline decoration-1 underline-offset-4">{task.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}