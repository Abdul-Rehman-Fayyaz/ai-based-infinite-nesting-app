"use client"

import { Badge } from "@/components/ui/badge"
import { Crown, Edit, Eye } from "lucide-react"
import { getUserRoleInSection } from "@/utils/permissionUtils"
import type { Section } from "@/types"

interface RoleIndicatorProps {
  section: Section
  currentUserName: string
}

export function RoleIndicator({ section, currentUserName }: RoleIndicatorProps) {
  const role = getUserRoleInSection(section, currentUserName)

  // Note: "none" case should never happen now since we filter sections
  if (role === "author") {
    return (
      <Badge variant="default" className="text-xs flex items-center gap-1 bg-blue-500">
        <Crown className="h-3 w-3" />
        Author
      </Badge>
    )
  }

  if (role === "editor") {
    return (
      <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-green-500 text-white">
        <Edit className="h-3 w-3" />
        Editor
      </Badge>
    )
  }

  if (role === "viewer") {
    return (
      <Badge variant="outline" className="text-xs flex items-center gap-1">
        <Eye className="h-3 w-3" />
        View Only
      </Badge>
    )
  }

  // This should never show now
  return null
}
