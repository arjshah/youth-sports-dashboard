'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Users, Mail, TrendingUp, TrendingDown, PlusCircle, Edit, Trash2, Send, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type Lead = {
  id: string;
  name: string;
  email: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  lastContact: string;
  interests: string[];
  campaigns: string[];
};

type Campaign = {
  id: string;
  name: string;
  date: string;
  recipients: number;
  openRate: number;
  clickRate: number;
};

const MarketingPage = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', source: 'Website', status: 'New', lastContact: '2024-08-15', interests: ['Soccer', 'Basketball'], campaigns: ['Summer Camp 2024', 'Fall League 2024'] },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', source: 'Referral', status: 'Contacted', lastContact: '2024-08-10', interests: ['Tennis'], campaigns: ['Summer Camp 2024'] },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', source: 'Social Media', status: 'Qualified', lastContact: '2024-08-05', interests: ['Soccer'], campaigns: ['Fall League 2024'] },
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Summer Camp 2024', date: '2024-05-01', recipients: 500, openRate: 35, clickRate: 12 },
    { id: '2', name: 'Fall League 2024', date: '2024-08-15', recipients: 750, openRate: 42, clickRate: 18 },
  ]);

  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'qualified' | 'lost'>('all');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [isNewLeadDialogOpen, setIsNewLeadDialogOpen] = useState(false);
  const [isEditLeadDialogOpen, setIsEditLeadDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);

  const [newLead, setNewLead] = useState<Partial<Lead>>({
    name: '',
    email: '',
    source: '',
    status: 'New',
    interests: [],
  });

  const [newCampaign, setNewCampaign] = useState({
    subject: '',
    content: '',
  });

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    return lead.status.toLowerCase() === filter;
  });

  const totalLeads = leads.length;
  const newLeadsThisMonth = leads.filter(lead => new Date(lead.lastContact) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length;
  const averageOpenRate = campaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / campaigns.length;

  const handleCreateLead = () => {
    if (newLead.name && newLead.email) {
      const id = Date.now().toString();
      setLeads([...leads, { ...newLead, id, lastContact: new Date().toISOString().split('T')[0], campaigns: [] } as Lead]);
      setIsNewLeadDialogOpen(false);
      setNewLead({
        name: '',
        email: '',
        source: '',
        status: 'New',
        interests: [],
      });
    }
  };

  const handleEditLead = () => {
    if (currentLead) {
      setLeads(leads.map(lead => lead.id === currentLead.id ? currentLead : lead));
      setIsEditLeadDialogOpen(false);
      setCurrentLead(null);
    }
  };

  const handleDeleteLead = () => {
    if (currentLead) {
      setLeads(leads.filter(lead => lead.id !== currentLead.id));
      setIsDeleteConfirmationOpen(false);
      setCurrentLead(null);
    }
  };

  const handleCreateCampaign = () => {
    if (newCampaign.subject && newCampaign.content && selectedLeads.length > 0) {
      const campaignName = newCampaign.subject;
      const campaignId = Date.now().toString();
      const newCampaignEntry: Campaign = {
        id: campaignId,
        name: campaignName,
        date: new Date().toISOString().split('T')[0],
        recipients: selectedLeads.length,
        openRate: 0,
        clickRate: 0,
      };
      setCampaigns([...campaigns, newCampaignEntry]);
      
      // Update leads with the new campaign
      setLeads(leads.map(lead => 
        selectedLeads.includes(lead.id) 
          ? { ...lead, campaigns: [...lead.campaigns, campaignName] }
          : lead
      ));

      setIsNewCampaignDialogOpen(false);
      setNewCampaign({ subject: '', content: '' });
      setSelectedLeads([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Email Marketing</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Manage your leads and email campaigns here. Create, edit, and track all your marketing efforts.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
              {newLeadsThisMonth} new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Open Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageOpenRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {averageOpenRate > 30 ? (
                <TrendingUp className="inline mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="inline mr-1 h-3 w-3 text-red-500" />
              )}
              {averageOpenRate > 30 ? 'Above' : 'Below'} industry average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Campaigns</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              Last campaign sent on {campaigns[campaigns.length - 1]?.date}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter leads" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="new">New Leads</SelectItem>
            <SelectItem value="contacted">Contacted Leads</SelectItem>
            <SelectItem value="qualified">Qualified Leads</SelectItem>
            <SelectItem value="lost">Lost Leads</SelectItem>
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <Dialog open={isNewLeadDialogOpen} onOpenChange={setIsNewLeadDialogOpen}>
            <DialogTrigger asChild>
              <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Lead</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" type="email" value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="source" className="text-right">Source</Label>
                  <Input id="source" value={newLead.source} onChange={(e) => setNewLead({...newLead, source: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">Status</Label>
                  <Select value={newLead.status} onValueChange={(value: any) => setNewLead({...newLead, status: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateLead}>Add Lead</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
            <DialogTrigger asChild>
              <Button><Send className="mr-2 h-4 w-4" /> Create Campaign</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">Subject</Label>
                  <Input id="subject" value={newCampaign.subject} onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">Content</Label>
                  <Textarea id="content" value={newCampaign.content} onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})} className="col-span-3" rows={10} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Recipients</Label>
                  <div className="col-span-3">
                    <p className="text-sm text-muted-foreground mb-2">{selectedLeads.length} leads selected</p>
                    <Button variant="outline" size="sm" onClick={() => setSelectedLeads(leads.map(lead => lead.id))}>Select All</Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateCampaign}>Send Campaign</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedLeads.length === filteredLeads.length}
                    onCheckedChange={(checked) => {
                      setSelectedLeads(checked ? filteredLeads.map(lead => lead.id) : [])
                    }}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Interests</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onCheckedChange={(checked) => {
                        setSelectedLeads(
                          checked
                            ? [...selectedLeads, lead.id]
                            : selectedLeads.filter(id => id !== lead.id)
                        )
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Badge variant={
                      lead.status === 'New' ? 'default' :
                      lead.status === 'Contacted' ? 'secondary' :
                      lead.status === 'Qualified' ? 'success' : 'destructive'
                    }>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{lead.lastContact}</TableCell>
                  <TableCell>{lead.interests.join(", ")}</TableCell>
                  <TableCell>{lead.campaigns.join(", ")}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => {
                      setCurrentLead(lead);
                      setIsEditLeadDialogOpen(true);
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => {
                      setCurrentLead(lead);
                      setIsDeleteConfirmationOpen(true);
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditLeadDialogOpen} onOpenChange={setIsEditLeadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          {currentLead && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input id="edit-name" value={currentLead.name} onChange={(e) => setCurrentLead({...currentLead, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">Email</Label>
                <Input id="edit-email" type="email" value={currentLead.email} onChange={(e) => setCurrentLead({...currentLead, email: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-source" className="text-right">Source</Label>
                <Input id="edit-source" value={currentLead.source} onChange={(e) => setCurrentLead({...currentLead, source: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select value={currentLead.status} onValueChange={(value: any) => setCurrentLead({...currentLead, status: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Qualified">Qualified</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-interests" className="text-right">Interests</Label>
                <Input id="edit-interests" value={currentLead.interests.join(", ")} onChange={(e) => setCurrentLead({...currentLead, interests: e.target.value.split(", ")})} className="col-span-3" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditLead}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the lead "{currentLead?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmationOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteLead}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketingPage;