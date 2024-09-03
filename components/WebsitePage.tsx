'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, Globe, TrendingUp, TrendingDown, Users, Clock, ExternalLink, Save, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';

type Section = {
  id: string;
  title: string;
  content: string;
};

const WebsitePage = () => {
  const [isPublished, setIsPublished] = useState(true);
  const [lastPublished, setLastPublished] = useState("2024-08-15 14:30");
  const [visitorCount, setVisitorCount] = useState(1234);
  const [conversionRate, setConversionRate] = useState(3.2);
  const [sections, setSections] = useState<Section[]>([
    { id: '1', title: 'Hero', content: 'Welcome to Youth Sports Academy' },
    { id: '2', title: 'About Us', content: 'We are dedicated to nurturing young athletes' },
    { id: '3', title: 'Our Programs', content: 'Soccer, Basketball, Tennis, and more' },
    { id: '4', title: 'Testimonials', content: 'See what our happy athletes and parents say' },
    { id: '5', title: 'Contact', content: 'Get in touch with us' },
  ]);

  const handleSectionChange = (id: string, field: 'title' | 'content', value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handlePublish = () => {
    setIsPublished(true);
    setLastPublished(new Date().toLocaleString());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Website Editor</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit your website content, preview changes, and publish updates here.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorCount}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline mr-1 h-3 w-3 text-red-500" />
              -0.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Published</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lastPublished}</div>
            <p className="text-xs text-muted-foreground">
              {isPublished ? 'Website is live' : 'Unpublished changes'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Button className="mr-2" onClick={handlePublish}>
            <Save className="mr-2 h-4 w-4" /> Publish Changes
          </Button>
          <Button variant="outline" asChild>
            <Link href="/preview" target="_blank">
              <Eye className="mr-2 h-4 w-4" /> Preview
            </Link>
          </Button>
        </div>
        {isPublished && (
          <Button variant="link" asChild>
            <Link href="/live-site" target="_blank">
              View Live Site <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Website Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {sections.map(section => (
                <TabsTrigger key={section.id} value={section.id}>{section.title}</TabsTrigger>
              ))}
            </TabsList>
            {sections.map(section => (
              <TabsContent key={section.id} value={section.id}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${section.id}`}>Section Title</Label>
                    <Input
                      id={`title-${section.id}`}
                      value={section.title}
                      onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`content-${section.id}`}>Content</Label>
                    <Textarea
                      id={`content-${section.id}`}
                      value={section.content}
                      onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                      rows={10}
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Advanced Settings</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Advanced Website Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="site-name" className="text-right">
                Site Name
              </Label>
              <Input
                id="site-name"
                defaultValue="Youth Sports Academy"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domain" className="text-right">
                Domain
              </Label>
              <Input
                id="domain"
                defaultValue="youthsportsacademy.com"
                className="col-span-3"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WebsitePage;