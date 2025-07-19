"use client"

import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, Lock } from "lucide-react"
import { checkSectionPermissions } from "@/utils/permissionUtils"
import { useAuth } from "@/contexts/AuthContext"
import type { Section } from "@/types"

interface SectionActionsProps {
  section: Section
  onAddChild: () => void
  onEdit: () => void
  onDelete: () => void
  level: number
}

export function SectionActions({ section, onAddChild, onEdit, onDelete, level }: SectionActionsProps) {
  const { user } = useAuth()
  const permissions = checkSectionPermissions(section, user?.name || "")

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs bg-gray-100 px-2 py-1 rounded">Level {level + 1}</div>

      {/* Add Child Button - Only for Authors */}
      {permissions.canCreate ? (
        <Button variant="ghost" size="sm" onClick={onAddChild} className="h-8 w-8 p-0" title="Add child section">
          <Plus className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0" title="Only authors can create sections">
          <Lock className="h-3 w-3" />
        </Button>
      )}

      {/* Edit Button - For Authors and Collaborators */}
      {permissions.canEdit ? (
        <Button variant="ghost" size="sm" onClick={onEdit} className="h-8 w-8 p-0" title="Edit section">
          <Edit2 className="h-4 w-4" />
        </Button>
      ) : (
        <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0" title="No edit permission">
          <Lock className="h-3 w-3" />
        </Button>
      )}

      {/* Delete Button - Only for Authors */}
      {permissions.canDelete ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
          title="Delete section"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="h-8 w-8 p-0 text-gray-400"
          title="Only authors can delete sections"
        >
          <Lock className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
