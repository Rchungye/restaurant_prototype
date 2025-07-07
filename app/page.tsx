import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { QrCode, ShoppingBag, Users, ChefHat } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-xl">🐼</span>
              </div>
              <h1 className="text-3xl font-bold">Golden Panda</h1>
            </div>
            <div className="flex space-x-4">
              <Link href="/cook">
                <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Cook View
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50">
                  <Users className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Golden Panda</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience authentic Chinese cuisine with our modern ordering system. Choose your preferred dining option
            below.
          </p>
        </div>

        {/* Customer Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-red-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCode className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Dine-In</h3>
              <p className="text-gray-600 mb-6">
                Scan the QR code at your table to browse our menu and place your order directly from your seat.
              </p>
              <Link href="/customer/menu?type=dine-in">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">Scan QR Code</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300 border-2 hover:border-yellow-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Take Away</h3>
              <p className="text-gray-600 mb-6">
                Order online for pickup. Browse our full menu and have your food ready when you arrive.
              </p>
              <Link href="/customer/menu?type=takeaway">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg">Order Now</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍜</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Fresh Ingredients</h4>
            <p className="text-gray-600">Made with the finest and freshest ingredients daily</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Fast Service</h4>
            <p className="text-gray-600">Quick preparation and efficient service</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Award Winning</h4>
            <p className="text-gray-600">Recognized for excellence in Chinese cuisine</p>
          </div>
        </div>
      </main>
    </div>
  )
}
