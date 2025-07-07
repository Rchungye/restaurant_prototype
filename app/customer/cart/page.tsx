"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react"

const cartItems = [
  {
    id: 1,
    name: "Kung Pao Chicken",
    price: 16.99,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    spiceLevel: "Medium",
    sides: ["Steamed Rice"],
    notes: "Extra peanuts please",
  },
  {
    id: 2,
    name: "Sweet & Sour Pork",
    price: 18.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    sides: ["Fried Rice"],
    notes: "",
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/customer/menu">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Menu
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some delicious dishes to get started!</p>
              <Link href="/customer/menu">
                <Button className="bg-red-600 hover:bg-red-700">Browse Menu</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {item.spiceLevel && (
                          <Badge variant="outline" className="mb-2">
                            🌶️ {item.spiceLevel}
                          </Badge>
                        )}

                        {item.sides.length > 0 && (
                          <div className="mb-2">
                            <span className="text-sm text-gray-600">Sides: </span>
                            {item.sides.map((side, index) => (
                              <Badge key={index} variant="secondary" className="text-xs mr-1">
                                {side}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {item.notes && (
                          <p className="text-sm text-gray-600 mb-3">
                            <strong>Notes:</strong> {item.notes}
                          </p>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-semibold w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <span className="text-lg font-bold text-red-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>
                  <Link href="/customer/checkout">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">Proceed to Checkout</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
