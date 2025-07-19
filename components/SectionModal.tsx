"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Lock } from "lucide-react"
import type { Section, SectionModalData } from "@/types"
import { CollaboratorManager } from "./CollaboratorManager"
import { checkSectionPermissions } from "@/utils/permissionUtils"
import { useAuth } from "@/contexts/AuthContext"

interface SectionModalProps {
  section?: Section
  isOpen: boolean
  onClose: () => void
  onSave: (data: SectionModalData) => void
  parentTitle?: string
}

export function SectionModal({ section, isOpen, onClose, onSave, parentTitle }: SectionModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthor] = useState("")
  const [collaborators, setCollaborators] = useState<string[]>([])
  const { user } = useAuth()

  // Check permissions for editing
  const permissions = section ? checkSectionPermissions(section, user?.name || "") : null
  const canManageCollaborators = !section || permissions?.canManageCollaborators

  useEffect(() => {
    if (section) {
      setTitle(section.title)
      setDescription(section.description || "")
      setAuthor(section.author)
      setCollaborators(section.collaborators || [])
    } else {
      setTitle("")
      setDescription("")
      setAuthor(user?.name || "")
      setCollaborators([])
    }
  }, [section, user])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && author.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim(),
        author: author.trim(),
        collaborators: collaborators,
      })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{section ? "Edit Section" : "Add New Section"}</CardTitle>
          {parentTitle && <p className="text-sm text-muted-foreground">Parent: {parentTitle}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Permission warning for collaborators */}
            {section && permissions && !permissions.canManageCollaborators && (
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  You can edit the title and description, but only the author can manage collaborators.
                </AlertDescription>
              </Alert>
            )}

            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter section title"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description (optional)"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Author</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  className="pl-10"
                  disabled={section && !canManageCollaborators} // Only author can change author
                  required
                />
              </div>
            </div>

            {/* Collaborator management - only for authors */}
            {canManageCollaborators ? (
              <CollaboratorManager collaborators={collaborators} onChange={setCollaborators} />
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Collaborators</label>
                <div className="p-3 bg-muted rounded-lg flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Only the author can manage collaborators</span>
                </div>
                {collaborators.length > 0 && (
                  <div className="text-sm text-muted-foreground">Current: {collaborators.join(", ")}</div>
                )}
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{section ? "Update" : "Create"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
