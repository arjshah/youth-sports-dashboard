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
import { FileText, DollarSign, Users, PlusCircle, Edit, Trash2, HelpCircle, ExternalLink } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from 'next/link';

type Plan = {
  id: string;
  name: string;
  price: number;
  recurring: 'weekly' | 'monthly' | 'yearly' | 'one-time';
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
  memberCount: number;
  checkoutLink: string;
};

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([
    { id: '1', name: 'Fall 2024 Under 12 Soccer', price: 150, recurring: 'monthly', startDate: '2024-09-01', endDate: '2024-12-31', status: 'active', memberCount: 20, checkoutLink: '/checkout/1' },
    { id: '2', name: 'Summer 2024 Basketball Camp', price: 200, recurring: 'one-time', startDate: '2024-07-01', endDate: '2024-07-31', status: 'active', memberCount: 15, checkoutLink: '/checkout/2' },
    { id: '3', name: 'Spring 2024 Tennis Lessons', price: 100, recurring: 'weekly', startDate: '2024-03-01', endDate: '2024-05-31', status: 'inactive', memberCount: 10, checkoutLink: '/checkout/3' },
  ]);

  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredPlans = plans.filter(plan => {
    if (filter === 'active') return plan.status === 'active';
    if (filter === 'inactive') return plan.status === 'inactive';
    return true;
  });

  const activePlans = plans.filter(plan => plan.status === 'active').length;
  const totalRevenue = plans.reduce((sum, plan) => sum + plan.price * plan.memberCount, 0);
  const totalMembers = plans.reduce((sum, plan) => sum + plan.memberCount, 0);

  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false);
  const [isEditPlanDialogOpen, setIsEditPlanDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);

  const [newPlan, setNewPlan] = useState<Partial<Plan>>({
    name: '',
    price: 0,
    recurring: 'monthly',
    startDate: '',
    endDate: '',
    status: 'active',
  });

  const handleCreatePlan = () => {
    if (newPlan.name && newPlan.price && newPlan.startDate && newPlan.endDate) {
      const id = Date.now().toString();
      const checkoutLink = `/checkout/${id}`;
      setPlans([...plans, { ...newPlan, id, memberCount: 0, checkoutLink } as Plan]);
      setIsNewPlanDialogOpen(false);
      setNewPlan({
        name: '',
        price: 0,
        recurring: 'monthly',
        startDate: '',
        endDate: '',
        status: 'active',
      });
    }
  };

  const handleEditPlan = () => {
    if (currentPlan) {
      setPlans(plans.map(plan => plan.id === currentPlan.id ? currentPlan : plan));
      setIsEditPlanDialogOpen(false);
      setCurrentPlan(null);
    }
  };

  const handleDeletePlan = () => {
    if (currentPlan) {
      setPlans(plans.filter(plan => plan.id !== currentPlan.id));
      setIsDeleteConfirmationOpen(false);
      setCurrentPlan(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Plans</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Plans allow you to set up subscriptions for your sports programs. Create, manage, and track all your offerings here.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activePlans}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="active">Active Plans</SelectItem>
            <SelectItem value="inactive">Inactive Plans</SelectItem>
          </SelectContent>
        </Select>
        <Dialog open={isNewPlanDialogOpen} onOpenChange={setIsNewPlanDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Plan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Plan</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={newPlan.name} onChange={(e) => setNewPlan({...newPlan, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Price</Label>
                <Input id="price" type="number" value={newPlan.price} onChange={(e) => setNewPlan({...newPlan, price: Number(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recurring" className="text-right">Recurring</Label>
                <Select value={newPlan.recurring} onValueChange={(value: any) => setNewPlan({...newPlan, recurring: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">Start Date</Label>
                <Input id="startDate" type="date" value={newPlan.startDate} onChange={(e) => setNewPlan({...newPlan, startDate: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">End Date</Label>
                <Input id="endDate" type="date" value={newPlan.endDate} onChange={(e) => setNewPlan({...newPlan, endDate: e.target.value})} className="col-span-3" />
              </div>
            </div>
            <Button onClick={handleCreatePlan}>Create Plan</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Recurring</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>${plan.price}</TableCell>
                  <TableCell>{plan.recurring}</TableCell>
                  <TableCell>{plan.startDate}</TableCell>
                  <TableCell>{plan.endDate}</TableCell>
                  <TableCell>
                    <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>{plan.status}</Badge>
                  </TableCell>
                  <TableCell>{plan.memberCount}</TableCell>
                  <TableCell>
  <Button variant="ghost" size="sm" className="mr-2" onClick={() => {
    setCurrentPlan(plan);
    setIsEditPlanDialogOpen(true);
  }}>
    <Edit className="h-4 w-4" />
  </Button>
  <Button variant="ghost" size="sm" className="mr-2" onClick={() => {
    setCurrentPlan(plan);
    setIsDeleteConfirmationOpen(true);
  }}>
    <Trash2 className="h-4 w-4" />
  </Button>
  <Button variant="ghost" size="sm" asChild>
  <Link href={plan.checkoutLink} target="_blank" rel="noopener noreferrer">
    <ExternalLink className="h-4 w-4" />
  </Link>
</Button>
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditPlanDialogOpen} onOpenChange={setIsEditPlanDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
          </DialogHeader>
          {currentPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input id="edit-name" value={currentPlan.name} onChange={(e) => setCurrentPlan({...currentPlan, name: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">Price</Label>
                <Input id="edit-price" type="number" value={currentPlan.price} onChange={(e) => setCurrentPlan({...currentPlan, price: Number(e.target.value)})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-recurring" className="text-right">Recurring</Label>
                <Select value={currentPlan.recurring} onValueChange={(value: any) => setCurrentPlan({...currentPlan, recurring: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="one-time">One-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-startDate" className="text-right">Start Date</Label>
                <Input id="edit-startDate" type="date" value={currentPlan.startDate} onChange={(e) => setCurrentPlan({...currentPlan, startDate: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-endDate" className="text-right">End Date</Label>
                <Input id="edit-endDate" type="date" value={currentPlan.endDate} onChange={(e) => setCurrentPlan({...currentPlan, endDate: e.target.value})} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select value={currentPlan.status} onValueChange={(value: any) => setCurrentPlan({...currentPlan, status: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleEditPlan}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the plan "{currentPlan?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmationOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeletePlan}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlansPage;