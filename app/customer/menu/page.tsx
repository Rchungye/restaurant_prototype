"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, ArrowLeft } from "lucide-react"

const menuItems = [
  {
    id: 1,
    name: "Kung Pao Chicken",
    price: 16.99,
    image: "/placeholder.svg?height=200&width=300",
    description: "Spicy stir-fried chicken with peanuts and vegetables",
    category: "Main Dishes",
    spicy: true,
  },
  {
    id: 2,
    name: "Sweet & Sour Pork",
    price: 18.99,
    image: "/placeholder.svg?height=200&width=300",
    description: "Crispy pork with bell peppers in sweet and sour sauce",
    category: "Main Dishes",
    spicy: false,
  },
  {
    id: 3,
    name: "Mapo Tofu",
    price: 14.99,
    image: "/placeholder.svg?height=200&width=300",
    description: "Silky tofu in spicy Sichuan sauce",
    category: "Main Dishes",
    spicy: true,
  },
  {
    id: 4,
    name: "Fried Rice",
    price: 12.99,
    image: "/placeholder.svg?height=200&width=300",
    description: "Wok-fried rice with eggs and vegetables",
    category: "Rice & Noodles",
    spicy: false,
  },
  {
    id: 5,
    name: "Hot & Sour Soup",
    price: 8.99,
    image: "/placeholder.svg?height=200&width=300",
    description: "Traditional soup with tofu and mushrooms",
    category: "Soups",
    spicy: true,
  },
  {
    id: 6,
    name: "Spring Rolls",
    price: 7.99,
    image: "/placeholder.svg?height=200&width=300",
    description: "Crispy vegetable spring rolls with dipping sauce",
    category: "Appetizers",
    spicy: false,
  },
]

const categories = ["All", "Appetizers", "Soups", "Main Dishes", "Rice & Noodles"]

export default function MenuPage() {
  const searchParams = useSearchParams()
  const orderType = searchParams.get("type") || "dine-in"
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItems, setCartItems] = useState(0)

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🐼</span>
                <h1 className="text-xl font-bold text-gray-800">Golden Panda</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={orderType === "dine-in" ? "default" : "secondary"} className="bg-red-600">
                {orderType === "dine-in" ? "Dine-In" : "Take Away"}
              </Badge>
              <Link href="/customer/cart">
                <Button className="bg-red-600 hover:bg-red-700 relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black">{cartItems}</Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {item.spicy && <Badge className="absolute top-2 right-2 bg-red-500">🌶️ Spicy</Badge>}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <span className="text-lg font-bold text-red-600">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Link href={`/customer/dish/${item.id}?type=${orderType}`}>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
