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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, FileText, CreditCard, PlusCircle, Edit, Trash2, HelpCircle, Download, Search, Filter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, addDays, isPast, isFuture } from 'date-fns';

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
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [sort, setSort] = useState<'dueDate' | 'amount'>('dueDate');
  const [search, setSearch] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<PaymentMethod | null>({
    id: '',
    memberId: '',
    memberName: '',
    type: 'card',
    last4: '',
    expiryDate: '',
  });
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<'all' | 'card' | 'bank'>('all');
  const [paymentMethodSearch, setPaymentMethodSearch] = useState('');


  const billingData: Record<TimePeriod, { revenue: number; paidInvoices: number; pendingInvoices: number; toBeProcessed: number; alreadyProcessed: number }> = {
    'This Month': { 
      revenue: 5000, 
      paidInvoices: 15, 
      pendingInvoices: 5, 
      toBeProcessed: 3000,
      alreadyProcessed: 2000,
    },
    'Last Month': {
      revenue: 4500,
      paidInvoices: 12,
      pendingInvoices: 3,
      toBeProcessed: 2500,
      alreadyProcessed: 2000,
    },
    'Last 3 Months': {
      revenue: 13000,
      paidInvoices: 40,
      pendingInvoices: 10,
      toBeProcessed: 7500,
      alreadyProcessed: 5500,
    },
    'This Year': {
      revenue: 52000,
      paidInvoices: 150,
      pendingInvoices: 25,
      toBeProcessed: 30000,
      alreadyProcessed: 22000,
    },
  };
  

  const currentData = billingData[timePeriod];

  const [formMemberName, setFormMemberName] = useState('');
  const [formType, setFormType] = useState('card');
  const [formLast4, setFormLast4] = useState('');
  const [formExpiryDate, setFormExpiryDate] = useState('');

const filteredInvoices = invoices
.filter(invoice => filter === 'all' || invoice.status === filter)
.filter(invoice => 
  invoice.memberName.toLowerCase().includes(search.toLowerCase()) ||
  invoice.amount.toString().includes(search)
)
.sort((a, b) => {
  if (sort === 'dueDate') {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  } else {
    return a.amount - b.amount;
  }
});

const filteredPaymentMethods = paymentMethods
.filter(method => paymentMethodFilter === 'all' || method.type === paymentMethodFilter)
.filter(method => 
  method.memberName.toLowerCase().includes(paymentMethodSearch.toLowerCase()) ||
  method.last4.includes(paymentMethodSearch)
);

const handleCreateInvoice = (newInvoice: Invoice) => {
setInvoices([...invoices, newInvoice]);
setIsCreateInvoiceOpen(false);
};

const handleDeleteInvoices = () => {
setInvoices(invoices.filter(invoice => !selectedInvoices.includes(invoice.id)));
setSelectedInvoices([]);
setIsDeleteConfirmationOpen(false);
};

const handleAddPaymentMethod = () => {
  const newPaymentMethod: PaymentMethod = {
    id: Date.now().toString(),
    memberId: Date.now().toString(),
    memberName: currentPaymentMethod?.memberName ?? '',
    type: currentPaymentMethod?.type ?? 'card',
    last4: currentPaymentMethod?.last4 ?? '',
    expiryDate: currentPaymentMethod?.expiryDate ?? '',
  };

  setPaymentMethods([...paymentMethods, newPaymentMethod]);
  setIsPaymentMethodModalOpen(false);
};


  function handleUpdatePaymentMethod(updatedMethod: PaymentMethod) {
    setPaymentMethods(paymentMethods.map(method => method.id === updatedMethod.id ? updatedMethod : method
    ));
    setIsPaymentMethodModalOpen(false);
  }

const handleDeletePaymentMethod = (id: string) => {
setPaymentMethods(paymentMethods.filter(method => method.id !== id));
setIsPaymentMethodModalOpen(false);
};

return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Billing</h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Manage invoices and payment methods for your organization here.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentData.revenue.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">To Be Processed</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentData.toBeProcessed.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Already Processed</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${currentData.alreadyProcessed.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.pendingInvoices}</div>
        </CardContent>
      </Card>
    </div>

    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as 'invoices' | 'paymentMethods')}
    >
  <TabsList>
    <TabsTrigger value="invoices">Invoices</TabsTrigger>
    <TabsTrigger value="paymentMethods">Payment Methods</TabsTrigger>
  </TabsList>
      <TabsContent value="invoices">
        <div className="flex justify-between items-center mb-4">
          <Select value={timePeriod} onValueChange={(value: TimePeriod) => setTimePeriod(value)}>
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
          <div className="flex space-x-2">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px]"
            />
            <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(value: any) => setSort(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsCreateInvoiceOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Invoice
            </Button>
          </div>
        </div>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedInvoices.length === filteredInvoices.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedInvoices(filteredInvoices.map(i => i.id));
                        } else {
                          setSelectedInvoices([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => {
                  const dueDate = new Date(invoice.dueDate);
                  const isUpcoming = isFuture(dueDate) && isPast(addDays(new Date(), 7));
                  return (
                    <TableRow key={invoice.id} className={isUpcoming ? 'bg-yellow-50' : ''}>
                      <TableCell>
                        <Checkbox
                          checked={selectedInvoices.includes(invoice.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedInvoices([...selectedInvoices, invoice.id]);
                            } else {
                              setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{invoice.memberName}</TableCell>
                      <TableCell>${invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'paid' ? 'default' : (invoice.status === 'pending' ? 'secondary' : 'destructive')}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="mr-2" onClick={() => {
                          setCurrentInvoice(invoice);
                          setIsViewInvoiceOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => {
                          // Implement PDF download logic
                        }}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {selectedInvoices.length > 0 && (
          <div className="flex justify-end mt-4">
            <Button variant="destructive" onClick={() => setIsDeleteConfirmationOpen(true)}>
              Delete Selected Invoices
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="paymentMethods">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Search payment methods..."
              value={paymentMethodSearch}
              onChange={(e) => setPaymentMethodSearch(e.target.value)}
              className="w-[250px]"
            />
            <Select value={paymentMethodFilter} onValueChange={(value: any) => setPaymentMethodFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="bank">Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => {
            setCurrentPaymentMethod(null);
            setIsPaymentMethodModalOpen(true);
          }}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        </div>
        <Card>
          <CardContent>
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
                {filteredPaymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.memberName}</TableCell>
                    <TableCell>{method.type}</TableCell>
                    <TableCell>**** {method.last4}</TableCell>
                    <TableCell>{method.expiryDate || 'N/A'}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="mr-2" onClick={() => {
                        setCurrentPaymentMethod(method);
                        setIsPaymentMethodModalOpen(true);
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        setCurrentPaymentMethod(method);
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
      </TabsContent>
    </Tabs>

    {/* Create Invoice Modal */}
    <Dialog open={isCreateInvoiceOpen} onOpenChange={setIsCreateInvoiceOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
        </DialogHeader>
        {/* Add form fields for creating a new invoice */}
        <DialogFooter>
          <Button onClick={() => setIsCreateInvoiceOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            // Implement create invoice logic
            setIsCreateInvoiceOpen(false);
          }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* View/Edit Invoice Modal */}
    <Dialog open={isViewInvoiceOpen} onOpenChange={setIsViewInvoiceOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invoice Details</DialogTitle>
        </DialogHeader>
        {currentInvoice && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="memberName">Member Name</Label>
                <Input id="memberName" value={currentInvoice.memberName} readOnly />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" value={currentInvoice.amount} />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={currentInvoice.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" value={currentInvoice.dueDate} />
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setIsViewInvoiceOpen(false)}>Close</Button>
          <Button onClick={() => {
            // Implement update invoice logic
            setIsViewInvoiceOpen(false);
          }}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Payment Method Modal */}
 <Dialog open={isPaymentMethodModalOpen} onOpenChange={setIsPaymentMethodModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentPaymentMethod ? 'Edit Payment Method' : 'Add Payment Method'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
          <div>
  <Label htmlFor="memberName">Member Name</Label>
  <Input 
    id="memberName" 
    value={formMemberName} 
    onChange={(e) => setFormMemberName(e.target.value)}
  />
</div>
<div>
  <Label htmlFor="type">Type</Label>
  <Select 
    value={formType}
    onValueChange={(value: 'card' | 'bank') => setFormType(value)}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="card">Card</SelectItem>
      <SelectItem value="bank">Bank</SelectItem>
    </SelectContent>
  </Select>
</div>
<div>
  <Label htmlFor="last4">Last 4 Digits</Label>
  <Input 
    id="last4" 
    value={formLast4} 
    onChange={(e) => setFormLast4(e.target.value)}
    maxLength={4}
  />
</div>
{formType === 'card' && (
  <div>
    <Label htmlFor="expiryDate">Expiry Date</Label>
    <Input 
      id="expiryDate" 
      value={formExpiryDate} 
      onChange={(e) => setFormExpiryDate(e.target.value)}
      placeholder="MM/YY"
    />
  </div>
)}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsPaymentMethodModalOpen(false)}>Cancel</Button>
          <Button onClick={() => {
  if (currentPaymentMethod) {
    handleUpdatePaymentMethod(currentPaymentMethod);
  } else {
    // Handle adding new payment method
    const newPaymentMethod: PaymentMethod = {
      id: Date.now().toString(),
      memberId: Date.now().toString(),
      memberName: formMemberName,
      type: formType as 'card' | 'bank', // Fix: Update the type of formType
      last4: formLast4,
      expiryDate: formExpiryDate,
    };
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
  }
  setIsPaymentMethodModalOpen(false);
}}>
  {currentPaymentMethod ? 'Update' : 'Add'}
</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Delete Confirmation Modal */}
    <Dialog open={isDeleteConfirmationOpen} onOpenChange={setIsDeleteConfirmationOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            {activeTab === 'invoices'
              ? 'Are you sure you want to delete the selected invoices? This action cannot be undone.'
              : `Are you sure you want to delete the payment method for ${currentPaymentMethod?.memberName}? This action cannot be undone.`
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteConfirmationOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={() => {
            if (activeTab === 'invoices') {
              handleDeleteInvoices();
            } else {
              handleDeletePaymentMethod(currentPaymentMethod!.id);
            }
            setIsDeleteConfirmationOpen(false);
          }}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
);

};

export default BillingPage;