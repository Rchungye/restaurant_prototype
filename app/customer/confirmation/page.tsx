import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"

export default function ConfirmationPage() {
  const orderNumber = "GP-2024-001"
  const estimatedTime = "15-20 minutes"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐼</span>
            <h1 className="text-xl font-bold text-gray-800">Golden Panda</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <Card className="text-center mb-8 bg-green-50 border-green-200">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600 mb-4">
                Thank you for your order. We're preparing your delicious meal right now.
              </p>
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">Order #{orderNumber}</Badge>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Order Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">Estimated Preparation Time</p>
                  <p className="text-sm text-gray-600">Your order will be ready in</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-yellow-600">{estimatedTime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Order Type:</span>
                  <Badge variant="outline">Take Away</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Order Time:</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status:</span>
                  <Badge className="bg-green-600">Paid</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Kung Pao Chicken (x2)</span>
                <span>$33.98</span>
              </div>
              <div className="flex justify-between">
                <span>Sweet & Sour Pork (x1)</span>
                <span>$18.99</span>
              </div>
              <div className="flex justify-between">
                <span>Steamed Rice</span>
                <span>$3.99</span>
              </div>
              <div className="flex justify-between">
                <span>Fried Rice</span>
                <span>$5.99</span>
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
                <span>Total Paid</span>
                <span className="text-red-600">$69.25</span>
              </div>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Pickup Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-semibold">Golden Panda Restaurant</p>
                <p className="text-gray-600">123 Main Street, Downtown</p>
                <p className="text-gray-600">City, State 12345</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pickup Instructions:</strong> Please show this confirmation at the counter when collecting
                  your order.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/customer/menu" className="flex-1">
              <Button variant="outline" className="w-full">
                Order Again
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-red-600 hover:bg-red-700">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
