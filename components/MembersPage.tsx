'use client';

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserMinus } from 'lucide-react';

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
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleEdit = (id: string) => {
    console.log('Edit member', id);
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleEmail = (email: string) => {
    console.log('Email sent to', email);
  };

  const handleAddMember = () => {
    console.log('Add new member');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Members</h1>
      
      <div className="grid grid-cols-3 gap-4">
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
        <Input 
          placeholder="Search members..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="space-x-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'active' ? "default" : "outline"} 
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant={filter === 'inactive' ? "default" : "outline"} 
            onClick={() => setFilter('inactive')}
          >
            Inactive
          </Button>
          <Button variant="default" onClick={handleAddMember}>Add Member</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableCell className="font-medium">{member.firstName} {member.lastName}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell>{member.parentName}</TableCell>
                <TableCell>{member.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member.id)} className="mr-2">Edit</Button>
                  <Button variant="outline" size="sm" onClick={() => handleEmail(member.parentEmail)} className="mr-2">Email</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersPage;