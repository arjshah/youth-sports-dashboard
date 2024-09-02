'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

const mockTasks = [
  { id: 1, text: "Review and approve new coach applications", action: "Go to Applications", link: "/applications", date: "2024-09-02", aiCompleted: false },
  { id: 2, text: "Equipment order for upcoming soccer season processed", action: "View Order", link: "/orders", date: "2024-09-01", aiCompleted: true },
  { id: 3, text: "Schedule facility maintenance for next month", action: "Open Calendar", link: "/calendar", date: "2024-09-03", aiCompleted: false },
  { id: 4, text: "Q2 financial report ready for review", action: "View Report", link: "/reports", date: "2024-09-01", aiCompleted: true },
  { id: 5, text: "Follow up with sponsors for the summer tournament", action: "Contact Sponsors", link: "/sponsors", date: "2024-09-04", aiCompleted: false },
];

const DashboardCard = ({ title, value, trend, icon: Icon, trendDescription }: { title: string, value: string, trend: number, icon: React.ElementType, trendDescription: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs text-muted-foreground">
        <TrendingUp className={`mr-1 h-4 w-4 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
        <span className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>{Math.abs(trend)}%</span>
        <span className="ml-1">{trendDescription}</span>
      </div>
    </CardContent>
  </Card>
);

const TaskInbox = ({ tasks }: { tasks: any[] }) => (
  <Card className="col-span-2">
    <CardHeader>
      <CardTitle className="text-xl font-bold">Tasks</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {task.aiCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
              )}
              <div>
                <p className={`text-sm font-medium ${task.aiCompleted ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </p>
                <p className="text-xs text-gray-500">{task.date}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700">
              {task.action} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const YouthSportsDashboard: React.FC = () => {
  const userName = "Arjun"; // This would come from your auth system

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-right">
          <p className="text-lg font-semibold">Welcome, {userName}</p>
          <p className="text-sm text-gray-500">Riverside Youth Soccer League</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Members"
          value="325"
          trend={8.3}
          trendDescription="from last month"
          icon={Users}
        />
        <DashboardCard
          title="Monthly Revenue"
          value="$14,500"
          trend={16}
          trendDescription="vs. last month"
          icon={DollarSign}
        />
        <DashboardCard
          title="Member Retention"
          value="92%"
          trend={3}
          trendDescription="improvement"
          icon={Users}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TaskInbox tasks={mockTasks} />
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" /> Manage Teams
            </Button>
            <Button className="w-full justify-start">
              <DollarSign className="mr-2 h-4 w-4" /> Process Payments
            </Button>
            <Button className="w-full justify-start">
              <CheckCircle className="mr-2 h-4 w-4" /> Schedule Practice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YouthSportsDashboard;