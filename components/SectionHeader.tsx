"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from "lucide-react"

interface SectionHeaderProps {
  title: string
  description?: string
  hasChildren: boolean
  isExpanded: boolean
  onToggleExpanded: () => void
}

export function SectionHeader({ title, description, hasChildren, isExpanded, onToggleExpanded }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2">
      {hasChildren ? (
        <Button variant="ghost" size="sm" onClick={onToggleExpanded} className="p-1 h-6 w-6">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      ) : (
        <div className="w-6" />
      )}

      {hasChildren ? (
        isExpanded ? (
          <FolderOpen className="h-4 w-4 text-blue-500" />
        ) : (
          <Folder className="h-4 w-4 text-blue-500" />
        )
      ) : (
        <FileText className="h-4 w-4 text-gray-500" />
      )}

      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
    </div>
  )
}
