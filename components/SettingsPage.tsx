'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Download, CheckCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Toggle dark mode on or off</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Time</SelectItem>
                    <SelectItem value="pst">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch id="emailNotifications" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive push notifications</p>
                </div>
                <Switch id="pushNotifications" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notificationFrequency">Notification Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="notificationFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Change Password</Button>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Enable two-factor authentication</p>
                </div>
                <Switch id="twoFactor" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Pro Plan</h3>
                    <p className="text-sm text-gray-500">Billed monthly</p>
                  </div>
                  <span className="text-2xl font-bold">$49.99/mo</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Unlimited members
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Advanced reporting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    24/7 support
                  </li>
                </ul>
                <Button className="w-full">Upgrade Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-20 rounded-md bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-semibold">Visa ending in 1234</p>
                    <p className="text-sm text-gray-500">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Update Payment Method</Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2" />
                  Billing History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Invoice</th>
                        <th className="text-left py-2">Amount</th>
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: '1234', amount: '$49.99', date: 'May 1, 2023', status: 'Paid' },
                        { id: '1233', amount: '$49.99', date: 'Apr 1, 2023', status: 'Paid' },
                        { id: '1232', amount: '$49.99', date: 'Mar 1, 2023', status: 'Paid' },
                      ].map((invoice) => (
                        <tr key={invoice.id} className="border-b">
                          <td className="py-2">Invoice #{invoice.id}</td>
                          <td className="py-2">{invoice.amount}</td>
                          <td className="py-2">{invoice.date}</td>
                          <td className="py-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-2">
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;