"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Plus, User, Edit, Eye } from "lucide-react"
import type { CollaboratorPermission } from "@/types"

interface CollaboratorManagerProps {
  collaborators: CollaboratorPermission[]
  onChange: (collaborators: CollaboratorPermission[]) => void
}

export function CollaboratorManager({ collaborators, onChange }: CollaboratorManagerProps) {
  const [newCollaboratorName, setNewCollaboratorName] = useState("")
  const [newCollaboratorPermission, setNewCollaboratorPermission] = useState<"edit" | "view">("edit")

  const addCollaborator = () => {
    const name = newCollaboratorName.trim()
    if (name && !collaborators.some((c) => c.name === name)) {
      onChange([...collaborators, { name, permission: newCollaboratorPermission }])
      setNewCollaboratorName("")
      setNewCollaboratorPermission("edit")
    }
  }

  const removeCollaborator = (name: string) => {
    onChange(collaborators.filter((c) => c.name !== name))
  }

  const updateCollaboratorPermission = (name: string, permission: "edit" | "view") => {
    onChange(collaborators.map((c) => (c.name === name ? { ...c, permission } : c)))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addCollaborator()
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Collaborators</label>

      {/* Add new collaborator */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter collaborator name"
            value={newCollaboratorName}
            onChange={(e) => setNewCollaboratorName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Select
          value={newCollaboratorPermission}
          onValueChange={(value: "edit" | "view") => setNewCollaboratorPermission(value)}
        >
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="edit">
              <div className="flex items-center gap-1">
                <Edit className="h-3 w-3" />
                Edit
              </div>
            </SelectItem>
            <SelectItem value="view">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                View
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" onClick={addCollaborator} disabled={!newCollaboratorName.trim()} size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Current collaborators */}
      {collaborators.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Current collaborators:</p>
          <div className="space-y-2">
            {collaborators.map((collaborator) => (
              <div key={collaborator.name} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{collaborator.name}</span>
                  <Badge variant={collaborator.permission === "edit" ? "default" : "outline"} className="text-xs">
                    {collaborator.permission === "edit" ? (
                      <>
                        <Edit className="h-3 w-3 mr-1" />
                        Editor
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        Viewer
                      </>
                    )}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Select
                    value={collaborator.permission}
                    onValueChange={(value: "edit" | "view") => updateCollaboratorPermission(collaborator.name, value)}
                  >
                    <SelectTrigger className="w-20 h-7 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edit">Edit</SelectItem>
                      <SelectItem value="view">View</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collaborator.name)}
                    className="ml-1 hover:text-red-500 p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
