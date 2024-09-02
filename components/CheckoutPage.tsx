'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MinusCircle } from 'lucide-react';

const BusinessName = "Riverside Youth Soccer League";

const planDetails = {
  '1': {
    name: 'Fall 2024 Under 12 Soccer',
    description: 'Join our exciting fall soccer program for kids under 12. Develop skills, make friends, and have fun!',
    price: 150,
    recurring: 'monthly'
  },
  // Add other plans as needed
};

const CheckoutPage = () => {
  const params = useParams();
  const id = params.id as string;
  const plan = planDetails[id as keyof typeof planDetails];

  const [parentInfo, setParentInfo] = useState({ name: '', email: '', phone: '' });
  const [children, setChildren] = useState([{ name: '', age: '' }]);
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!plan) {
      // Redirect to a 404 page or display an error message
      console.error('Plan not found');
    }
  }, [plan]);

  const handleParentInfoChange = (e) => {
    setParentInfo({ ...parentInfo, [e.target.name]: e.target.value });
  };

  const handleChildInfoChange = (index, e) => {
    const newChildren = [...children];
    newChildren[index] = { ...newChildren[index], [e.target.name]: e.target.value };
    setChildren(newChildren);
  };

  const handlePaymentInfoChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const addChild = () => {
    setChildren([...children, { name: '', age: '' }]);
  };

  const removeChild = (index) => {
    const newChildren = [...children];
    newChildren.splice(index, 1);
    setChildren(newChildren);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the payment and send data to your server
    console.log('Submission data:', { parentInfo, children, paymentInfo, planId: id });
    setIsSubmitted(true);
    // Here you would trigger the email sending process
  };

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <CardTitle className="text-center text-2xl">Plan Not Found</CardTitle>
          <CardContent>
            <p className="text-center">The plan you are looking for does not exist. Please check the link and try again.</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col justify-center items-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-green-700">Registration Successful!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg mb-4">Thank you for registering with {BusinessName}.</p>
            <p className="text-center">A confirmation email has been sent to {parentInfo.email}.</p>
            <p className="text-center mt-4">We look forward to seeing you on the field!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 flex flex-col justify-center items-center p-6">
      <h1 className="text-4xl font-bold text-blue-800 mb-6">{BusinessName}</h1>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
          <CardDescription className="text-center">{plan.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Parent Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="parentName">Full Name</Label>
                  <Input id="parentName" name="name" required onChange={handleParentInfoChange} />
                </div>
                <div>
                  <Label htmlFor="parentEmail">Email address</Label>
                  <Input id="parentEmail" name="email" type="email" required onChange={handleParentInfoChange} />
                </div>
                <div>
                  <Label htmlFor="parentPhone">Phone number</Label>
                  <Input id="parentPhone" name="phone" type="tel" required onChange={handleParentInfoChange} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Child Information</h2>
              {children.map((child, index) => (
                <div key={index} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`childName${index}`}>Child's Name</Label>
                      <Input id={`childName${index}`} name="name" required onChange={(e) => handleChildInfoChange(index, e)} />
                    </div>
                    <div>
                      <Label htmlFor={`childAge${index}`}>Child's Age</Label>
                      <Input id={`childAge${index}`} name="age" type="number" required onChange={(e) => handleChildInfoChange(index, e)} />
                    </div>
                  </div>
                  {index > 0 && (
                    <Button type="button" variant="outline" onClick={() => removeChild(index)}>
                      <MinusCircle className="mr-2 h-4 w-4" /> Remove Child
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addChild}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Another Child
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" name="cardNumber" required onChange={handlePaymentInfoChange} />
                </div>
                <div>
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" name="expiry" placeholder="MM/YY" required onChange={handlePaymentInfoChange} />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" name="cvv" required onChange={handlePaymentInfoChange} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${plan.price * children.length}</span>
              <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Complete Registration</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;