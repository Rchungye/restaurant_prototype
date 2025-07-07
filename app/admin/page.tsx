"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication check (in real app, use proper authentication)
    if (credentials.username === "admin" && credentials.password === "admin123") {
      window.location.href = "/admin/dashboard"
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl">🐼</span>
            <h1 className="text-2xl font-bold text-gray-800">Golden Panda</h1>
          </div>
          <CardTitle className="text-xl">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>
              Username: <code className="bg-gray-100 px-1 rounded">admin</code>
            </p>
            <p>
              Password: <code className="bg-gray-100 px-1 rounded">admin123</code>
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link href="/">
              <Button variant="outline" size="sm">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
