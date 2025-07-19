import type { Section } from "@/types"
import type { User } from "@/types/auth"

export interface PermissionCheck {
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canManageCollaborators: boolean
  accessLevel: "author" | "editor" | "viewer" | "none"
}

export const checkSectionPermissions = (section: Section, currentUserName: string): PermissionCheck => {
  const isAuthor = section.author === currentUserName
  const collaborator = section.collaborators.find((c) => c.name === currentUserName)
  const isEditor = collaborator?.permission === "edit"
  const isViewer = collaborator?.permission === "view"

  let accessLevel: "author" | "editor" | "viewer" | "none" = "none"
  if (isAuthor) accessLevel = "author"
  else if (isEditor) accessLevel = "editor"
  else if (isViewer) accessLevel = "viewer"

  return {
    canCreate: isAuthor, // Only authors can create child sections
    canEdit: isAuthor || isEditor, // Authors and editors can edit
    canDelete: isAuthor, // Only authors can delete
    canManageCollaborators: isAuthor, // Only authors can manage collaborators
    accessLevel,
  }
}

export const checkGlobalPermissions = (user: User | null): { canCreateRoot: boolean } => {
  if (!user) return { canCreateRoot: false }

  // Only Authors can create root sections
  return {
    canCreateRoot: user.role === "author",
  }
}

export const getUserRoleInSection = (
  section: Section,
  currentUserName: string,
): "author" | "editor" | "viewer" | "none" => {
  if (section.author === currentUserName) return "author"
  const collaborator = section.collaborators.find((c) => c.name === currentUserName)
  if (collaborator?.permission === "edit") return "editor"
  if (collaborator?.permission === "view") return "viewer"
  return "none"
}

export const canUserAccessSection = (section: Section, currentUserName: string): boolean => {
  const isAuthor = section.author === currentUserName
  const hasCollaboratorAccess = section.collaborators.some((c) => c.name === currentUserName)

  return isAuthor || hasCollaboratorAccess
}

// Filter sections that user can access
export const filterAccessibleSections = (sections: Section[], currentUserName: string): Section[] => {
  return sections
    .filter((section) => canUserAccessSection(section, currentUserName))
    .map((section) => ({
      ...section,
      children: filterAccessibleSections(section.children, currentUserName),
    }))
}
