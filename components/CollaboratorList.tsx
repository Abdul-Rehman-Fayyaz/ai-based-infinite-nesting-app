"use client"

import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, Edit, Eye } from "lucide-react"
import type { CollaboratorPermission } from "@/types"

interface CollaboratorListProps {
  author: string
  collaborators: CollaboratorPermission[]
  currentUserName?: string
}

export function CollaboratorList({ author, collaborators, currentUserName }: CollaboratorListProps) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
      <div className="flex items-center gap-1">
        <UserCheck className="h-3 w-3" />
        <span>Author: {author}</span>
      </div>

      {collaborators.length > 0 && (
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3" />
          <span>Collaborators:</span>
          <div className="flex gap-1 flex-wrap">
            {collaborators.map((collaborator) => (
              <Badge
                key={collaborator.name}
                variant={collaborator.name === currentUserName ? "default" : "secondary"}
                className="text-xs flex items-center gap-1"
              >
                {collaborator.permission === "edit" ? <Edit className="h-2 w-2" /> : <Eye className="h-2 w-2" />}
                {collaborator.name === currentUserName ? "You" : collaborator.name}
                <span className="text-xs opacity-70">({collaborator.permission})</span>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
