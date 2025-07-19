export interface CollaboratorPermission {
  name: string
  permission: "edit" | "view" // Granular permissions for each collaborator
}

export interface Section {
  id: string
  title: string
  description?: string
  parentId?: string
  children: Section[]
  author: string
  collaborators: CollaboratorPermission[] // Changed from string[] to CollaboratorPermission[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: "author" | "collaborator"
}

export interface SectionModalData {
  title: string
  description: string
  author: string
  collaborators: CollaboratorPermission[]
}
