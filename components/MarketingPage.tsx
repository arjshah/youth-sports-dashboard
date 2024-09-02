"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, TrendingUp, TrendingDown, Users, Mail, Globe, Eye, Pencil } from 'lucide-react';

const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState('website');

  const marketingMetrics = [
    { title: 'Total Leads', value: '1,234', trend: '+5.2%', icon: Users },
    { title: 'Conversion Rate', value: '3.6%', trend: '+0.8%', icon: TrendingUp },
    { title: 'Email Open Rate', value: '22.4%', trend: '-1.1%', icon: Mail },
  ];

  const leads = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New', source: 'Website' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted', source: 'Referral' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Qualified', source: 'Social Media' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Marketing</h1>
      
      <div className="grid gap-4 md:grid-cols-3">
        {marketingMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trend.startsWith('+') ? <TrendingUp className="inline mr-1 h-3 w-3" /> : <TrendingDown className="inline mr-1 h-3 w-3" />}
                {metric.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="website">Website Builder</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
        </TabsList>
        <TabsContent value="website" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button><Globe className="mr-2 h-4 w-4" /> Edit Website</Button>
                  <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Site Title</label>
                    <Input placeholder="Enter your site title" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Domain</label>
                    <Input placeholder="yourdomain.com" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Button><Mail className="mr-2 h-4 w-4" /> Create Campaign</Button>
                  <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Manage Lists</Button>
                </div>
                <div>
                  <label className="text-sm font-medium">Quick Send</label>
                  <div className="flex space-x-2 mt-2">
                    <Input placeholder="Enter email subject" className="flex-grow" />
                    <Button>Send</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPage;