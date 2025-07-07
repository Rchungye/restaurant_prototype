"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bell, Clock, CheckCircle, RefreshCw } from "lucide-react"

const initialOrders = [
  {
    id: "GP-2024-001",
    type: "Take Away",
    tableNumber: null,
    customerName: "John Doe",
    items: [
      { name: "Kung Pao Chicken", quantity: 2, notes: "Extra peanuts please" },
      { name: "Steamed Rice", quantity: 2, notes: "" },
    ],
    status: "pending",
    orderTime: new Date(Date.now() - 5 * 60000),
    total: 37.98,
  },
  {
    id: "GP-2024-002",
    type: "Dine-in",
    tableNumber: 5,
    customerName: "Jane Smith",
    items: [
      { name: "Sweet & Sour Pork", quantity: 1, notes: "" },
      { name: "Fried Rice", quantity: 1, notes: "No eggs" },
      { name: "Hot & Sour Soup", quantity: 1, notes: "Mild spice" },
    ],
    status: "preparing",
    orderTime: new Date(Date.now() - 12 * 60000),
    total: 32.97,
  },
  {
    id: "GP-2024-003",
    type: "Take Away",
    tableNumber: null,
    customerName: "Mike Johnson",
    items: [
      { name: "Mapo Tofu", quantity: 1, notes: "Extra spicy" },
      { name: "Steamed Rice", quantity: 1, notes: "" },
    ],
    status: "ready",
    orderTime: new Date(Date.now() - 20 * 60000),
    total: 18.98,
  },
]

export default function CookDashboard() {
  const [orders, setOrders] = useState(initialOrders)
  const [newOrderAlert, setNewOrderAlert] = useState(false)

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const removeOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order.id !== orderId))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "preparing":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "preparing"
      case "preparing":
        return "ready"
      default:
        return currentStatus
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    return `${diffMinutes} min ago`
  }

  // Simulate new order notification
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNewOrderAlert(true)
        setTimeout(() => setNewOrderAlert(false), 3000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const pendingOrders = orders.filter((order) => order.status === "pending")
  const preparingOrders = orders.filter((order) => order.status === "preparing")
  const readyOrders = orders.filter((order) => order.status === "ready")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👨‍🍳</span>
              <h1 className="text-2xl font-bold">Kitchen Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {newOrderAlert && (
                <div className="flex items-center space-x-2 bg-yellow-500 text-black px-3 py-1 rounded-full animate-pulse">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm font-medium">New Order!</span>
                </div>
              )}
              <Button variant="outline" className="bg-white text-red-600 hover:bg-red-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{preparingOrders.length}</div>
              <div className="text-sm text-gray-600">Preparing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{readyOrders.length}</div>
              <div className="text-sm text-gray-600">Ready</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Active</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Orders */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              Pending Orders ({pendingOrders.length})
            </h2>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-yellow-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={order.type === "Dine-in" ? "default" : "secondary"}>{order.type}</Badge>
                          {order.tableNumber && <Badge variant="outline">Table {order.tableNumber}</Badge>}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTime(order.orderTime)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">
                            {item.quantity}x {item.name}
                          </span>
                          {item.notes && <span className="text-sm text-gray-600 italic">"{item.notes}"</span>}
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                      >
                        Start Preparing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Preparing Orders */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Preparing ({preparingOrders.length})
            </h2>
            <div className="space-y-4">
              {preparingOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={order.type === "Dine-in" ? "default" : "secondary"}>{order.type}</Badge>
                          {order.tableNumber && <Badge variant="outline">Table {order.tableNumber}</Badge>}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTime(order.orderTime)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">
                            {item.quantity}x {item.name}
                          </span>
                          {item.notes && <span className="text-sm text-gray-600 italic">"{item.notes}"</span>}
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                      >
                        Mark Ready
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ready Orders */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Ready for Pickup ({readyOrders.length})
            </h2>
            <div className="space-y-4">
              {readyOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={order.type === "Dine-in" ? "default" : "secondary"}>{order.type}</Badge>
                          {order.tableNumber && <Badge variant="outline">Table {order.tableNumber}</Badge>}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatTime(order.orderTime)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">
                            {item.quantity}x {item.name}
                          </span>
                          {item.notes && <span className="text-sm text-gray-600 italic">"{item.notes}"</span>}
                        </div>
                      ))}
                    </div>
                    <Separator className="my-3" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => removeOrder(order.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
