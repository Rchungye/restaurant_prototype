"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react"

const dishData = {
  1: {
    id: 1,
    name: "Kung Pao Chicken",
    price: 16.99,
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A classic Sichuan dish featuring tender chicken pieces stir-fried with roasted peanuts, vegetables, and chili peppers in a savory and slightly spicy sauce. This dish perfectly balances sweet, sour, and spicy flavors.",
    ingredients: [
      "Chicken breast",
      "Roasted peanuts",
      "Bell peppers",
      "Celery",
      "Dried chili peppers",
      "Garlic",
      "Ginger",
      "Soy sauce",
      "Rice wine",
      "Sugar",
    ],
    spicy: true,
    category: "Main Dishes",
    sideDishes: [
      { id: 1, name: "Steamed Rice", price: 3.99 },
      { id: 2, name: "Fried Rice", price: 5.99 },
      { id: 3, name: "Chow Mein", price: 7.99 },
    ],
    spiceLevel: ["Mild", "Medium", "Hot", "Extra Hot"],
  },
}

export default function DishDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const dishId = Number.parseInt(params.id as string)
  const orderType = searchParams.get("type") || "dine-in"

  const dish = dishData[dishId as keyof typeof dishData]
  const [quantity, setQuantity] = useState(1)
  const [selectedSides, setSelectedSides] = useState<number[]>([])
  const [spiceLevel, setSpiceLevel] = useState("Medium")
  const [notes, setNotes] = useState("")

  if (!dish) {
    return <div>Dish not found</div>
  }

  const handleSideToggle = (sideId: number) => {
    setSelectedSides((prev) => (prev.includes(sideId) ? prev.filter((id) => id !== sideId) : [...prev, sideId]))
  }

  const calculateTotal = () => {
    const basePrice = dish.price * quantity
    const sidesPrice = selectedSides.reduce((total, sideId) => {
      const side = dish.sideDishes.find((s) => s.id === sideId)
      return total + (side ? side.price : 0)
    }, 0)
    return basePrice + sidesPrice
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/customer/menu?type=${orderType}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Menu
                </Button>
              </Link>
              <Badge variant={orderType === "dine-in" ? "default" : "secondary"} className="bg-red-600">
                {orderType === "dine-in" ? "Dine-In" : "Take Away"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="relative">
              <Image
                src={dish.image || "/placeholder.svg"}
                alt={dish.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              {dish.spicy && <Badge className="absolute top-4 right-4 bg-red-500 text-white">🌶️ Spicy</Badge>}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{dish.name}</h1>
              <p className="text-2xl font-bold text-red-600">${dish.price.toFixed(2)}</p>
              <Badge variant="outline" className="mt-2">
                {dish.category}
              </Badge>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{dish.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {dish.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Spice Level */}
            {dish.spicy && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Spice Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={spiceLevel} onValueChange={setSpiceLevel}>
                    {dish.spiceLevel.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem value={level} id={level} />
                        <Label htmlFor={level}>{level}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {/* Side Dishes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Side Dishes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {dish.sideDishes.map((side) => (
                  <div key={side.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`side-${side.id}`}
                        checked={selectedSides.includes(side.id)}
                        onCheckedChange={() => handleSideToggle(side.id)}
                      />
                      <Label htmlFor={`side-${side.id}`}>{side.name}</Label>
                    </div>
                    <span className="text-sm font-medium">${side.price.toFixed(2)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Special Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Special Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special requests or dietary restrictions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Add to Cart */}
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-red-600">${calculateTotal().toFixed(2)}</span>
                </div>
                <Link href="/customer/cart">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-lg py-3">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
