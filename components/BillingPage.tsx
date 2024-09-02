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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DollarSign, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Invoice = {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
};

type PaymentMethod = {
  id: string;
  memberId: string;
  memberName: string;
  type: 'card' | 'bank';
  last4: string;
  expiryDate?: string;
};

const mockInvoices: Invoice[] = [
  { id: '1', memberId: '1', memberName: 'John Doe', amount: 100, status: 'paid', dueDate: '2023-05-15' },
  { id: '2', memberId: '2', memberName: 'Alice Smith', amount: 150, status: 'pending', dueDate: '2023-06-01' },
  { id: '3', memberId: '3', memberName: 'Bob Johnson', amount: 200, status: 'overdue', dueDate: '2023-04-30' },
  { id: '4', memberId: '4', memberName: 'Sophie Williams', amount: 120, status: 'paid', dueDate: '2023-07-12' },
  { id: '5', memberId: '5', memberName: 'Michael Brown', amount: 180, status: 'pending', dueDate: '2023-07-01' },
  { id: '6', memberId: '6', memberName: 'Emma Davis', amount: 160, status: 'overdue', dueDate: '2023-05-20' },
  { id: '7', memberId: '7', memberName: 'Liam Miller', amount: 110, status: 'paid', dueDate: '2023-06-10' },
  { id: '8', memberId: '8', memberName: 'Olivia Wilson', amount: 140, status: 'pending', dueDate: '2023-08-01' },
  { id: '9', memberId: '9', memberName: 'Noah Moore', amount: 210, status: 'overdue', dueDate: '2023-04-25' },
  { id: '10', memberId: '10', memberName: 'Ava Taylor', amount: 130, status: 'paid', dueDate: '2023-06-20' },
  { id: '11', memberId: '11', memberName: 'Ethan Anderson', amount: 175, status: 'pending', dueDate: '2023-07-15' },
  { id: '12', memberId: '12', memberName: 'Harper Thomas', amount: 125, status: 'overdue', dueDate: '2023-05-10' },
  { id: '13', memberId: '13', memberName: 'Lucas Jackson', amount: 190, status: 'paid', dueDate: '2023-06-05' },
  { id: '14', memberId: '14', memberName: 'Charlotte White', amount: 135, status: 'pending', dueDate: '2023-08-05' },
  { id: '15', memberId: '15', memberName: 'Henry Harris', amount: 160, status: 'overdue', dueDate: '2023-05-25' },
  { id: '16', memberId: '16', memberName: 'Sophia Martin', amount: 150, status: 'paid', dueDate: '2023-07-25' },
  { id: '17', memberId: '17', memberName: 'Mason Thompson', amount: 140, status: 'pending', dueDate: '2023-06-30' },
  { id: '18', memberId: '18', memberName: 'Ella Garcia', amount: 185, status: 'overdue', dueDate: '2023-04-15' },
  { id: '19', memberId: '19', memberName: 'Alexander Martinez', amount: 170, status: 'paid', dueDate: '2023-07-10' },
  { id: '20', memberId: '20', memberName: 'Grace Robinson', amount: 155, status: 'pending', dueDate: '2023-06-25' },
  { id: '21', memberId: '21', memberName: 'James Clark', amount: 195, status: 'overdue', dueDate: '2023-04-01' },
  { id: '22', memberId: '22', memberName: 'Zoe Rodriguez', amount: 200, status: 'paid', dueDate: '2023-07-05' },
  { id: '23', memberId: '23', memberName: 'Lily Lewis', amount: 185, status: 'pending', dueDate: '2023-08-10' },
  { id: '24', memberId: '24', memberName: 'Daniel Lee', amount: 145, status: 'overdue', dueDate: '2023-05-01' },
  { id: '25', memberId: '25', memberName: 'Emily Walker', amount: 155, status: 'paid', dueDate: '2023-06-15' },
  { id: '26', memberId: '26', memberName: 'Madison Hall', amount: 170, status: 'pending', dueDate: '2023-07-20' },
  { id: '27', memberId: '27', memberName: 'Scarlett Allen', amount: 180, status: 'overdue', dueDate: '2023-05-05' },
  { id: '28', memberId: '28', memberName: 'David Young', amount: 165, status: 'paid', dueDate: '2023-06-25' },
  { id: '29', memberId: '29', memberName: 'Sebastian King', amount: 175, status: 'pending', dueDate: '2023-08-15' },
  { id: '30', memberId: '30', memberName: 'Aiden Scott', amount: 190, status: 'overdue', dueDate: '2023-04-20' },
  { id: '31', memberId: '31', memberName: 'Isabella Green', amount: 140, status: 'paid', dueDate: '2023-07-30' },
  { id: '32', memberId: '32', memberName: 'Logan Baker', amount: 130, status: 'pending', dueDate: '2023-06-10' },
  { id: '33', memberId: '33', memberName: 'Chloe Adams', amount: 160, status: 'overdue', dueDate: '2023-04-10' },
  { id: '34', memberId: '34', memberName: 'Jack Nelson', amount: 175, status: 'paid', dueDate: '2023-07-20' },
  { id: '35', memberId: '35', memberName: 'Mia Carter', amount: 165, status: 'pending', dueDate: '2023-08-25' },
  { id: '36', memberId: '36', memberName: 'Benjamin Mitchell', amount: 190, status: 'overdue', dueDate: '2023-05-15' },
  { id: '37', memberId: '37', memberName: 'Ava Perez', amount: 145, status: 'paid', dueDate: '2023-06-30' },
  { id: '38', memberId: '38', memberName: 'Charlotte Roberts', amount: 150, status: 'pending', dueDate: '2023-07-05' },
  { id: '39', memberId: '39', memberName: 'Henry Turner', amount: 160, status: 'overdue', dueDate: '2023-05-20' },
  { id: '40', memberId: '40', memberName: 'Sophie Phillips', amount: 170, status: 'paid', dueDate: '2023-07-25' }
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', memberId: '1', memberName: 'John Doe', type: 'card', last4: '1234', expiryDate: '05/25' },
  { id: '2', memberId: '2', memberName: 'Alice Smith', type: 'bank', last4: '5678' },
  { id: '3', memberId: '3', memberName: 'Bob Johnson', type: 'card', last4: '4321', expiryDate: '12/24' },
  { id: '4', memberId: '4', memberName: 'Sophie Williams', type: 'bank', last4: '8765' },
  { id: '5', memberId: '5', memberName: 'Michael Brown', type: 'card', last4: '1111', expiryDate: '03/26' },
  { id: '6', memberId: '6', memberName: 'Emma Davis', type: 'bank', last4: '2222' },
  { id: '7', memberId: '7', memberName: 'Liam Miller', type: 'card', last4: '3333', expiryDate: '07/23' },
  { id: '8', memberId: '8', memberName: 'Olivia Wilson', type: 'bank', last4: '4444' },
  { id: '9', memberId: '9', memberName: 'Noah Moore', type: 'card', last4: '5555', expiryDate: '08/24' },
  { id: '10', memberId: '10', memberName: 'Ava Taylor', type: 'bank', last4: '6666' },
  { id: '11', memberId: '11', memberName: 'Ethan Anderson', type: 'card', last4: '7777', expiryDate: '02/25' },
  { id: '12', memberId: '12', memberName: 'Harper Thomas', type: 'bank', last4: '8888' },
  { id: '13', memberId: '13', memberName: 'Lucas Jackson', type: 'card', last4: '9999', expiryDate: '11/24' },
  { id: '14', memberId: '14', memberName: 'Charlotte White', type: 'bank', last4: '1010' },
  { id: '15', memberId: '15', memberName: 'Henry Harris', type: 'card', last4: '1212', expiryDate: '04/25' },
  { id: '16', memberId: '16', memberName: 'Sophia Martin', type: 'bank', last4: '1313' },
  { id: '17', memberId: '17', memberName: 'Mason Thompson', type: 'card', last4: '1414', expiryDate: '06/23' },
  { id: '18', memberId: '18', memberName: 'Ella Garcia', type: 'bank', last4: '1515' },
  { id: '19', memberId: '19', memberName: 'Alexander Martinez', type: 'card', last4: '1616', expiryDate: '10/24' },
  { id: '20', memberId: '20', memberName: 'Grace Robinson', type: 'bank', last4: '1717' },
  { id: '21', memberId: '21', memberName: 'James Clark', type: 'card', last4: '1818', expiryDate: '01/26' },
  { id: '22', memberId: '22', memberName: 'Zoe Rodriguez', type: 'bank', last4: '1919' },
  { id: '23', memberId: '23', memberName: 'Lily Lewis', type: 'card', last4: '2020', expiryDate: '12/23' },
  { id: '24', memberId: '24', memberName: 'Daniel Lee', type: 'bank', last4: '2121' },
  { id: '25', memberId: '25', memberName: 'Emily Walker', type: 'card', last4: '2222', expiryDate: '09/24' },
  { id: '26', memberId: '26', memberName: 'Madison Hall', type: 'bank', last4: '2323' },
  { id: '27', memberId: '27', memberName: 'Scarlett Allen', type: 'card', last4: '2424', expiryDate: '11/25' },
  { id: '28', memberId: '28', memberName: 'David Young', type: 'bank', last4: '2525' },
  { id: '29', memberId: '29', memberName: 'Sebastian King', type: 'card', last4: '2626', expiryDate: '08/23' },
  { id: '30', memberId: '30', memberName: 'Aiden Scott', type: 'bank', last4: '2727' },
  { id: '31', memberId: '31', memberName: 'Isabella Green', type: 'card', last4: '2828', expiryDate: '07/25' },
  { id: '32', memberId: '32', memberName: 'Logan Baker', type: 'bank', last4: '2929' },
  { id: '33', memberId: '33', memberName: 'Chloe Adams', type: 'card', last4: '3030', expiryDate: '05/24' },
  { id: '34', memberId: '34', memberName: 'Jack Nelson', type: 'bank', last4: '3131' },
  { id: '35', memberId: '35', memberName: 'Mia Carter', type: 'card', last4: '3232', expiryDate: '03/26' },
  { id: '36', memberId: '36', memberName: 'Benjamin Mitchell', type: 'bank', last4: '3333' },
  { id: '37', memberId: '37', memberName: 'Ava Perez', type: 'card', last4: '3434', expiryDate: '06/23' },
  { id: '38', memberId: '38', memberName: 'Charlotte Roberts', type: 'bank', last4: '3535' },
  { id: '39', memberId: '39', memberName: 'Henry Turner', type: 'card', last4: '3636', expiryDate: '02/25' },
  { id: '40', memberId: '40', memberName: 'Sophie Phillips', type: 'bank', last4: '3737' }
];

type TimePeriod = 'This Month' | 'Last Month' | 'Last 3 Months' | 'This Year';

const BillingPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [activeTab, setActiveTab] = useState<'invoices' | 'paymentMethods'>('invoices');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('This Month');

  const billingData = {
    'This Month': { revenue: 450, paidInvoices: 1, pendingInvoices: 1, trends: { revenue: 10, paidInvoices: 0, pendingInvoices: -5 } },
    'Last Month': { revenue: 400, paidInvoices: 1, pendingInvoices: 2, trends: { revenue: 5, paidInvoices: -10, pendingInvoices: 15 } },
    'Last 3 Months': { revenue: 1200, paidInvoices: 4, pendingInvoices: 3, trends: { revenue: 15, paidInvoices: 20, pendingInvoices: -10 } },
    'This Year': { revenue: 5000, paidInvoices: 15, pendingInvoices: 5, trends: { revenue: 25, paidInvoices: 30, pendingInvoices: -20 } },
  };

  const currentData = billingData[timePeriod];

  const TrendIndicator: React.FC<{ value: number }> = ({ value }) => (
    <span className={`flex items-center ${value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {value >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
      {Math.abs(value)}%
    </span>
  );

  const handleCreateInvoice = () => {
    console.log('Create new invoice');
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const handleAddPaymentMethod = () => {
    console.log('Add new payment method');
  };

  const handleUpdatePaymentMethod = (id: string) => {
    console.log('Update payment method', id);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Billing</h1>
      
      <div className="flex justify-end">
        <Select onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={timePeriod} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="Last Month">Last Month</SelectItem>
            <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentData.revenue}</div>
            <div className="text-xs text-muted-foreground">
              <TrendIndicator value={currentData.trends.revenue} /> from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.paidInvoices}</div>
            <div className="text-xs text-muted-foreground">
              <TrendIndicator value={currentData.trends.paidInvoices} /> from previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.pendingInvoices}</div>
            <div className="text-xs text-muted-foreground">
              <TrendIndicator value={currentData.trends.pendingInvoices} /> from previous period
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="invoices" onClick={() => setActiveTab('invoices')}>Invoices</TabsTrigger>
            <TabsTrigger value="paymentMethods" onClick={() => setActiveTab('paymentMethods')}>Payment Methods</TabsTrigger>
          </TabsList>
          {activeTab === 'invoices' ? (
            <Button onClick={handleCreateInvoice}>Create Invoice</Button>
          ) : (
            <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
          )}
        </div>

        <TabsContent value="invoices">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.memberName}</TableCell>
                    <TableCell>${invoice.amount}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="mr-2">View</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Invoice Details</DialogTitle>
                            <DialogDescription>
                              Invoice for {invoice.memberName}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <p>Amount: ${invoice.amount}</p>
                            <p>Status: {invoice.status}</p>
                            <p>Due Date: {invoice.dueDate}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="paymentMethods">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last 4 Digits</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.memberName}</TableCell>
                    <TableCell>{method.type}</TableCell>
                    <TableCell>**** {method.last4}</TableCell>
                    <TableCell>{method.expiryDate || 'N/A'}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleUpdatePaymentMethod(method.id)}>Update</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingPage;