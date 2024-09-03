"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileText, Bell, Search, Settings, LogOut, Home, Users, Megaphone, Calendar, DollarSign, BarChart2, ChevronLeft, Globe, ChevronRight, Plug } from 'lucide-react';
import { cn } from "@/lib/utils";
import Head from 'next/head';

const Sidebar = ({ isCollapsed, toggleSidebar }: { isCollapsed: boolean, toggleSidebar: () => void }) => (
  <div className={cn(
    "pb-12 bg-gray-100 h-screen transition-all duration-300 ease-in-out",
    isCollapsed ? "w-16" : "w-64"
  )}>
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center justify-between mb-2">
          {!isCollapsed && (
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              Gameface 
            </h2>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <div className="space-y-1">
          {[
            { href: "/", icon: Home, label: "Dashboard" },
            { href: "/plans", icon: FileText, label: "Plans" },
            { href: "/members", icon: Users, label: "Members" },
            { href: "/marketing", icon: Megaphone, label: "Marketing" },
            { href: "/website", icon: Globe, label: "Website" },
            { href: "/calendar", icon: Calendar, label: "Calendar" },
            { href: "/billing", icon: DollarSign, label: "Billing" },
            { href: "/reports", icon: BarChart2, label: "Reports" },
            { href: "/integrations", icon: Plug, label: "Integrations" },
            { href: "/settings", icon: Settings, label: "Settings" },
          ].map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}>
              <Button variant="ghost" className={cn(
                "w-full justify-start",
                isCollapsed && "justify-center px-2"
              )}>
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TopBar = () => {
  const businessName = "Riverside Youth Soccer League"; // This would come from your app's state or context

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-primary">{businessName}</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-64 bg-gray-50 focus:bg-white transition-colors duration-200"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Oliver Mia</p>
                      <p className="text-sm text-muted-foreground">
                        New player registration: Sarah Johnson
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/40/40" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen">
      <Head>
        <title>YouthSports Pro</title>
      </Head>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;