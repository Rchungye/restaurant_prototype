"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    paymentMethod: "card",
  })

  const orderTotal = 45.97

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    window.location.href = "/customer/confirmation"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/customer/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                        <CreditCard className="w-5 h-5" />
                        <span>Credit/Debit Card</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="digital" id="digital" />
                      <Label htmlFor="digital" className="flex items-center space-x-2 cursor-pointer">
                        <Smartphone className="w-5 h-5" />
                        <span>Digital Wallet (Apple Pay, Google Pay)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Order Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                    placeholder="Any special requests for your order..."
                  />
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Kung Pao Chicken (x2)</span>
                    <span>$33.98</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Sweet & Sour Pork (x1)</span>
                    <span>$18.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Steamed Rice</span>
                    <span>$3.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fried Rice</span>
                    <span>$5.99</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$62.95</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>$6.30</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-red-600">${orderTotal.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
                  <strong>Estimated Preparation Time:</strong> 15-20 minutes
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-lg py-3"
                  onClick={handleSubmit}
                >
                  Place Order & Pay
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
