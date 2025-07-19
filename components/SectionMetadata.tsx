"use client"

import { CollaboratorList } from "./CollaboratorList"
import { useAuth } from "@/contexts/AuthContext"

interface SectionMetadataProps {
  author: string
  collaborators: string[]
  updatedAt: Date
}

export function SectionMetadata({ author, collaborators, updatedAt }: SectionMetadataProps) {
  const { user } = useAuth()

  return (
    <div className="space-y-2">
      <CollaboratorList author={author} collaborators={collaborators} currentUserName={user?.name} />
      <div className="text-xs text-muted-foreground">Updated: {updatedAt.toLocaleDateString()}</div>
    </div>
  )
}
