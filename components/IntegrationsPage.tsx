"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Search, Filter } from 'lucide-react';

const IntegrationsPage = () => {
    const initialIntegrations = [
        { id: 1, name: 'Mailchimp', category: 'Marketing', description: 'Email marketing automation', logo: '/logos/mailchimp.svg', enabled: false },
        { id: 2, name: 'QuickBooks', category: 'Finance', description: 'Accounting and bookkeeping', logo: '/logos/quickbooks.svg', enabled: true },
        { id: 3, name: 'Salesforce', category: 'Operations', description: 'Customer relationship management', logo: '/logos/salesforce.svg', enabled: false },
        { id: 4, name: 'Slack', category: 'Communication', description: 'Team collaboration and messaging', logo: '/logos/slack.svg', enabled: true },
        { id: 5, name: 'Zoom', category: 'Communication', description: 'Video conferencing and webinars', logo: '/logos/zoom.svg', enabled: false },
        { id: 6, name: 'Shopify', category: 'E-commerce', description: 'Online store and e-commerce platform', logo: '/logos/shopify.svg', enabled: false },
        { id: 7, name: 'Google Analytics', category: 'Analytics', description: 'Web and app analytics', logo: '/logos/google-analytics.svg', enabled: true },
        { id: 8, name: 'Stripe', category: 'Finance', description: 'Online payment processing', logo: '/logos/stripe.svg', enabled: false },
        { id: 9, name: 'Trello', category: 'Operations', description: 'Project management and collaboration', logo: '/logos/trello.svg', enabled: false },
        { id: 10, name: 'Hootsuite', category: 'Marketing', description: 'Social media management', logo: '/logos/hootsuite.svg', enabled: true },
        { id: 11, name: 'Zendesk', category: 'Customer Support', description: 'Customer service and engagement', logo: '/logos/zendesk.svg', enabled: false },
        { id: 12, name: 'Asana', category: 'Operations', description: 'Team task and project management', logo: '/logos/asana.svg', enabled: false },
    ];

    const [integrations, setIntegrations] = useState(initialIntegrations);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredIntegrations = integrations.filter(integration => 
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeFilter === 'All' || integration.category === activeFilter)
    );

    const categories = ['All', ...new Set(integrations.map(i => i.category))];
  
    const handleToggle = (id) => {
      setIntegrations(integrations.map(integration =>
        integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
      ));
    };
  
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Integrations</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search integrations..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-md px-2 py-1"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map(integration => (
            <Card key={integration.id}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">{integration.name}</CardTitle>
                  <Badge variant={integration.enabled ? "default" : "secondary"}>
                    {integration.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{integration.category}</p>
                <p className="text-gray-600 mb-4">{integration.description}</p>
                <div className="flex justify-between items-center">
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => handleToggle(integration.id)}
                  />
                  <Button variant="outline">Configure</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default IntegrationsPage;