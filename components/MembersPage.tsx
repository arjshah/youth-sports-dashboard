'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, UserCheck, UserMinus, PlusCircle, Edit, Trash2, Mail, Download, HelpCircle } from 'lucide-react';

// Define member type
type Member = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  parentName: string;
  parentEmail: string;
  isActive: boolean;
};

// Mock data
const initialMembers: Member[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', age: 10, parentName: 'Jane Doe', parentEmail: 'jane@example.com', isActive: true },
    { id: '2', firstName: 'Alice', lastName: 'Smith', age: 12, parentName: 'Bob Smith', parentEmail: 'bob@example.com', isActive: false },
    { id: '3', firstName: 'Tom', lastName: 'Brown', age: 11, parentName: 'Emily Brown', parentEmail: 'emily@example.com', isActive: true },
    { id: '4', firstName: 'Sophie', lastName: 'Johnson', age: 13, parentName: 'Peter Johnson', parentEmail: 'peter@example.com', isActive: false },
    { id: '5', firstName: 'Mia', lastName: 'Williams', age: 9, parentName: 'Laura Williams', parentEmail: 'laura@example.com', isActive: true },
    { id: '6', firstName: 'James', lastName: 'Davis', age: 14, parentName: 'David Davis', parentEmail: 'david@example.com', isActive: true },
    { id: '7', firstName: 'Ella', lastName: 'Miller', age: 12, parentName: 'Rachel Miller', parentEmail: 'rachel@example.com', isActive: false },
    { id: '8', firstName: 'Liam', lastName: 'Wilson', age: 10, parentName: 'Susan Wilson', parentEmail: 'susan@example.com', isActive: true },
    { id: '9', firstName: 'Olivia', lastName: 'Moore', age: 13, parentName: 'John Moore', parentEmail: 'john@example.com', isActive: true },
    { id: '10', firstName: 'Noah', lastName: 'Taylor', age: 9, parentName: 'Sarah Taylor', parentEmail: 'sarah@example.com', isActive: false },
    { id: '11', firstName: 'Emma', lastName: 'Anderson', age: 11, parentName: 'Mark Anderson', parentEmail: 'mark@example.com', isActive: true },
    { id: '12', firstName: 'Lucas', lastName: 'Thomas', age: 14, parentName: 'Karen Thomas', parentEmail: 'karen@example.com', isActive: true },
    { id: '13', firstName: 'Grace', lastName: 'Jackson', age: 12, parentName: 'Paul Jackson', parentEmail: 'paul@example.com', isActive: false },
    { id: '14', firstName: 'Henry', lastName: 'White', age: 10, parentName: 'Michelle White', parentEmail: 'michelle@example.com', isActive: true },
    { id: '15', firstName: 'Sophia', lastName: 'Harris', age: 13, parentName: 'Steven Harris', parentEmail: 'steven@example.com', isActive: true },
    { id: '16', firstName: 'Ava', lastName: 'Martin', age: 11, parentName: 'Jennifer Martin', parentEmail: 'jennifer@example.com', isActive: false },
    { id: '17', firstName: 'Ethan', lastName: 'Thompson', age: 9, parentName: 'Linda Thompson', parentEmail: 'linda@example.com', isActive: true },
    { id: '18', firstName: 'Harper', lastName: 'Garcia', age: 14, parentName: 'Carlos Garcia', parentEmail: 'carlos@example.com', isActive: true },
    { id: '19', firstName: 'Logan', lastName: 'Martinez', age: 13, parentName: 'Maria Martinez', parentEmail: 'maria@example.com', isActive: false },
    { id: '20', firstName: 'Lily', lastName: 'Robinson', age: 10, parentName: 'James Robinson', parentEmail: 'james@example.com', isActive: true },
    { id: '21', firstName: 'Jacob', lastName: 'Clark', age: 12, parentName: 'Karen Clark', parentEmail: 'karen.clark@example.com', isActive: true },
    { id: '22', firstName: 'Zoe', lastName: 'Rodriguez', age: 11, parentName: 'Luis Rodriguez', parentEmail: 'luis.rodriguez@example.com', isActive: false },
    { id: '23', firstName: 'Ella', lastName: 'Lewis', age: 13, parentName: 'Barbara Lewis', parentEmail: 'barbara.lewis@example.com', isActive: true },
    { id: '24', firstName: 'Michael', lastName: 'Lee', age: 9, parentName: 'Nancy Lee', parentEmail: 'nancy.lee@example.com', isActive: true },
    { id: '25', firstName: 'Chloe', lastName: 'Walker', age: 10, parentName: 'Henry Walker', parentEmail: 'henry.walker@example.com', isActive: false },
    { id: '26', firstName: 'Mason', lastName: 'Hall', age: 12, parentName: 'Laura Hall', parentEmail: 'laura.hall@example.com', isActive: true },
    { id: '27', firstName: 'Abigail', lastName: 'Allen', age: 11, parentName: 'George Allen', parentEmail: 'george.allen@example.com', isActive: true },
    { id: '28', firstName: 'Jack', lastName: 'Young', age: 13, parentName: 'Diana Young', parentEmail: 'diana.young@example.com', isActive: false },
    { id: '29', firstName: 'Isabella', lastName: 'King', age: 14, parentName: 'Thomas King', parentEmail: 'thomas.king@example.com', isActive: true },
    { id: '30', firstName: 'Ryan', lastName: 'Scott', age: 10, parentName: 'Melissa Scott', parentEmail: 'melissa.scott@example.com', isActive: true },
    { id: '31', firstName: 'Aiden', lastName: 'Green', age: 9, parentName: 'Patrick Green', parentEmail: 'patrick.green@example.com', isActive: false },
    { id: '32', firstName: 'Emily', lastName: 'Baker', age: 12, parentName: 'Sharon Baker', parentEmail: 'sharon.baker@example.com', isActive: true },
    { id: '33', firstName: 'Madison', lastName: 'Adams', age: 11, parentName: 'Samuel Adams', parentEmail: 'samuel.adams@example.com', isActive: true },
    { id: '34', firstName: 'Sebastian', lastName: 'Nelson', age: 13, parentName: 'Lisa Nelson', parentEmail: 'lisa.nelson@example.com', isActive: false },
    { id: '35', firstName: 'Scarlett', lastName: 'Carter', age: 14, parentName: 'Michael Carter', parentEmail: 'michael.carter@example.com', isActive: true },
    { id: '36', firstName: 'David', lastName: 'Mitchell', age: 10, parentName: 'Jessica Mitchell', parentEmail: 'jessica.mitchell@example.com', isActive: true },
    { id: '37', firstName: 'Lila', lastName: 'Perez', age: 9, parentName: 'Edward Perez', parentEmail: 'edward.perez@example.com', isActive: false },
    { id: '38', firstName: 'Samuel', lastName: 'Roberts', age: 12, parentName: 'Catherine Roberts', parentEmail: 'catherine.roberts@example.com', isActive: true },
    { id: '39', firstName: 'Violet', lastName: 'Turner', age: 11, parentName: 'Mark Turner', parentEmail: 'mark.turner@example.com', isActive: true },
    { id: '40', firstName: 'Daniel', lastName: 'Phillips', age: 13, parentName: 'Patricia Phillips', parentEmail: 'patricia.phillips@example.com', isActive: false },
    { id: '41', firstName: 'Zara', lastName: 'Campbell', age: 14, parentName: 'Scott Campbell', parentEmail: 'scott.campbell@example.com', isActive: true },
    { id: '42', firstName: 'Isaac', lastName: 'Parker', age: 10, parentName: 'Katherine Parker', parentEmail: 'katherine.parker@example.com', isActive: true },
  // Add more mock data as needed
];

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEditMemberDialogOpen, setIsEditMemberDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isBulkEmailDialogOpen, setIsBulkEmailDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [bulkEmailContent, setBulkEmailContent] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setMembers(initialMembers);
    setIsClient(true);
  }, []);

  const filteredMembers = members
    .filter(member => {
      if (filter === 'active') return member.isActive;
      if (filter === 'inactive') return !member.isActive;
      return true;
    })
    .filter(member => 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalMembers = members.length;
  const activeMembers = members.filter(member => member.isActive).length;
  const inactiveMembers = totalMembers - activeMembers;

  const handleEdit = (member: Member) => {
    setCurrentMember(member);
    setIsEditMemberDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCurrentMember(members.find(m => m.id === id) || null);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (currentMember) {
      setMembers(members.filter(member => member.id !== currentMember.id));
      setIsDeleteConfirmationOpen(false);
      setCurrentMember(null);
    }
  };

  const handleBulkEmail = () => {
    const selectedMemberEmails = members
      .filter(member => selectedMembers.includes(member.id))
      .map(member => member.parentEmail)
      .join(', ');
    setBulkEmailContent(`To: ${selectedMemberEmails}\n\nDear Parents,\n\n[Your message here]\n\nBest regards,\nYouth Sports Pro Team`);
    setIsBulkEmailDialogOpen(true);
  };

  const handleSendBulkEmail = () => {
    console.log('Sending bulk email:', bulkEmailContent);
    setIsBulkEmailDialogOpen(false);
    setBulkEmailContent('');
    setSelectedMembers([]);
  };

  const handleDownloadCSV = () => {
    const headers = ['First Name', 'Last Name', 'Age', 'Parent Name', 'Parent Email', 'Status'];
    const csvContent = [
      headers.join(','),
      ...members.map(member => 
        [member.firstName, member.lastName, member.age, member.parentName, member.parentEmail, member.isActive ? 'Active' : 'Inactive'].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'members.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Members</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Manage all your members, view their details, and perform actions like sending emails or updating records.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Members</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveMembers}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input 
            placeholder="Search members..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="active">Active Members</SelectItem>
              <SelectItem value="inactive">Inactive Members</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button onClick={handleBulkEmail} disabled={selectedMembers.length === 0}>
            <Mail className="mr-2 h-4 w-4" /> Bulk Email
          </Button>
          <Button onClick={handleDownloadCSV}>
            <Download className="mr-2 h-4 w-4" /> Download CSV
          </Button>
          <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
            <DialogTrigger asChild>
              <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
              </DialogHeader>
              {/* Add member form fields here */}
              <DialogFooter>
                <Button onClick={() => setIsAddMemberDialogOpen(false)}>Add Member</Button>
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
                    checked={selectedMembers.length === filteredMembers.length}
                    onCheckedChange={(checked) => {
                      setSelectedMembers(checked 
                        ? filteredMembers.map(m => m.id)
                        : []
                      )
                    }}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={(checked) => {
                        setSelectedMembers(checked
                          ? [...selectedMembers, member.id]
                          : selectedMembers.filter(id => id !== member.id)
                        )
                      }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{member.firstName} {member.lastName}</TableCell>
                  <TableCell>{member.age}</TableCell>
                  <TableCell>{member.parentName}</TableCell>
                  <TableCell>{member.isActive ? 'Active' : 'Inactive'}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      <Dialog open={isEditMemberDialogOpen} onOpenChange={setIsEditMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          {/* Add edit member form fields here */}
          <DialogFooter>
            <Button onClick={() => setIsEditMemberDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {currentMember?.firstName} {currentMember?.lastName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmationOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Email Dialog */}
      <Dialog open={isBulkEmailDialogOpen} onOpenChange={setIsBulkEmailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Send Bulk Email</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Label htmlFor="emailContent">Email Content</Label>
            <textarea
              id="emailContent"
              value={bulkEmailContent}
              onChange={(e) => setBulkEmailContent(e.target.value)}
              className="w-full h-64 p-2 border rounded-md"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkEmailDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSendBulkEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembersPage;