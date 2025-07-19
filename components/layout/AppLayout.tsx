"use client"

import type React from "react"

import { Header } from "./Header"
import { ProtectedRoute } from "./ProtectedRoute"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
