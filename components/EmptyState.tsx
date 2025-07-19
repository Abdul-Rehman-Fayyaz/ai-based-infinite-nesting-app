"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Folder, Plus } from "lucide-react"

interface EmptyStateProps {
  onAddRoot: () => void
}

export function EmptyState({ onAddRoot }: EmptyStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sections yet</h3>
        <p className="text-gray-600 mb-4">Create your first section to get started with infinite nesting</p>
        <Button onClick={onAddRoot}>
          <Plus className="h-4 w-4 mr-2" />
          Add First Section
        </Button>
      </CardContent>
    </Card>
  )
}
